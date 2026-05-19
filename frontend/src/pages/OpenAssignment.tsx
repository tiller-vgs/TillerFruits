import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { FileTypeFromDB } from "../types/types";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import FilePreviewWrapper from "../components/FilePreviewWrapper";

export default function OpenAssignment() {
  const { id } = useParams();
  const fileId = Number(id);

  const [file, setFile] = useState<FileTypeFromDB | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/${fileId}`,
          {
            credentials: "include",
          },
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

  return (
    <main className="min-h-[calc(100dvh-165px)] px-3 md:px-10 py-5 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {!file && (
          <header className="border-b border-slate-300 pb-4 md:pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Ugyldig ID. Kan ikke finne en fil med denne ID-en
            </h1>
          </header>
        )}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              fontSize: "1rem",
              borderRadius: "0.75rem",
              width: { xs: "100%", md: "30%" },
              boxShadow: 1,
            }}
          >
            {errorMessage}
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] items-start">
        {file ? (
          <FilePreviewWrapper
            file={file}
            fileURL={`http://localhost:5000/api/v1/files/${file.id}/content`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <p className="text-slate-500 text-lg">Kunne ikke laste filen</p>

            <Button
              variant="contained"
              sx={{
                borderRadius: "999px",
                paddingX: 3,
                paddingY: 1,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Gå tilbake
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
