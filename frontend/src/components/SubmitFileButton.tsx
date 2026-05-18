import Button from "@mui/material/Button";
import type { UploadFileType, UploadStatus } from "../../types/types";
import handleSendingOfFile from "../utils/handleSendingOfFile";

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
      sx={[
        (theme) => ({
          border: "2px solid",
          color: theme.palette.secondary.main,
          fontSize: {
            xs: "0.95rem",
            sm: "1.05rem",
            md: "1.2rem",
          },
          paddingX: { sm: "1rem", md: "1.5rem" },
          borderRadius: "1rem",
          textTransform: "none",
          transition: "0.2s ease",
          ":hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.secondary.dark,
            borderColor: "transparent",
            color: "#fff",
          },
        }),
        (theme) =>
          theme.applyStyles("dark", {
            color: "#fff",
            backgroundColor: "transparent",
            border: "2px solid",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
            },
          }),
      ]}
      onClick={() =>
        handleSendingOfFile({ addedFile, setUploadStatus, setErrorMessage })
      }
    >
      Submit
    </Button>
  );
}

export default SubmitFileButton;
