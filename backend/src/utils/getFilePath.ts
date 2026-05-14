import { join } from "path";
import { existsSync } from "fs";
import { fetchInternalFile } from "../services/fileService";

export async function getFilePath(fileId: number) {
  try {
    const file = await fetchInternalFile(fileId);

    if (!file) {
      throw new Error("Filen ble ikke funnet");
    }

    const uploadsDir = join(process.cwd(), "uploads");
    const fullFilePath = join(uploadsDir, file.savedName);
    const mimeType = file.mimeType;

    if (!existsSync(fullFilePath)) {
      throw new Error("Filen er ikke lagret i serveren.");
    }

    return { fullFilePath, mimeType };
  } catch (error) {
    console.error(error);

    throw new Error(
      "Det oppsto en feil under henting av filen. Vennligts prøv på nytt.",
    );
  }
}
