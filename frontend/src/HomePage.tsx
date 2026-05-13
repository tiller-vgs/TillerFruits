import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useRef, useState } from "react";
import type { UploadFileType, UploadStatus } from "../types/types";
import UploadButton from "./components/UploadButton";
import Footer from "./components/Footer";
import SubmitFileButton from "./components/SubmitFileButton";
import FilePreview from "./components/FilePreview";
import FilePreviewButton from "./components/FilePreviewButton";
import Alert from "@mui/material/Alert";

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addedFile, setAddedFile] = useState<UploadFileType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [clickedPreview, setClickedPreview] = useState<boolean>(false);

  const acceptedFileFormats: string[] = [".pdf", ".docx"];
  const fileIsPdf: boolean = addedFile?.type === "application/pdf";

  useEffect(() => {
    if (uploadStatus !== "success") return;

    setAddedFile(null);
    setErrorMessage("");
  }, [uploadStatus]);

  return (
    <main
      id="mainWrapperWithFooter"
      className="flex flex-col min-h-[calc(100dvh-65px)] items-center"
    >
      <div
        id="subMainWrapperNoFooter"
        className={`flex flex-col gap-1 items-center ${clickedPreview && fileIsPdf ? "mt-10" : "mt-20"}`}
      >
        {clickedPreview &&
          (!fileIsPdf ? (
            <Alert
              severity="error"
              sx={{ fontSize: "1.15rem", marginBottom: 2 }}
            >
              Forhåndsvisningsfunksjonen er bare tilgjengelig for PDF-filer.
            </Alert>
          ) : (
            <FilePreview file={addedFile?.file} />
          ))}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              fontSize: "1.1rem",
              whiteSpace: "pre-line",
              textAlign: "center",
              paddingX: "1rem",
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <div className="flex flex-row gap-5 justify-center items-center my-5">
          <UploadButton
            fileInputRef={fileInputRef}
            acceptedFileFormats={acceptedFileFormats}
            setAddedFile={setAddedFile}
            setErrorMessage={setErrorMessage}
            setUploadStatus={setUploadStatus}
          />
          {addedFile && (
            <SubmitFileButton
              addedFile={addedFile}
              setUploadStatus={setUploadStatus}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>

        {uploadStatus === "success" ? (
          <FormHelperText sx={{ fontSize: "1.25rem" }}>
            Filen er sendt
          </FormHelperText>
        ) : addedFile && errorMessage === "" ? (
          <FormHelperText sx={{ fontSize: "1.25rem" }}>
            {`Filen ${addedFile.name} er lagt til`}
          </FormHelperText>
        ) : (
          <FormHelperText sx={{ fontSize: "1.25rem" }}>
            Filformater støttet per nå:{" "}
            <span id="list_accepted_types" className="font-bold">
              {acceptedFileFormats.join(", ").toUpperCase()}
            </span>
          </FormHelperText>
        )}

        {addedFile && errorMessage == "" && (
          <FilePreviewButton
            clickedPreview={clickedPreview}
            setClickedPreview={setClickedPreview}
          />
        )}
      </div>
      <Footer />
    </main>
  );
}

export default HomePage;
