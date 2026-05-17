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

export default SendAssignmentButton;
