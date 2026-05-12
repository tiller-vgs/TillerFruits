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

export type Assignment = {
  id: string | number;
  fileId: number;
  creatorId: string;
  userId: string;
  anonDisplayName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TempAssignment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  displayName: string;
  originalName: string;
  savedName: string;
  mimeType: string;
  extension: string;
  fileSize: number;
  filehash: string;
};
