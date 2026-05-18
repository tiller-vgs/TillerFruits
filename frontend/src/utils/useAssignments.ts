import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FileTypeFromDB } from "../../types/types";

export default function useAssignments() {
  const navigate = useNavigate();

  const [newAssignments, setNewAssignments] = useState<FileTypeFromDB[]>([]);
  const [newAssignmentsTotal, setNewAssignmentsTotal] = useState<number>(0);
  const [myAssignments, setMyAssignments] = useState<FileTypeFromDB[]>([]);
  const [myAssignmentsTotal, setMyAssignmentsTotal] = useState<number>(0);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me/assignments", {
          credentials: "include",
        });

        const assignmentData = await res.json();
        setNewAssignments(assignmentData.data.assignmentFiles);
        setNewAssignmentsTotal(assignmentData.data.totalAssignmentFiles);
        setMyAssignments(assignmentData.data.files);
        setMyAssignmentsTotal(assignmentData.data.totalFiles);
        console.log(newAssignmentsTotal);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAssignment();
  }, [navigate]);

  return {
    newAssignments,
    newAssignmentsTotal,
    myAssignments,
    myAssignmentsTotal,
  };
}
