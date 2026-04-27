import type { UploadFileType } from "../types/types";

function validateFile(file: UploadFileType) {
  if (file.name.includes(".jpg")) {
    return {
      success: false,
      message: "Fileformat .jpg is not supported",
    };
  }
  return {
    success: true,
    message: "file is okay",
  };
}

export default validateFile;
