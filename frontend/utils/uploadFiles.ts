import type { UploadFileType } from "../types/types";

async function handleSendingOfFile({
  addedFile,
  setFileIsSubmitted,
  setErrorMessage,
}: {
  addedFile: UploadFileType;
  setFileIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  if (!addedFile) {
    setErrorMessage("No file selected");
    return;
  }
  setFileIsSubmitted(true);
  setErrorMessage("");

  const formData = new FormData();
  formData.append("file", addedFile.file);
  try {
    const response = await fetch("http://localhost:3000/api/v1/upload", {
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

export default handleSendingOfFile;
