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
          fontSize: {
            xs: "0.95rem",
            sm: "1.05rem",
            md: "1.2rem",
          },
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
      {!clickedPreview ? "Forhåndsvisning" : "Lukk forhåndsvisning"}
    </Button>
  );
}

export default FilePreviewButton;
