import React from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
        multiple

      />
      <Button
      variant="contained"
      startIcon={<FileUploadIcon sx={{ fontSize: "4rem", color: "#ffffff", }} />}
      onClick={handleFileButtonClick}
        sx={{mt: "1rem",
          fontSize: "1.1rem",
          mb: "0.5rem",
          padding: "0.6rem 1.5rem",
          borderRadius: "10px",
          textTransform: "none", 
          backgroundColor: "#1F1300",
          color: "#F6F7F8",
          transition: "0.2s ease",
          ":hover": {backgroundColor: "#6D5A72",
          transform: "translateY(-2px)"
    }
  }}

      >
        Upload files
      </Button>
    </>
  );
}

export default UploadButton;