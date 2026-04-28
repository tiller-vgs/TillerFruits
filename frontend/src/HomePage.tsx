import FormHelperText from "@mui/material/FormHelperText";
import { useRef, useState } from "react";
import type { UploadFileType } from "../types/types";
import formatFileInput from "../utils/formatFileInput";
import validateFile from "../utils/validateFile";
import UploadButton from "./components/UploadButton";

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [addedFile, setAddedFile] = useState<UploadFileType>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const acceptedFileFormats: string[] = [".pdf", ".docx", ".txt"];

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    if (!file) return;
    const formattedFile = formatFileInput(file);
    const fileValidationResult = validateFile(
      formattedFile,
      acceptedFileFormats,
    );
    if (fileValidationResult.success) {
      setAddedFile(formattedFile);
      setErrorMessage("");
    } else {
      setAddedFile(null);
      setErrorMessage(fileValidationResult.message);
    }
  }

  console.log(addedFile);
  return (
    <>
      <UploadButton
        fileInputRef={fileInputRef}
        handleFileInput={handleFileInput}
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}

      {!errorMessage && addedFile ? (
        <FormHelperText>{`Filen ${addedFile.name} er lagt til`}</FormHelperText>
      ) : (
        <FormHelperText>{`Filformater støttet per nå: ${acceptedFileFormats.join(", ")}`}</FormHelperText>
      )}
    </>
  );
}

export default HomePage;
