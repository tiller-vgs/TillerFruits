import { File } from "../generated/prisma/browser";

//Converts backend files into frontend safe files, strips away sensitive and redundant information
// Used in uploading of file, nowhere else, due to the actual file object
export function toFrontendFile(file: File) {
  return {
    id: file.id,
    originalName: file.originalName,
    displayName: file.displayName,
    extension: file.extension,
    status: file.status,
    createdAt: file.createdAt,
  };
}
