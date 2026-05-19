import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const features = [
  {
    title: "Send inn teksten din",
    description:
      "Last opp teksten din og få tilbakemelding fra klassekameratene dine basert på kriteriene læreren har satt.",
  },
  {
    title: "Bli bedre av å vurdere",
    description:
      "Når du vurderer andres tekster lærer du faktisk ganske mye selv også. Det er litt poenget.",
  },
  {
    title: "Læreren bestemmer kriteriene",
    description:
      "Læreren skriver inn hva dere skal vurdere hverandre på, så alle vet hva de skal se etter.",
  },
];

const steps = [
  {
    number: "01",
    title: "Læreren lager oppgaven",
    body: "Læreren lager en oppgave og skriver inn hva elevene skal vurdere hverandre på.",
  },
  {
    number: "02",
    title: "Elevene leverer inn",
    body: "Elevene leverer inn teksten sin på plattformen innen fristen.",
  },
  {
    number: "03",
    title: "Alle vurderer hverandre",
    body: "Alle får tildelt noen tekster å vurdere og bruker kriteriene læreren lagde.",
  },
  {
    number: "04",
    title: "Du vurderer tilbakemeldingen",
    body: "Etter du har fått tilbakemelding kan du si om den var nyttig eller ikke. Da vet læreren hvem som faktisk tok det seriøst.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const featuresReveal = useReveal();
  const stepsReveal = useReveal();
  const splitReveal = useReveal();

  return (
    <div className=" min-h-screen overflow-x-hidden">
      <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-6 text-center overflow-hidden">
        <span className="absolute top-[4%]  left-[3%]  text-5xl animate-float        pointer-events-none select-none opacity-25">
          🍋
        </span>
        <span className="absolute top-[8%]  left-[18%] text-3xl animate-float-slow   pointer-events-none select-none opacity-20">
          🍎
        </span>
        <span className="absolute top-[3%]  left-[35%] text-4xl animate-float        pointer-events-none select-none opacity-20">
          🍇
        </span>
        <span className="absolute top-[6%]  right-[28%] text-3xl animate-float-slow  pointer-events-none select-none opacity-15">
          🍓
        </span>
        <span className="absolute top-[5%]  right-[12%] text-5xl animate-float       pointer-events-none select-none opacity-25">
          🍊
        </span>
        <span className="absolute top-[2%]  right-[3%]  text-3xl animate-float-slow  pointer-events-none select-none opacity-20">
          🍍
        </span>

        <span className="absolute top-[20%] left-[2%]  text-4xl animate-float-slow   pointer-events-none select-none opacity-20">
          🍉
        </span>
        <span className="absolute top-[25%] left-[12%] text-3xl animate-float        pointer-events-none select-none opacity-15">
          🍑
        </span>
        <span className="absolute top-[22%] right-[4%]  text-4xl animate-float       pointer-events-none select-none opacity-20">
          🥭
        </span>
        <span className="absolute top-[30%] right-[14%] text-3xl animate-float-slow  pointer-events-none select-none opacity-15">
          🍒
        </span>

        <span className="absolute top-[45%] left-[4%]  text-3xl animate-float        pointer-events-none select-none opacity-20">
          🫐
        </span>
        <span className="absolute top-[50%] left-[15%] text-4xl animate-float-slow   pointer-events-none select-none opacity-15">
          🍈
        </span>
        <span className="absolute top-[48%] right-[5%]  text-3xl animate-float-slow  pointer-events-none select-none opacity-20">
          🍋
        </span>
        <span className="absolute top-[42%] right-[16%] text-4xl animate-float       pointer-events-none select-none opacity-15">
          🍎
        </span>

        <span className="absolute bottom-[28%] left-[6%]  text-4xl animate-float     pointer-events-none select-none opacity-20">
          🍊
        </span>
        <span className="absolute bottom-[22%] left-[20%] text-3xl animate-float-slow pointer-events-none select-none opacity-15">
          🍇
        </span>
        <span className="absolute bottom-[30%] right-[7%]  text-5xl animate-float    pointer-events-none select-none opacity-20">
          🍓
        </span>
        <span className="absolute bottom-[20%] right-[20%] text-3xl animate-float-slow pointer-events-none select-none opacity-15">
          🍑
        </span>

        <span className="absolute bottom-[8%] left-[4%]  text-3xl animate-float-slow  pointer-events-none select-none opacity-20">
          🍍
        </span>
        <span className="absolute bottom-[5%] left-[22%] text-4xl animate-float       pointer-events-none select-none opacity-15">
          🍒
        </span>
        <span className="absolute bottom-[10%] left-[40%] text-3xl animate-float-slow pointer-events-none select-none opacity-15">
          🥭
        </span>
        <span className="absolute bottom-[7%] right-[22%] text-4xl animate-float      pointer-events-none select-none opacity-20">
          🫐
        </span>
        <span className="absolute bottom-[4%] right-[5%]  text-5xl animate-float-slow pointer-events-none select-none opacity-25">
          🍉
        </span>

        <div className="animate-hero-in relative z-10 max-w-2xl">
          <div
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border"
            style={{
              color: "var(--color-sage-green)",
              borderColor: "var(--color-sage-green)",
            }}
          >
            Hverandrevurdering for skoler
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Tilbakemeldinger
            <br />
            <span style={{ color: "var(--color-sage-green)" }}>
              som faktisk fungerer
            </span>
          </h1>

          <p className="text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            TillerFruits er en plattform for hverandrevurdering. Læreren lager
            oppgaven og setter kriteriene, elevene leverer inn og vurderer
            hverandre. Enkelt og greit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/home")}
              sx={[
                {
                  backgroundColor: "var(--color-bright-lemon)",
                  color: "var(--color-coffee-bean)",
                  paddingX: 3,
                  paddingY: 0.5,
                  fontWeight: 700,
                  borderRadius: 3,
                  border: "2px solid",
                  borderColor: "var(--color-coffee-bean)",
                },
                (theme) =>
                  theme.applyStyles("dark", {
                    "&:hover": {
                      backgroundColor: "transparent",
                      borderColor: "var(--color-bright-lemon)",
                      color: "var(--color-bright-lemon)",
                    },
                  }),
              ]}
            >
              Kom i gang
            </Button>
            <button
              className="px-8 py-3.5 font-semibold rounded-xl border-2 transition-all duration-200 hover:border-sage-green"
              onClick={() =>
                featuresReveal.ref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Se hvordan det fungerer
            </button>
          </div>
        </div>
      </div>

      <div ref={featuresReveal.ref} className=" px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{
              opacity: featuresReveal.visible ? 1 : 0,
              transform: featuresReveal.visible ? "none" : "translateY(24px)",
            }}
          >
            <h2 className="text-3xl font-bold">Hvorfor TillerFruits?</h2>
            <p className="text-lg text-grey-600">
              Her er hva du får ut av det.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl w-full p-7 border hover:-translate-y-1 hover:shadow-md cursor-default bg-bright-snow border-gray-200"
                style={{
                  opacity: featuresReveal.visible ? 1 : 0,
                  transform: featuresReveal.visible
                    ? "translateY(0)"
                    : "translateY(28px)",
                  transition: `opacity 0.6s ease ${i * 100 + 150}ms, transform 0.6s ease ${i * 100 + 150}ms, box-shadow 0.25s ease, translate 0.25s ease`,
                }}
              >
                <h3 className="text-lg font-bold text-coffee-bean mb-2">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-coffee-bean">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card ref={stepsReveal.ref}
      sx={[
            {
              backgroundColor: "var(--color-coffee-bean)",
              color: "var(--color-bright-snow)",
              paddingX: 6,
              paddingY: 10,
              fontWeight: 700,
              borderRadius: 3,
              
            },
            (theme) =>
              theme.applyStyles("dark", {
                  backgroundColor: "var(--color-sage-green)",
                  color: "(--color-coffee-bean)",
              }),
          ]}>
        <div className="max-w-full mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-16 transition-all duration-700"
            style={{
              color: "var(--color-bright-snow)",
              opacity: stepsReveal.visible ? 1 : 0,
              transform: stepsReveal.visible ? "none" : "translateY(20px)",
            }}
          >
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  width: "70%",
                  textAlign: "center",
                  opacity: stepsReveal.visible ? 1 : 0,
                  transform: stepsReveal.visible
                    ? "translateY(0)"
                    : "translateY(24px)",
                  transition: `opacity 0.55s ease ${i * 150 + 100}ms, transform 0.55s ease ${i * 150 + 100}ms`,
                }}
              >
                <div
                  className="text-5xl font-black mb-3 leading-none"
                  style={{ color: "var(--color-bright-lemon)" }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--color-bright-snow)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(246,247,248,0.5)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div ref={splitReveal.ref} className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-700"
            style={{
              background: "rgba(103,148,54,0.07)",
              border: "1px solid rgba(103,148,54,0.18)",
              opacity: splitReveal.visible ? 1 : 0,
              transform: splitReveal.visible
                ? "translateX(0)"
                : "translateX(-32px)",
            }}
          >
            <h3 className="text-2xl font-bold ">For elever</h3>
            <p className="leading-relaxed">
              Du leverer inn teksten din, vurderer noen medelever, og får
              tilbakemelding tilbake. Ganske greit system egentlig.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="self-start mt-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 text-bright-snow"
              style={{ background: "var(--color-sage-green)" }}
            >
              Logg inn som elev
            </button>
          </div>

          <div
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-700 delay-150"
            style={{
              background: "rgba(109,90,114,0.07)",
              border: "1px solid rgba(109,90,114,0.18)",
              opacity: splitReveal.visible ? 1 : 0,
              transform: splitReveal.visible
                ? "translateX(0)"
                : "translateX(32px)",
              transitionDelay: "150ms",
            }}
          >
            <h3 className="text-2xl font-bold ">For lærere</h3>
            <p className="leading-relaxed">
              Du setter opp oppgaven og kriteriene, så tar systemet seg av
              resten. Du kan se hvem som har levert inn og hvem som har vurdert.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="self-start mt-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 text-bright-snow"
              style={{ background: "var(--color-dusty-lavender)" }}
            >
              Logg inn som lærer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
