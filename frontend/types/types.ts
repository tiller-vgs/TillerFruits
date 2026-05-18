export type UploadFileType = {
  file: File;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
};

export type FileTypeFromDB = {
  id: number;
  originalName: string;
  displayName: string;
  extension: string;
  createdAt: string;
};

export type FileItem = {
  id: string;
  extension: string;
  originalName: string;
  displayName: string;
};

export type UploadStatus = "idle" | "success" | "error" | "loading";

export const secondaryTextSx = [
  {
    color: "#62748e",
    fontSize: "0.9rem",
  },
  (theme: any) =>
    theme.applyStyles("dark", {
      color: "#90a1b9",
    }),
];
