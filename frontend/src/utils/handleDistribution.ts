import type { AssignmentFormData } from "../components/QuestionSchema";

export async function handleSendingToStudents({
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
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/admin/files/${fileId}/distribute`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        setErrorMessage("Filen har allerede blitt sendt tidligere.");
      } else if (response.status === 404) {
        setErrorMessage("Filen finnes ikke.");
      } else {
        setErrorMessage(data.message || "Noe gikk galt.");
      }

      return;
    }

    setIsSent(true);
    setStudentAmount(data.data.studentAmount);
  } catch (error: any) {
    setIsSent(false);
    setErrorMessage(error.message);
  }
}

export async function handleSendNewAssignment({
  sendData,
  setIsSent,
  setErrorMessage,
}: {
  sendData: AssignmentFormData;
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/admin/create-assignment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        setErrorMessage("Filen har allerede blitt sendt tidligere.");
      } else if (response.status === 404) {
        setErrorMessage("Filen finnes ikke.");
      } else {
        setErrorMessage(data.message || "Noe gikk galt.");
      }

      return;
    }

    setIsSent(true);
  } catch (error: any) {
    setIsSent(false);
    setErrorMessage(error.message);
  }
}
