import Button from "@mui/material/Button";

function FilePreviewButton({
  clickedPreview,
  setClickedPreview,
}: {
  clickedPreview: boolean;
  setClickedPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      onClick={() => setClickedPreview((prev) => !prev)}
      sx={[
        (theme) => ({
          color: theme.palette.secondary.main,
          fontSize: "1.15rem",
          padding: "0.3rem",
          paddingX: "1rem",
          borderRadius: "1rem",
          textTransform: "none",
          border: "2px solid",
          borderColor: "transparent",

          ":hover": {
            borderColor: theme.palette.secondary.main,
          },
        }),
        (theme) =>
          theme.applyStyles("dark", {
            color: theme.palette.secondary.light,
            "&:hover": {
              borderColor: theme.palette.secondary.main,
            },
          }),
      ]}
    >
      {!clickedPreview ? "Preview dokumentet" : "Lukk forhåndsvisning"}
    </Button>
  );
}

export default FilePreviewButton;
