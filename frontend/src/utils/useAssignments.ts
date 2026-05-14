import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FileTypeFromDB } from "../../types/types";

export default function useAssignments() {
  const navigate = useNavigate();

  const [newAssignments, setNewAssignments] = useState<FileTypeFromDB[]>([]);
  const [myAssignments, setMyAssignments] = useState<FileTypeFromDB[]>([]);

  useEffect(() => {
    async function checkAuthInAssignments() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me/assignments", {
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const assignmentData = await res.json();
        console.log(assignmentData);
        setNewAssignments(assignmentData.data.assignmentFiles);
        setMyAssignments(assignmentData.data.myAssignmentFiles);
      } catch (error) {
        console.error(error);
      }
    }

    checkAuthInAssignments();
  }, [navigate]);

  return { newAssignments, myAssignments };
}
