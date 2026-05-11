export type databaseUploadFile = {
  id: number;
  creatorId: string;
  displayName: string;

  originalName: string;
  savedName: string;

  mimeType: string;
  extension: string;
  fileSize: number;
  filehash: string;

  createdAt: Date;
  updatedAt: Date;
};

export type databaseUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
