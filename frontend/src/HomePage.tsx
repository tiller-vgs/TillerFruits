import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { useRef, useState } from "react";
import type { UploadFileType } from "../types/types";
import formatFileInput from "../utils/formatFileInput";
import validateFile from "../utils/validateFile";

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [addedFile, setAddedFile] = useState<UploadFileType>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    const formattedFile = formatFileInput(file);
    const fileValidationResult = validateFile(formattedFile);
    if (fileValidationResult.success) {
      setAddedFile(formattedFile);
      setErrorMessage("");
    } else {
      setAddedFile(null);
      setErrorMessage(fileValidationResult.message);
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInput}
        multiple
      />
      <Button variant="contained" onClick={() => fileInputRef.current.click()}>
        Upload files
      </Button>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}

      {addedFile && !errorMessage && (
        <FormHelperText>{`Filen ${addedFile.name} er lagt til`}</FormHelperText>
      )}
    </>
  );
}

export default HomePage;
