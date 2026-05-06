import Button from "@mui/material/Button";
import type { UploadFileType, UploadStatus } from "../../types/types";
import handleSendingOfFile from "../../utils/handleSendingOfFile";

function SubmitFileButton({
  addedFile,
  setUploadStatus,
  setErrorMessage,
}: {
  addedFile: UploadFileType;
  setUploadStatus: React.Dispatch<React.SetStateAction<UploadStatus>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Button
      variant="outlined"
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

        onClick={() => handleSendingOfFile({ addedFile, setUploadStatus, setErrorMessage })}
    >
      Submit
    </Button>
  );
}

export default SubmitFileButton