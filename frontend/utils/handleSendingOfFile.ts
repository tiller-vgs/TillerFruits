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
    setErrorMessage(
      "Ingen fil valgt. Vennligst velg en fil før du laster opp.",
    );
    return;
  }

  const formData = new FormData();
  formData.append("file", addedFile.file);

  try {
    const response = await fetch("http://localhost:3000/api/v1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(
        data.message || "Opplastingen mislyktes. Vennligst prøv igjen.",
      );
      return;
    }

    console.log("File submitted:", addedFile.file);
    setErrorMessage("");
    setFileIsSubmitted(true);
  } catch (error: any) {
    setErrorMessage(error.message || "En feil oppsto under opplastingen");
    setFileIsSubmitted(false);
  }
}

export default handleSendingOfFile;
