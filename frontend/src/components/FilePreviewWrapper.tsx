import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import FilePreview from "./FilePreview";
import { secondaryTextSx, type FileTypeFromDB } from "../types/types";

function FilePreviewWrapper({
  file,
  fileURL,
}: {
  file: FileTypeFromDB | null;
  fileURL: string;
}) {
  const isPdf = file?.extension === "pdf";

  return (
    <section className="px-3 md:px-6">
      <div className="mb-5 border-b border-slate-300 pb-4">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-bright-lemon/70 p-2 md:p-3 text-2xl md:text-4xl text-coffee-bean">
            <DescriptionOutlinedIcon fontSize="inherit" />
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-bold">
              [{file?.extension.toUpperCase()}]{" "}
              {file?.originalName.split(".")[0]}
            </h1>

            <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
              sendt av{" "}
              <span className="font-semibold">{file?.displayName}</span>
            </Typography>
          </div>
        </div>

        <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
          Se innholdet før oppgaven sendes ut
        </Typography>
      </div>

      {isPdf ? (
        <div className="max-h-[105dvh] md:max-h-[75dvh] overflow-y-auto rounded-2xl border border-slate-300">
          <FilePreview fileURL={fileURL} />
        </div>
      ) : (
        <Alert
          severity="error"
          sx={{
            fontSize: "1rem",
            borderRadius: "1rem",
          }}
        >
          Forhåndsvisning er tilgjengelig kun for PDF-filer.
        </Alert>
      )}
    </section>
  );
}

export default FilePreviewWrapper;
