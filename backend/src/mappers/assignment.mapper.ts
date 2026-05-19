import type { Assignment, Question } from "../generated/prisma/browser";

type AssignmentWithQuestions = Assignment & {
  questions: Question[];
};

export function toFrontendAssignment(assignment: AssignmentWithQuestions) {
  return {
    id: assignment.id,
    title: assignment.title,
    questions: assignment.questions.map((q) => ({
      id: q.id,
      title: q.title,
    })),
  };
}
