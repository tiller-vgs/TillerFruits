import FilePreview from "../components/FilePreview";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import type { FileTypeFromDB } from "../../types/types";
import Alert from "@mui/material/Alert";
import SendAssignmentButton from "../components/SendAssignmentButton";
import Typography from "@mui/material/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function AssignmentDistribute() {
  const { id } = useParams();
  const fileId = Number(id);

  const [file, setFile] = useState<FileTypeFromDB | null>(null);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [studentAmount, setStudentAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/${fileId}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setFile(data.data);
        setErrorMessage("");
      } catch (err: any) {
        console.error(err);
        setFile(null);
        setErrorMessage(err.message || "No file found");
      }
    }

    fetchFile();
  }, [fileId]);

  const isPdf = file?.extension === "pdf";

  const secondaryTextSx = [
    {
      color: "#62748e",
      fontSize: "0.9rem",
    },
    (theme: any) =>
      theme.applyStyles("dark", {
        color: "#90a1b9",
      }),
  ];

  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col items-center px-15 py-8">
      <div className="flex w-full flex-col gap-8">
        <header className="border-b border-slate-300 pb-6">
          {!file ? (
            <h1 className="text-4xl font-bold">
              Ugyldig ID. Kan ikke finne en fil med denne ID-en
            </h1>
          ) : (
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-bright-lemon/70 p-3 text-coffee-bean">
                <DescriptionOutlinedIcon fontSize="large" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  [{file?.extension.toUpperCase()}]{" "}
                  {file?.originalName.split(".")[0]}
                </h1>

                <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
                  sendt av{" "}
                  <span className="font-semibold">{file?.displayName}</span>
                </Typography>
              </div>
            </div>
          )}
        </header>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              fontSize: "1rem",
              borderRadius: "0.5rem",
              width: "30%",
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="p-6">
            <div className="mb-5 border-b border-slate-300 pb-4">
              <h2 className="text-2xl font-semibold">Forhåndsvisning</h2>

              <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
                Se innholdet før oppgaven sendes ut
              </Typography>
            </div>

            {file && isPdf ? (
              <div className="max-h-[75dvh] overflow-y-auto rounded-2xl border border-slate-300">
                <FilePreview
                  fileURL={`http://localhost:5000/api/v1/files/${file.id}/content`}
                />
              </div>
            ) : file ? (
              <Alert
                severity="error"
                sx={{
                  fontSize: "1rem",
                  borderRadius: "1rem",
                }}
              >
                Forhåndsvisning er tilgjengelig kun for PDF-filer.
              </Alert>
            ) : null}
          </section>

          <section className="p-6">
            <div className="mb-5 border-b border-slate-300 pb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Send oppgave</h2>

                  <Typography
                    sx={[...secondaryTextSx, { marginTop: "0.15rem" }]}
                  >
                    Oppgaven sendes til tilfeldige elever
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-4">
              <Typography sx={[...secondaryTextSx]}>
                Per no, er ikke spørsmålsskjemaer aktivert ved sending.
                Vennligst vent til utviklerne får skjemaet på plass.
              </Typography>

              <div className="flex flex-col gap-2">
                <SendAssignmentButton
                  setIsSent={setIsSent}
                  setStudentAmount={setStudentAmount}
                  setErrorMessage={setErrorMessage}
                  fileId={fileId}
                />

                {isSent && (
                  <FormHelperText sx={{ fontSize: "0.9rem" }}>
                    Oppgaven er sendt til {studentAmount} tilfeldige elever
                  </FormHelperText>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
