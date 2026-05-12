import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAssignments() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState<[]>([]);

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

        setAssignments(assignmentData.data);
      } catch (error) {
        console.error(error);
      }
    }

    checkAuthInAssignments();
  }, [navigate]);

  return assignments;
}
