import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useRef, useState } from "react";
import type { UploadFileType, UploadStatus } from "../types/types";
import UploadButton from "./components/UploadButton";
import Footer from "./components/Footer";
import SubmitFileButton from "./components/SubmitFileButton";

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addedFile, setAddedFile] = useState<UploadFileType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const acceptedFileFormats: string[] = [".pdf", ".docx"];

  useEffect(() => {
    if (uploadStatus !== "success") return;

    setAddedFile(null);
    setErrorMessage("");
  }, [uploadStatus]);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-65px)] items-center justify-center">
      <div className="flex flex-row gap-5 justify-center items-center mt-30">
        <UploadButton
          fileInputRef={fileInputRef}
          acceptedFileFormats={acceptedFileFormats}
          setAddedFile={setAddedFile}
          setErrorMessage={setErrorMessage}
          setUploadStatus={setUploadStatus}
        />
        {addedFile && (
          <SubmitFileButton
            addedFile={addedFile}
            setUploadStatus={setUploadStatus}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
      {errorMessage && (
        <FormHelperText
          error={!!errorMessage}
          sx={{
            fontSize: "1rem",
            whiteSpace: "pre-line",
            textAlign: "center",
            padding: "0",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}

      {uploadStatus === "success" ? (
        <FormHelperText sx={{ fontSize: "1rem" }}>
          Filen er sendt
        </FormHelperText>
      ) : addedFile && errorMessage === "" ? (
        <FormHelperText sx={{ fontSize: "1rem" }}>
          {`Filen ${addedFile.name} er lagt til`}
        </FormHelperText>
      ) : (
        <FormHelperText sx={{ fontSize: "1rem" }}>
          {`Filformater støttet per nå: ${acceptedFileFormats.join(", ")}`}
        </FormHelperText>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
