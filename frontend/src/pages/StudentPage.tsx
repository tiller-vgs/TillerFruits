import useAssignments from "../utils/useAssignments";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function StudentPage() {
  const { newAssignments, myAssignments } = useAssignments();
  const navigate = useNavigate();

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

  const openButtonSx = [
    (theme: any) => ({
      backgroundColor: alpha(theme.palette.secondary.light, 0.3),
      color: theme.palette.secondary.dark,
      fontSize: "0.9rem",
      fontWeight: 600,
      paddingY: "0.2rem",
      paddingX: "1.5rem",
      borderRadius: "0.75rem",
      textTransform: "none",

      "&:hover": {
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
      },
    }),
    (theme: any) =>
      theme.applyStyles("dark", {
        color: "#000",
        backgroundColor: theme.palette.secondary.main,

        "&:hover": {
          backgroundColor: theme.palette.secondary.dark,
        },
      }),
  ];

  const submittedButtonSx = [
    (theme: any) => ({
      backgroundColor: alpha("#1f1300", 0.12),
      color: "#1f1300",
      fontWeight: 600,
      fontSize: "0.9rem",
      paddingY: "0.2rem",
      paddingX: "1.5rem",
      borderRadius: "0.75rem",
      textTransform: "none",

      "&:hover": {
        boxShadow: theme.shadows[1],
        backgroundColor: alpha("#1f1300", 0.7),
        color: "#fff",
      },
    }),

    (theme: any) =>
      theme.applyStyles("dark", {
        color: "#000",
        backgroundColor: "#f6f7f8",

        "&:hover": {
          backgroundColor: alpha("#1f1300", 0.3),
          border: "1px solid",
          borderColor: "#f6f7f8",
          color: "#f6f7f8",
        },
      }),
  ];

  return (
    <main className="flex min-h-[calc(100dvh-165px)] flex-col items-center justify-between xs:px-3 lg:px-15 py-8">
      <div className="flex w-full flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-slate-300 pb-6">
          <div className="flex flex-col mx-4.5">
            <h1 className="text-4xl font-bold">Studentside</h1>

            <Typography sx={[...secondaryTextSx, { marginTop: "0.3rem" }]}>
              Her kan du se filer du har fått tildelt og filer du selv har
              lastet opp.
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="p-2 px-5">
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                NYE OPPGAVER:
              </Typography>

              <h2 className="mt-2 text-4xl font-bold">
                {newAssignments.length}
              </h2>

              <Typography sx={[...secondaryTextSx, { marginTop: "0.5rem" }]}>
                Filer som trenger tilbakemelding
              </Typography>
            </div>

            <div className="p-2 px-5">
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                DINE OPPLASTINGER:
              </Typography>

              <h2 className="mt-2 text-4xl font-bold">
                {myAssignments.length}
              </h2>

              <Typography sx={[...secondaryTextSx, { marginTop: "0.5rem" }]}>
                Filer du selv har sendt inn
              </Typography>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="px-6">
            <div className="mb-5 border-b border-slate-300 pb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Nye filer</h2>

                  <Typography
                    sx={[...secondaryTextSx, { marginTop: "0.15rem" }]}
                  >
                    Filer du må gi tilbakemelding på
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {newAssignments.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Typography sx={secondaryTextSx}>
                    Ingen nye filer tilgjengelig.
                  </Typography>
                </div>
              ) : (
                newAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-300 px-4 py-4 transition hover:border-dusty-lavender hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-bright-lemon/70 p-2 text-coffee-bean">
                        <DescriptionOutlinedIcon />
                      </div>

                      <div>
                        <p className="font-medium">{assignment.originalName}</p>
                        <Typography sx={secondaryTextSx}>
                          Klar for tilbakemelding
                        </Typography>
                      </div>
                    </div>

                    <Button
                      sx={openButtonSx}
                      onClick={() => {
                        navigate(`/me/assignments/${assignment.id}`);
                      }}
                    >
                      Åpne
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="px-6">
            <div className="mb-5 border-b border-slate-300 pb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Dine filer</h2>

                  <Typography
                    sx={[...secondaryTextSx, { marginTop: "0.15rem" }]}
                  >
                    Filer du selv har lastet opp
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {myAssignments.length === 0 ? (
                <div className="rounded-2xl border border-slate-300 px-5 py-8 text-center">
                  <Typography sx={secondaryTextSx}>
                    Du har ikke lastet opp noen filer enda.
                  </Typography>
                </div>
              ) : (
                myAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-300 px-4 py-4 transition hover:border-dusty-lavender hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-sage-green p-2 text-coffee-bean">
                        <UploadFileOutlinedIcon />
                      </div>

                      <div>
                        <p className="font-medium">{assignment.originalName}</p>

                        <Typography sx={secondaryTextSx}>
                          Lastet opp av deg
                        </Typography>
                      </div>
                    </div>

                    <Button
                      sx={submittedButtonSx}
                      onClick={() => {
                        navigate(`/me/assignments/${assignment.id}`);
                      }}
                    >
                      Sendt inn
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default StudentPage;
