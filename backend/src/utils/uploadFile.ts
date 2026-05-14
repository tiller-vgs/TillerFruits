import { createHash, randomBytes } from "crypto";
import { fileTypeFromBuffer } from "file-type";
import { existsSync } from "fs";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import generateRandomDisplayName from "./generateRandomDisplayName";
import { prisma } from "../lib/db";

export default async function uploadFile(
  buffer: Buffer,
  originalFilename: string,
  userId: string,
) {
  const maxFileSize = 10 * 1024 * 1024;
  const minFileSize = 1 * 1024;
  const acceptedFileFormatsInFileName: string[] = ["pdf", "docx"];

  const savingDir = join(process.cwd(), "uploads");
  const displayName = await generateRandomDisplayName();

  const fileExtension = originalFilename.toLowerCase().split(".").pop();
  const fileFormatValid = acceptedFileFormatsInFileName.includes(
    fileExtension || "",
  );

  const acceptedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const mimeFileExtension = await fileTypeFromBuffer(buffer);
  const isMimeValid =
    mimeFileExtension && acceptedMimeTypes.includes(mimeFileExtension.mime);

  // Validering av filstørrelse og format
  if (buffer.length > maxFileSize) {
    throw new Error(
      `Filen er for stor. Maksimal tillatt størrelse er ${maxFileSize / (1024 * 1024)}MB.`,
    );
  } else if (buffer.length < minFileSize) {
    throw new Error(
      `Filen er for liten. Minimum tillatt størrelse er ${minFileSize / 1024}KB.`,
    );
  }

  if (originalFilename.match(/[^a-zA-Z0-9\s.,!?-]/g)) {
    throw new Error(
      "Filnavnet inneholder ugyldige tegn. Vennligst bruk kun engelske bokstaver, tall og vanlige skilletegn.",
    );
  }

  if (!fileFormatValid) {
    throw new Error(
      `Filformattet støttes ikke. Filformattene støtter per nå: ${acceptedFileFormatsInFileName.join(", ")}`,
    );
  }

  if (!isMimeValid) {
    throw new Error(
      "Filformatene matcher ikke. Vennligst last opp en fil i filformatene som støttes",
    );
  }

  console.log("Filen er validert og kan lastes opp.");

  const randomFilename = randomBytes(32).toString("hex");
  if (!mimeFileExtension) {
    throw new Error("Mangler filtypeinformasjon. Kan ikke bestemme filtype.");
  }

  const secureFilename = `${randomFilename}.${mimeFileExtension?.ext}`;
  const fileHash = createHash("sha256").update(buffer).digest("hex");

  await prisma.file.create({
    data: {
      creatorId: userId,
      displayName: displayName,
      originalName: originalFilename,
      savedName: secureFilename,
      mimeType: mimeFileExtension?.mime || "",
      extension: mimeFileExtension?.ext || "",
      fileSize: buffer.length,
      filehash: fileHash,
    },
  });

  try {
    if (!existsSync(savingDir)) {
      await mkdir(savingDir, { recursive: true });
      console.log(`Lagret uploads mappen: ${savingDir}`);
    }

    const savedFilePath = join(savingDir, secureFilename);
    await writeFile(savedFilePath, buffer);
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Det oppsto en feil under lagring av filen.");
  }
}
