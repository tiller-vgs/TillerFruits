import {
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import SendAssignmentButton from "./SendAssignmentButton";
import { useState } from "react";
import { handleSendNewAssignment } from "../utils/handleDistribution";
import DeleteIcon from "@mui/icons-material/Delete";
import AddQuestionButton from "./AddQuestionButton";
import { secondaryTextSx } from "../../types/types";

export type AssignmentFormData = {
  assignmentTitle: string;
  questions: {
    title: string;
  }[];
};

export default function QuestionSchema() {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentFormData>({
    mode: "onChange",
    reValidateMode: "onChange",

    defaultValues: {
      assignmentTitle: "",
      questions: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  function onSubmit(sendData: AssignmentFormData) {
    handleSendNewAssignment({
      sendData,
      setIsSent,
      setErrorMessage,
    });
  }

  return (
    <section className="py-3 md:py-6">
      <div className="mb-5 border-b border-slate-300 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Skriv inn spørsmål</h2>

            <Typography sx={[...secondaryTextSx, { marginTop: "0.15rem" }]}>
              Oppgaven sendes til alle elever
            </Typography>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <TextField
            label="Oppgavetittel"
            error={!!errors.assignmentTitle}
            helperText={errors.assignmentTitle?.message}
            sx={{ width: { md: "50%" } }}
            {...register("assignmentTitle", {
              required: "Oppgavetittel er påkrevd",
              maxLength: {
                value: 100,
                message: "Oppgavetittel kan maks være 100 tegn",
              },
              validate: (value) =>
                value.trim().length > 0 || "Oppgavetittel kan ikke være tom",
            })}
          />
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-full items-center gap-3">
              <TextField
                label={`Question ${index + 1}`}
                error={!!errors.questions?.[index]?.title}
                helperText={errors.questions?.[index]?.title?.message}
                sx={{ width: { md: "75%" } }}
                {...register(`questions.${index}.title`, {
                  required: "Spørsmål er påkrevd",
                  maxLength: {
                    value: 150,
                    message: "Spørsmål kan maks være 150 tegn",
                  },
                  validate: (value) =>
                    value.trim().length > 0 || "Spørsmål kan ikke være tomt",
                })}
              />

              {fields.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => remove(index)}
                  aria-label="delete"
                >
                  <DeleteIcon
                    fontSize="medium"
                    sx={{
                      borderRadius: "1rem",
                      ":hover": { color: "inherit", fontSize: "2rem" },
                    }}
                  />
                </IconButton>
              )}
            </div>
          ))}

          <section className="flex flex-col w-2/3 gap-3">
            <AddQuestionButton append={append} />

            {fields.length === 0 && (
              <FormHelperText error>Du må ha minst ett spørsmål</FormHelperText>
            )}

            <SendAssignmentButton />

            {isSent && (
              <FormHelperText sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                Oppgaven er sendt til alle elever
              </FormHelperText>
            )}

            {errorMessage && (
              <FormHelperText error>{errorMessage}</FormHelperText>
            )}
          </section>
        </div>
      </form>
    </section>
  );
}
