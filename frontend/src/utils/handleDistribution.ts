export default async function handleSendingToStudents({
  setIsSent,
  setStudentAmount,
  fileId,
}: {
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
  setStudentAmount: React.Dispatch<React.SetStateAction<number>>;
  fileId: number;
}) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/admin/files/${fileId}/distribute`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      throw new Error("Distribution failed");
    }
    const data = await response.json();

    setIsSent(true);
    setStudentAmount(data.data.studentAmount);
  } catch (error: any) {
    setIsSent(false);
    console.error("Error distributing:", error.message);
  }
}
