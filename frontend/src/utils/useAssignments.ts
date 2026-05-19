import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import type { FileTypeFromDB } from "../types/types";
=======
import type { FrontendSubmission } from "../../types/types";
>>>>>>> c93454fb41cf0fe4a260a51e1c7324e829c8957f

export default function useAssignments() {
  const navigate = useNavigate();

  const [assignedSubmissions, setAssignedSubmissions] = useState<
    FrontendSubmission[]
  >([]);
  const [mySubmissions, setMySubmissions] = useState<FrontendSubmission[]>([]);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/me/schoolwork", {
          credentials: "include",
        });

        const submissionData = await res.json();
        setAssignedSubmissions(submissionData.data.assignedSubmissions);
        setMySubmissions(submissionData.data.userSubmissions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAssignment();
  }, [navigate]);

  return { assignedSubmissions, mySubmissions };
}
