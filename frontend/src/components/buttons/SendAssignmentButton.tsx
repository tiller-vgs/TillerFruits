import Button from "@mui/material/Button";

export default function SendAssignmentButton({
  type = "submit",
}: {
  type?: "button" | "submit";
}) {
  return (
    <Button
      type={type}
      sx={[
        (theme) => ({
          color: "#fff",
          backgroundColor: theme.palette.secondary.dark,
          fontSize: "1.1rem",
          marginTop: "1rem",
          paddingX: "1.5rem",
          paddingY: "0",
          borderRadius: "1rem",
          textTransform: "none",
          ":hover": {
            boxShadow: theme.shadows[3],
            backgroundColor: "transparent",
            border: "2px solid",
            color: theme.palette.secondary.main,
          },
        }),
        (theme) =>
          theme.applyStyles("dark", {
            backgroundColor: theme.palette.secondary.dark,
            color: "#fff",
            "&:hover": {
              color: theme.palette.secondary.main,
              backgroundColor: "transparent",
              borderColor: theme.palette.secondary.main,
              border: "2px solid",
            },
          }),
      ]}
    >
      Send til elever
    </Button>
  );
}
