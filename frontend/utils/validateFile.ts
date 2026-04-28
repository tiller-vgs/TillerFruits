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
        "The fileformat is not supported. Please upload a file of the correct format.",
    };
  }
  if (!fileSizeValid) {
    return {
      success: false,
      message: "The file is too large.",
    };
  }
  return {
    success: true,
    message: "The file is supported.",
  };
}

export default validateFile;
