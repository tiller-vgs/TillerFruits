import Button from "@mui/material/Button";
import FilePreview from "../components/FilePreview";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import handleDistribution from "../utils/handleDistribution";
import type { FileTypeFromDB } from "../../types/types";

export default function AssignmentDistribute() {
  const { id } = useParams();
  const fileId = Number(id);

  const [file, setFile] = useState<FileTypeFromDB | null>(null);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [studentAmount, setStudentAmount] = useState<number>(0);

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
        console.log("FetchFile in assignmentdis: ", data.data);
        setFile(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFile();
  }, [fileId]);

  return (
    <main className="flex flex-row min-h-[calc(100dvh-65px)] w-full p-5 justify-between">
      <div className="flex flex-col w-2/3">
        <h1>
          [{file?.extension.toUpperCase()}] - sendt av:{" "}
          <span className="font-bold">{file?.displayName}</span>
        </h1>

        {file ? (
          <div className="max-h-[80dvh] overflow-y-auto flex flex-col gap-0 p-0 border-black border-2 rounded-2xl">
            <FilePreview
              fileURL={`http://localhost:5000/api/v1/files/${file.id}/content`}
            />
          </div>
        ) : (
          <div>No file found. Contact support.</div>
        )}
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
