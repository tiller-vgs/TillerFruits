import Button from "@mui/material/Button";
import type { UploadFileType } from "../../types/types";

function SubmitFileButton({
  addedFile,
  setFileIsSubmitted,
  setErrorMessage,
}: {
  addedFile: UploadFileType;
  setFileIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  async function handleSendingOfFile() {
    if (!addedFile) {
      setErrorMessage("No file selected");
      return;
    }
    setFileIsSubmitted(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", addedFile.file);
    try {
      const response = await fetch("IDK the route yet lol", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      console.log("File submitted:", addedFile.file);
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  }
  return (
    <Button
      variant="outlined"
      sx={{ height: "0" }}
      onClick={handleSendingOfFile}
    >
      Submit
    </Button>
  );
}

export default SubmitFileButton;
