import Button from "@mui/material/Button";
import FilePreview from "../components/FilePreview";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import handleDistribution from "../utils/handleDistribution";
import type { FileTypeFromDB } from "../../types/types";
import Alert from "@mui/material/Alert";

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
    <main className="flex flex-row min-h-[calc(100dvh-65px)] w-full p-5 justify-between">
      <div className="flex flex-col w-2/3 gap-3">
        <h1>
          [{file?.extension.toUpperCase()}] - sendt av:{" "}
          <span className="font-bold">{file?.displayName}</span>
        </h1>

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
          <Alert severity="error" sx={{ fontSize: "1.1rem", width:"60%"}}>
            Forhåndsvisning er tilgjengelig kun for PDF-filer.
          </Alert>
        ) : null}
      </div>

      <div className="w-1/2">
        <Button
          onClick={() =>
            handleDistribution({ setIsSent, setStudentAmount, fileId })
          }
        >
          Send to students
        </Button>
        {isSent && (
          <FormHelperText>
            File successfully sent to {studentAmount} random students
          </FormHelperText>
        )}
      </div>
    </main>
  );
}
