import Button from "@mui/material/Button";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

function FilePreview({ file }: { file: File | undefined }) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="max-h-[50dvh] overflow-y-auto flex flex-col gap-0 p-0 border-black border-2 rounded-2xl">
      <Document file={file || ""} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          className={"pdf-page"}
          pageNumber={currentPage}
          width={window.innerWidth * 0.55}
        />
      </Document>
      <section className="flex items-center justify-center gap-4 my-4">
        <Button
          variant="contained"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((page) => page - 1)}
          sx={[
            {
              backgroundColor: "transparent",
              borderRadius: "1rem",
              fontWeight: 600,
              color: "#1F1300",
            },
            (theme) =>
              theme.applyStyles("dark", {
                color: "#fff",
                border: "1px solid",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: theme.palette.secondary.dark,
                },
              }),
          ]}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <Button
          variant="contained"
          disabled={currentPage >= (numPages || 1)}
          onClick={() => setCurrentPage((page) => page + 1)}
          sx={[
            {
              backgroundColor: "transparent",
              borderRadius: "1rem",
              fontWeight: 600,
              color: "#1F1300",
            },
            (theme) =>
              theme.applyStyles("dark", {
                color: "#fff",
                border: "1px solid",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: theme.palette.secondary.dark,
                },
              }),
          ]}
        >
          Next
        </Button>
      </section>
    </div>
  );
}

export default FilePreview;
