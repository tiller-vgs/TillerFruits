import React from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import type { UploadFileType, UploadStatus } from "../../../types/types";
import formatFileInput from "../../utils/formatFileInput";
import validateFile from "../../utils/validateFile";

interface UploadButtonProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  acceptedFileFormats: string[];
  setAddedFile: React.Dispatch<React.SetStateAction<UploadFileType | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setUploadStatus: React.Dispatch<React.SetStateAction<UploadStatus>>;
}

function UploadButton({
  fileInputRef,
  acceptedFileFormats,
  setAddedFile,
  setErrorMessage,
  setUploadStatus,
}: UploadButtonProps) {
  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    //gets file, formats it, validates it, sets errormessages and doesnt setfile if there were any errors.
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
    event.target.value = "";
  }

  function handleFileButtonClick() {
    fileInputRef.current?.click();
    setUploadStatus("idle");
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
        startIcon={
          <FileUploadIcon
            sx={[
              (theme) =>
                theme.applyStyles("dark", {
                  color: "#000",
                }),
            ]}
          />
        }
        onClick={handleFileButtonClick}
        sx={[
          (theme) => ({
            backgroundColor: "#1F1300",
            fontSize: {
              xs: "0.95rem",
              sm: "1rem",
              md: "1.2rem",
            },
            paddingX: { sm: "1rem", md: "1.5rem" },
            fontWeight: 600,
            borderRadius: "1rem",
            textTransform: "none",
            transition: "0.2s ease",
            ":hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[3],
              backgroundColor: theme.palette.secondary.dark,
            },
          }),
          (theme) =>
            theme.applyStyles("dark", {
              color: "#000",
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }),
        ]}
      >
        Upload files
      </Button>
    </>
  );
}

export default UploadButton;
