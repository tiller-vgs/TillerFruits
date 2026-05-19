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
  status: "new" | "sent";
  createdAt: string;
};

export type FileItem = {
  id: string;
  extension: string;
  originalName: string;
  displayName: string;
};

export type FrontendSubmission = {
  id: number;

  createdAt: Date;

  assignment: {
    id: number;
    title: string;

    questions: {
      id: number;
      title: string;
    }[];
  };

  reviewers: {
    anonName: string;
    completed: boolean;
  }[];

  file: {
    id: number;
    originalName: string;
    displayName: string;
    extension: string;
    createdAt: Date;
  };
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
