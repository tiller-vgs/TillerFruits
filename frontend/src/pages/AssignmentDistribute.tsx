import { Typography } from "@mui/material";
import QuestionSchema from "../components/QuestionSchema";
import { secondaryTextSx } from "../../types/types";

function AssignmentDistribute() {
  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col items-center sm:px-3 lg:px-15 py-8">
      <div className="flex w-full flex-col gap-2">
        <header className="border-b border-slate-300 pb-2">
          <h1 className="text-4xl font-bold mb-2">Lag ny oppgave</h1>

          <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
            Lag spørsmål/vurderingskriterier og publiser oppgaven for klassen
            din
          </Typography>
        </header>
        <section className="w-1/2">
          <QuestionSchema />
        </section>
      </div>
    </main>
  );
}

export default AssignmentDistribute;
