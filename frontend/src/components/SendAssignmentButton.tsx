import Button from "@mui/material/Button";
import handleDistribution from "../utils/handleDistribution";

function SendAssignmentButton({
  setIsSent,
  setStudentAmount,
  setErrorMessage,
  fileId,
}: {
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
  setStudentAmount: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  fileId: number;
}) {
  return (
    <Button
      onClick={() =>
        handleDistribution({
          setIsSent,
          setStudentAmount,
          setErrorMessage,
          fileId,
        })
      }
      sx={[
        (theme) => ({
          border: "2px solid",
          color: theme.palette.secondary.main,
          fontSize: "1.1rem",
          marginTop: "1rem",
          paddingX: "1.5rem",
          paddingY: "0",
          borderRadius: "1rem",
          textTransform: "none",
          ":hover": {
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.secondary.dark,
            borderColor: "transparent",
            color: "#fff",
          },
        }),
        (theme) =>
          theme.applyStyles("dark", {
            backgroundColor: "transparent",
            border: "2px solid",
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
              color: "#fff",
            },
          }),
      ]}
    >
      Send til elever
    </Button>
  );
}

export default SendAssignmentButton;
