import Button from "@mui/material/Button";
import type { UploadFileType } from "../../types/types";
import handleSendingOfFile from "../../utils/uploadFiles";

function SubmitFileButton({
  addedFile,
  setFileIsSubmitted,
  setErrorMessage,
}: {
  addedFile: UploadFileType;
  setFileIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Button
      variant="outlined"
      sx={{ height: "0" }}
      onClick={() => handleSendingOfFile({ addedFile, setFileIsSubmitted, setErrorMessage })}
    >
      Submit
    </Button>
  );
}

export default SubmitFileButton;
