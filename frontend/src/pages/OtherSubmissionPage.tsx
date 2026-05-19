import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { secondaryTextSx, type FrontendSubmission, type FileTypeFromDB } from "../../types/types";
import FilePreviewWrapper from "../components/FilePreviewWrapper";

function OtherSubmissionPage() {
  const { submissionID } = useParams();

  const [innlevering, setInnlevering] = useState<FrontendSubmission | null>(null);
  const [laster, setLaster] = useState(true);
  const [feil, setFeil] = useState("");

  useEffect(() => {
    async function hentData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/submissions/${submissionID}`,
          { credentials: "include" },
        );

        if (!res.ok) {
          setFeil("Kunne ikke hente innleveringen.");
          return;
        }

        const json = await res.json();
        setInnlevering(json.data);
      } catch {
        setFeil("Noe gikk galt. Prøv igjen.");
      } finally {
        setLaster(false);
      }
    }

    hentData();
  }, [submissionID]);

  if (laster) {
    return (
      <main className="flex min-h-[calc(100dvh-165px)] items-center justify-center">
        <CircularProgress />
      </main>
    );
  }

  if (feil || !innlevering) {
    return (
      <main className="flex min-h-[calc(100dvh-165px)] items-center justify-center px-6">
        <Alert severity="error">{feil || "Innleveringen ble ikke funnet."}</Alert>
      </main>
    );
  }

  const fil = {
    id: innlevering.file.id,
    originalName: innlevering.file.originalName,
    displayName: innlevering.file.displayName,
    extension: innlevering.file.extension,
    status: "sent",
    createdAt: String(innlevering.file.createdAt),
  } as FileTypeFromDB;

  const filURL = `http://localhost:5000/api/v1/files/${innlevering.file.id}/content`;

  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col xs:px-3 lg:px-15 py-8">
      <div className="flex w-full flex-col gap-6">

        <header className="border-b border-slate-300 pb-6 mx-4.5">
          <h1 className="text-3xl md:text-4xl font-bold">{innlevering.assignment.title}</h1>
          <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
            En medelevs innlevering — gi tilbakemelding basert på spørsmålene
          </Typography>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FilePreviewWrapper file={fil} fileURL={filURL} />

          <div className="px-3 md:px-6">
            <h2 className="text-xl font-semibold mb-3 pb-3 border-b border-slate-300">Tilbakemeldingsspørsmål</h2>
            <ol className="flex flex-col gap-3">
              {innlevering.assignment.questions.map((sporsmal, i) => (
                <li key={sporsmal.id} className="rounded-2xl border border-slate-300 px-5 py-4">
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "text.secondary" }}>
                    SPØRSMÅL {i + 1}
                  </Typography>
                  <p className="mt-1 font-medium">{sporsmal.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </main>
  );
}

export default OtherSubmissionPage;
