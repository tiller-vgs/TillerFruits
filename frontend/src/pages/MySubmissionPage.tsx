import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { secondaryTextSx, type FrontendSubmission, type FileTypeFromDB } from "../../types/types";
import FilePreviewWrapper from "../components/FilePreviewWrapper";

function MySubmissionPage() {
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

  const antallFullfort = innlevering.reviewers.filter((r) => r.completed).length;

  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col xs:px-3 lg:px-15 py-8">
      <div className="flex w-full flex-col gap-6">

        <header className="border-b border-slate-300 pb-6 mx-4.5">
          <h1 className="text-3xl md:text-4xl font-bold">{innlevering.assignment.title}</h1>
          <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
            Din innlevering — {antallFullfort} av {innlevering.reviewers.length} har fullført vurderingen
          </Typography>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FilePreviewWrapper file={fil} fileURL={filURL} />

          <div className="flex flex-col gap-6 px-3 md:px-6">

            <section>
              <h2 className="text-xl font-semibold mb-3 pb-3 border-b border-slate-300">Spørsmål i oppgaven</h2>
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
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 pb-3 border-b border-slate-300">Vurderingsstatus</h2>
              <div className="flex flex-col gap-2">
                {innlevering.reviewers.length === 0 ? (
                  <Typography sx={secondaryTextSx}>
                    Ingen er tildelt til å vurdere denne innleveringen ennå.
                  </Typography>
                ) : (
                  innlevering.reviewers.map((reviewer, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-slate-300 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        {reviewer.completed
                          ? <CheckCircleOutlineIcon color="success" />
                          : <RadioButtonUncheckedIcon color="disabled" />
                        }
                        <span className="font-medium">{reviewer.anonName}</span>
                      </div>

                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: reviewer.completed ? "success.main" : "text.disabled" }}>
                        {reviewer.completed ? "Fullført" : "Ikke fullført"}
                      </Typography>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}

export default MySubmissionPage;
