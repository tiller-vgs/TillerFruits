import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import SendAssignmentButton from "./SendAssignmentButton";
import { useState } from "react";

type FormData = {
  assignmentTitle: string;
  questions: {
    title: string;
  }[];
};

export default function QuestionSchema() {
  const [isSent, setIsSent] = useState<boolean>(false);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      assignmentTitle: "",
      questions: [{ title: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "questions",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  const secondaryTextSx = [
    {
      color: "#62748e",
      fontSize: "0.9rem",
    },
    (theme: any) =>
      theme.applyStyles("dark", {
        color: "#90a1b9",
      }),
  ];

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
          <TextField label="Oppgavetittel" {...register("assignmentTitle")} />
          {fields.map((field, index) => (
            <TextField
              key={field.id}
              label={`Question ${index + 1}`}
              {...register(`questions.${index}.title`)}
            />
          ))}

          <section className="flex flex-col w-2/3">
            <Button
              type="button"
              variant="contained"
              onClick={() => append({ title: "" })}
            >
              Legg til et spørsmål
            </Button>

            <SendAssignmentButton />

            {isSent && (
              <FormHelperText sx={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                Oppgaven er sendt til alle elever
              </FormHelperText>
            )}
          </section>
        </div>
      </form>
    </section>
  );
}
