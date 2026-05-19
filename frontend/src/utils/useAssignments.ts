import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FrontendSubmission, RecipientAssignment } from "../../types/types";

export default function useAssignments() {
  const navigate = useNavigate();

  const [assignedSubmissions, setAssignedSubmissions] = useState<
    FrontendSubmission[]
  >([]);
  const [mySubmissions, setMySubmissions] = useState<FrontendSubmission[]>([]);
  const [recipientAssignments, setRecipientAssignments] = useState<
    RecipientAssignment[]
  >([]);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me/schoolwork", {
          credentials: "include",
        });

        const submissionData = await res.json();
        setAssignedSubmissions(submissionData.data.assignedSubmissions);
        setMySubmissions(submissionData.data.userSubmissions);
        setRecipientAssignments(submissionData.data.recipientAssignments);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAssignment();
  }, [navigate]);

  return { assignedSubmissions, mySubmissions, recipientAssignments };
}
