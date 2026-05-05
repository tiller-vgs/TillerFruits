import { randomBytes } from "crypto";
import { fileTypeFromBuffer } from "file-type";

export default async function uploadFile(
  buffer: Buffer,
  originalFilename: string,
) {
  const maxFileSize = 10 * 1024 * 1024;
  const minFileSize = 1 * 1024;
  const acceptedFileFormatsInFileName: string[] = ["pdf", "docx", "txt"];

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

  // Her skal jeg validere tekstfiler, akkurat nå er .txt en WEAKPOINT. OBS.
  const isFileTxt = fileExtension === "txt";

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

  if (!fileFormatValid) {
    throw new Error(
      `Filformattet støttes ikke. Filformattene støtter per nå: ${acceptedFileFormatsInFileName.join(", ")}`,
    );
  }

  if (!isMimeValid && !isFileTxt) {
    throw new Error(
      "Filformatene matcher ikke. Vennligst last opp en fil i filformatene som støttes",
    );
  }

  console.log("Filen er validert og kan lastes opp.");

  const randomFilename = randomBytes(32).toString("hex");
  if (!isFileTxt && !mimeFileExtension) {
    throw new Error("Could not determine file type");
  }
  const extension = isFileTxt ? "txt" : mimeFileExtension?.ext;
  const secureFilename = `${randomFilename}.${extension}`;
}
