import type {
  Submission,
  Assignment,
  Question,
  SubmissionReviewer,
  File,
} from "../generated/prisma/browser";

type SubmissionWithRelations = Submission & {
  assignment: Assignment & {
    questions: Question[];
  };

  reviewers: SubmissionReviewer[];

  file: File;
};

//Converts backend /DB information into frontend safe info. Hides ids, identities, redundant details too.
export function toFrontendSubmission(submission: SubmissionWithRelations) {
  return {
    id: submission.id,
    createdAt: submission.createdAt,

    assignment: {
      id: submission.assignment.id,
      title: submission.assignment.title,

      questions: submission.assignment.questions.map((q) => ({
        id: q.id,
        title: q.title,
      })),
    },

    reviewers: submission.reviewers.map((r) => ({
      anonName: r.anonName,
      completed: r.completed,
    })),

    file: {
      id: submission.file.id,
      originalName: submission.file.originalName,
      displayName: submission.file.displayName,
      extension: submission.file.extension,
      createdAt: submission.file.createdAt,
    },
  };
}
