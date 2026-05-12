import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useRef, useState } from "react";
import type { UploadFileType, UploadStatus } from "../types/types";
import UploadButton from "./components/UploadButton";
import Footer from "./components/Footer";
import SubmitFileButton from "./components/SubmitFileButton";
import Button from "@mui/material/Button";
import FilePreview from "./components/FilePreview";
import { authClient } from "./utils/auth-client";

function HomePage() {
  const { data: session } = authClient.useSession();
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
    <div className="flex flex-col min-h-[calc(100dvh-65px)] items-center">
      <div
        className={`flex flex-col gap-5 items-center ${clickedPreview && fileIsPdf ? "mt-5" : "mt-30"}`}
      >
          {session?.user && (
            <p className="text-sm text-gray-500">
              Logged in as: {session.user.name} ({session.user.email})
            </p>
          )}
          <div className="flex flex-row gap-5 justify-center items-center">
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
          {errorMessage && (
            <FormHelperText
              error={!!errorMessage}
              sx={{
                fontSize: "1rem",
                whiteSpace: "pre-line",
                textAlign: "center",
                padding: "0",
              }}
            >
              {errorMessage}
            </FormHelperText>
          )}

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
              {`Filformater støttet per nå: ${acceptedFileFormats.join(", ").toUpperCase()}`}
            </FormHelperText>
          )}

          {addedFile && errorMessage == "" && (
            <Button onClick={() => setClickedPreview((prev) => !prev)}>
              {!clickedPreview ? "Preview dokumentet" : "Lukk forhåndsvisning"}
            </Button>
          )}

          {clickedPreview &&
            (!fileIsPdf ? (
              <FormHelperText error sx={{ fontSize: "1rem" }}>
                Forhåndsvisningsfunksjonen er bare tilgjengelig for PDF-filer.
              </FormHelperText>
            ) : (
              <FilePreview file={addedFile?.file} />
            ))}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
