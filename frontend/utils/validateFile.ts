import type { UploadFileType } from "../types/types";

function validateFile(file: UploadFileType, acceptedFileFormats: string[]) {
  const fileFormatValid = acceptedFileFormats.some((extension) =>
    file.name.includes(extension),
  );

  const maxFileSize = 10 * 1024 * 1024;
  const fileSizeValid = file.size <= maxFileSize;
  if (!fileFormatValid) {
    return {
      success: false,
      message:
        "Filformatet støttes ikke. Vennligst last opp en fil i riktig format.",
    };
  }
  if (!fileSizeValid) {
    return {
      success: false,
      message: "Filen er for stor.",
    };
  }
  return {
    success: true,
    message: "Filen ble lagt til.",
  };
}

export default validateFile;
