import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useRef, useState } from "react";
import type { UploadFileType } from "../types/types";
import UploadButton from "./components/UploadButton";
import Footer from "./components/Footer";
import SubmitFileButton from "./components/SubmitFileButton";

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addedFile, setAddedFile] = useState<UploadFileType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileIsSubmitted, setFileIsSubmitted] = useState(false);
  const acceptedFileFormats: string[] = [".pdf", ".docx", ".txt"];

  useEffect(() => {
    if (!fileIsSubmitted) return;

    setAddedFile(null);
    setErrorMessage("");
  }, [fileIsSubmitted]);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-65px)] items-center justify-center">
      <div className="flex flex-row gap-5 justify-center items-center">
        <UploadButton
          fileInputRef={fileInputRef}
          acceptedFileFormats={acceptedFileFormats}
          setAddedFile={setAddedFile}
          setErrorMessage={setErrorMessage}
          setFileIsSubmitted={setFileIsSubmitted}
        />
        {addedFile && (
          <SubmitFileButton
            addedFile={addedFile}
            setFileIsSubmitted={setFileIsSubmitted}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
      {errorMessage && (
        <FormHelperText error={!!errorMessage} sx={{ fontSize: "1rem" }}>
          {errorMessage}
        </FormHelperText>
      )}

      {fileIsSubmitted ? (
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
