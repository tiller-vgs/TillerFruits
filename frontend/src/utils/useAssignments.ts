import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FrontendSubmission } from "../../types/types";

export default function useAssignments() {
  const navigate = useNavigate();

  const [assignedSubmissions, setAssignedSubmissions] = useState<FrontendSubmission[]>([]);
  const [mySubmissions, setMySubmissions] = useState<FrontendSubmission[]>([]);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me/assignments", {
          credentials: "include",
        });

        const assignmentData = await res.json();
        setAssignedSubmissions(assignmentData.data.assignedSubmissions);
        setMySubmissions(assignmentData.data.userSubmissions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAssignment();
  }, [navigate]);

  return { assignedSubmissions, mySubmissions };
}
