import React from "react";
import Button from "@mui/material/Button";
import formatFileInput from "../../utils/formatFileInput";
import validateFile from "../../utils/validateFile";
import type { UploadFileType } from "../../types/types";

interface UploadButtonProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  acceptedFileFormats: string[];
  setAddedFile: React.Dispatch<React.SetStateAction<UploadFileType | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setFileIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

function UploadButton({
  fileInputRef,
  acceptedFileFormats,
  setAddedFile,
  setErrorMessage,
  setFileIsSubmitted,
}: UploadButtonProps) {
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

  function handleFileButtonClick() {
    fileInputRef.current?.click();
    setFileIsSubmitted(false);
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInput}
      />
      <Button
        sx={{ fontSize: "1.25rem", mb: "0.5rem" }}
        variant="contained"
        onClick={handleFileButtonClick}
      >
        Upload files
      </Button>
    </>
  );
}

export default UploadButton;
