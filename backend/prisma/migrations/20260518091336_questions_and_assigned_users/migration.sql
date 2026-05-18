/*
  Warnings:

  - You are about to drop the column `anonDisplayName` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `assignment` table. All the data in the column will be lost.
  - Added the required column `assignmentId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignment" DROP CONSTRAINT "assignment_fileId_fkey";

-- DropForeignKey
ALTER TABLE "assignment" DROP CONSTRAINT "assignment_userId_fkey";

-- DropIndex
DROP INDEX "assignment_anonDisplayName_key";

-- DropIndex
DROP INDEX "assignment_fileId_idx";

-- DropIndex
DROP INDEX "assignment_userId_idx";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "assignmentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "assignment" DROP COLUMN "anonDisplayName",
DROP COLUMN "creatorId",
DROP COLUMN "fileId",
DROP COLUMN "updatedAt",
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentUser" (
    "assignmentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "anonDisplayName" TEXT NOT NULL,

    CONSTRAINT "AssignmentUser_pkey" PRIMARY KEY ("assignmentId","userId")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentUser" ADD CONSTRAINT "AssignmentUser_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentUser" ADD CONSTRAINT "AssignmentUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
