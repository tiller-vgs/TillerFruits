import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useRef, useState } from "react";
import {
  secondaryTextSx,
  type UploadFileType,
  type UploadStatus,
} from "../../types/types";
import UploadButton from "../components/UploadButton";
import SubmitFileButton from "../components/SubmitFileButton";
import FilePreview from "../components/FilePreview";
import FilePreviewButton from "../components/FilePreviewButton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addedFile, setAddedFile] = useState<UploadFileType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [clickedPreview, setClickedPreview] = useState<boolean>(false);

  const acceptedFileFormats: string[] = [".pdf", ".docx"];
  const fileIsPdf: boolean = addedFile?.type === "application/pdf";
  const file = addedFile?.file;

  // useeffect for resetting addedfile and errormessages if upload was a success
  useEffect(() => {
    if (uploadStatus !== "success") return;
    setAddedFile(null);
    setErrorMessage("");
  }, [uploadStatus]);

  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col items-center sm:px-3 lg:px-15 py-8">
      <div className="flex w-full flex-col gap-8">
        <header className="border-b border-slate-300 pb-6">
          <div className="flex flex-col mx-4.5">
            <h1 className="text-4xl font-bold">Last opp fil</h1>

            <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
              Last opp filer og forhåndsvis PDF-filer før innsending.
            </Typography>
          </div>
        </header>

        <section className="px-6">
          <div className="flex flex-col gap-6">
            {errorMessage && (
              <Alert
                severity="error"
                sx={{
                  fontSize: "1rem",
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  paddingX: "1rem",
                  borderRadius: "0.5rem",
                  width: "fit-content",
                }}
              >
                {errorMessage}
              </Alert>
            )}

            <div className="flex flex-row flex-wrap gap-4 items-center">
              <UploadButton
                fileInputRef={fileInputRef}
                acceptedFileFormats={acceptedFileFormats}
                setAddedFile={setAddedFile}
                setErrorMessage={setErrorMessage}
                setUploadStatus={setUploadStatus}
              />

              {addedFile && (
                <SubmitFileButton
                  assignmentId={1}
                  addedFile={addedFile}
                  setUploadStatus={setUploadStatus}
                  setErrorMessage={setErrorMessage}
                />
              )}

              {addedFile && errorMessage == "" && (
                <FilePreviewButton
                  clickedPreview={clickedPreview}
                  setClickedPreview={setClickedPreview}
                />
              )}
            </div>

            {uploadStatus === "success" ? (
              <FormHelperText sx={{ fontSize: "1rem" }}>
                Filen er sendt
              </FormHelperText>
            ) : addedFile && errorMessage === "" ? (
              <FormHelperText sx={{ fontSize: "1rem" }}>
                {`Filen ${addedFile.name} er lagt til`}
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ fontSize: "1rem" }}>
                Filformater støttet per nå:{" "}
                <span id="list_accepted_types" className="font-bold">
                  {acceptedFileFormats.join(", ").toUpperCase()}
                </span>
              </FormHelperText>
            )}

            {clickedPreview &&
              file &&
              (!fileIsPdf ? (
                <Alert
                  severity="error"
                  sx={{
                    fontSize: "1rem",
                    borderRadius: "0.5rem",
                    width: "40%",
                  }}
                >
                  Forhåndsvisningsfunksjonen er kun tilgjengelig for PDF-filer.
                </Alert>
              ) : (
                file && (
                  <div className="xs:max-h-[120dvh] lg:max-h-[70dvh] overflow-y-auto rounded-2xl pt-2">
                    <FilePreview file={file} />
                  </div>
                )
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
