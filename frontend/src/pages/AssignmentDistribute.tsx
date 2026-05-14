import FilePreview from "../components/FilePreview";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import type { FileTypeFromDB } from "../../types/types";
import Alert from "@mui/material/Alert";
import SendAssignmentButton from "../components/SendAssignmentButton";

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

  return (
    <main className="flex flex-row min-h-[calc(100dvh-65px)] w-full p-5 gap-5 justify-between">
      <div className="flex flex-col w-2/3 gap-3">
        {!file ? (
          <h1>Ugyldig ID. Kan ikke finne en fil med denne ID-en</h1>
        ) : (
          <h1>
            [{file?.extension.toUpperCase()}] {file?.originalName.split(".")[0]}{" "}
            - sendt av: <span className="font-bold">{file?.displayName}</span>
          </h1>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ fontSize: "1.1rem" }}>
            {errorMessage}
          </Alert>
        )}

        {file && isPdf ? (
          <div className="max-h-[80dvh] overflow-y-auto flex flex-col gap-0 p-0 border-black border-2 rounded-2xl">
            <FilePreview
              fileURL={`http://localhost:5000/api/v1/files/${file.id}/content`}
            />
          </div>
        ) : file ? (
          <Alert severity="error" sx={{ fontSize: "1.1rem", width: "60%" }}>
            Forhåndsvisning er tilgjengelig kun for PDF-filer.
          </Alert>
        ) : null}
      </div>

      <div className="flex flex-col w-1/2 items-center mt-10 text-center">
        <p>Per no, er ikke spørsmålsskjemaer aktivert ved sending.</p>
        <p>Vennligst vent til utviklerne får skjemaet på plass.</p>

        <SendAssignmentButton
          setIsSent={setIsSent}
          setStudentAmount={setStudentAmount}
          setErrorMessage={setErrorMessage}
          fileId={fileId}
        />

        {isSent && (
          <FormHelperText>
            Filen er sendt til {studentAmount} tilfeldige elever
          </FormHelperText>
        )}
      </div>
    </main>
  );
}
