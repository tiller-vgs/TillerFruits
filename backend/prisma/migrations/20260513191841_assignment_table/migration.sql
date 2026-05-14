/*
  Warnings:

  - A unique constraint covering the columns `[displayName]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'admin');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('new', 'sent');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "status" "FileStatus" NOT NULL DEFAULT 'new';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'student';

-- CreateTable
CREATE TABLE "assignment" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "creatorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anonDisplayName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assignment_anonDisplayName_key" ON "assignment"("anonDisplayName");

-- CreateIndex
CREATE INDEX "assignment_fileId_idx" ON "assignment"("fileId");

-- CreateIndex
CREATE INDEX "assignment_userId_idx" ON "assignment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "File_displayName_key" ON "File"("displayName");

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
