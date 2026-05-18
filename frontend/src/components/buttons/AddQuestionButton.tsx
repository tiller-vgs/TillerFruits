import Button from "@mui/material/Button";
import type { UseFieldArrayAppend } from "react-hook-form";
import type { AssignmentFormData } from "../QuestionSchema";

export default function AddQuestionButton({
  append,
}: {
  append: UseFieldArrayAppend<AssignmentFormData, "questions">;
}) {
  return (
    <Button
      type="button"
      variant="contained"
      onClick={() => append({ title: "" })}
      sx={[
        (theme) => ({
          backgroundColor: "#1F1300",
          fontWeight: 600,
          borderRadius: "1rem",
          textTransform: "none",
          transition: "0.2s ease",
          ":hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.secondary.dark,
          },
        }),
        (theme) =>
          theme.applyStyles("dark", {
            color: "#000",
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }),
      ]}
    >
      Legg til et spørsmål
    </Button>
  );
}
