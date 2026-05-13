export type UploadFileType = {
  file: File
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
}

export type UploadStatus = "idle" | "success" | "error" | "loading";