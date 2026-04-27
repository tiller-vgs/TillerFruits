import type { UploadFileType } from "../types/types";

export default function formatFileInput(file: File): UploadFileType {
  return {
    name: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModified),
    size: file.size,
    type: file.type,
  };
}
