import { File } from "../generated/prisma/browser";

export function toFrontendFile(file: File) {
  return {
    id: file.id,
    originalName: file.originalName,
    displayName: file.displayName,
    extension: file.extension,
    createdAt: file.createdAt,
  };
}
