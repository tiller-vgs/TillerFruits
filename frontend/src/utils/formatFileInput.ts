import type { UploadFileType } from "../../types/types";

//Formats file into the type UploadFileType, which has additional info of the actual RAM-saved file. 
//File is temporarily saved and can only be used during uploading 
export default function formatFileInput(file: File): UploadFileType {
  return {
    file,
    name: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModified),
    size: file.size,
    type: file.type,
  };
}
