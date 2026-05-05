import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function UploadButton({ fileInputRef, handleFileInput }) {
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
      startIcon={<FileUploadIcon sx={{ fontSize: "4rem", color: "#ffffff", }} />}
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

        variant="contained"
        onClick={() => fileInputRef.current.click()}
      >
        Upload files
      </Button>
    </>
  );
}

export default UploadButton;
