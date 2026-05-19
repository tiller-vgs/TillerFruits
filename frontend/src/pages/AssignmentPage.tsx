import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { secondaryTextSx, type FrontendAssignment, type FrontendSubmission, type FileTypeFromDB } from "../../types/types";
import FilePreviewWrapper from "../components/FilePreviewWrapper";

function AssignmentPage() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState<FrontendAssignment | null>(null);
  const [minInnlevering, setMinInnlevering] = useState<FrontendSubmission | null>(null);
  const [laster, setLaster] = useState(true);
  const [feil, setFeil] = useState("");

  useEffect(() => {
    async function hentData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/me/assignments/${assignmentId}`,
          { credentials: "include" },
        );

        if (!res.ok) {
          setFeil("Kunne ikke hente oppgaven.");
          return;
        }

        const json = await res.json();
        setAssignment(json.data.assignment);
        setMinInnlevering(json.data.mySubmission);
      } catch {
        setFeil("Noe gikk galt. Prøv igjen.");
      } finally {
        setLaster(false);
      }
    }

    hentData();
  }, [assignmentId]);

  if (laster) {
    return (
      <main className="flex min-h-[calc(100dvh-165px)] items-center justify-center">
        <CircularProgress />
      </main>
    );
  }

  if (feil || !assignment) {
    return (
      <main className="flex min-h-[calc(100dvh-165px)] items-center justify-center px-6">
        <Alert severity="error">{feil || "Oppgaven ble ikke funnet."}</Alert>
      </main>
    );
  }

  const fil = minInnlevering
    ? ({
        id: minInnlevering.file.id,
        originalName: minInnlevering.file.originalName,
        displayName: minInnlevering.file.displayName,
        extension: minInnlevering.file.extension,
        status: "sent",
        createdAt: String(minInnlevering.file.createdAt),
      } as FileTypeFromDB)
    : null;

  const filURL = minInnlevering
    ? `http://localhost:5000/api/v1/files/${minInnlevering.file.id}/content`
    : "";

  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col xs:px-3 lg:px-15 py-8">
      <div className="flex w-full flex-col gap-8">

        <header className="border-b border-slate-300 pb-6 mx-4.5">
          <h1 className="text-3xl md:text-4xl font-bold">{assignment.title}</h1>
          <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
            Oppgave fra lærer
          </Typography>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row mx-4.5">

          <section className="flex-1">
            <h2 className="text-xl font-semibold mb-3 pb-3 border-b border-slate-300">Spørsmål</h2>
            <ol className="flex flex-col gap-3">
              {assignment.questions.map((sporsmal, i) => (
                <li key={sporsmal.id} className="rounded-2xl border border-slate-300 px-5 py-4">
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "text.secondary" }}>
                    SPØRSMÅL {i + 1}
                  </Typography>
                  <p className="mt-1 font-medium">{sporsmal.title}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex-1">
            <h2 className="text-xl font-semibold mb-3 pb-3 border-b border-slate-300">Din innlevering</h2>

            {minInnlevering ? (
              <FilePreviewWrapper file={fil} fileURL={filURL} />
            ) : (
              <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 px-6 py-10 items-center text-center">
                <p className="font-semibold text-lg">Ingen fil lastet opp ennå</p>
                <Typography sx={secondaryTextSx}>
                  Last opp filen din for å svare på oppgaven
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/me/assignments/${assignmentId}/upload`)}
                >
                  Last opp fil
                </Button>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}

export default AssignmentPage;
