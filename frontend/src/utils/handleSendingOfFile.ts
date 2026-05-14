import type { UploadFileType, UploadStatus } from "../../types/types";

async function handleSendingOfFile({
  addedFile,
  setUploadStatus,
  setErrorMessage,
}: {
  addedFile: UploadFileType;
  setUploadStatus: React.Dispatch<React.SetStateAction<UploadStatus>>;
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
    const response = await fetch("http://localhost:5000/api/v1/files/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(
        data.message || "Opplastingen mislyktes. Vennligst prøv igjen.",
      );
      return;
    }

    setErrorMessage("");
    setUploadStatus("success");
  } catch (error: any) {
    setErrorMessage(
      error.message === "Failed to fetch"
        ? "En feil oppsto under opplastingen.\nVennligst oppdater siden eller ta kontakt med support hvis problemet fortsetter."
        : error.message,
    );
    setUploadStatus("idle");
  }
}

export default handleSendingOfFile;
