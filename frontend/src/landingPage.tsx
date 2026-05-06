import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

const features = [
  {
    emoji: '📝',
    title: 'Send inn arbeidet ditt',
    description: 'Last opp teksten din og få meningsfull, kriteriebasert tilbakemelding fra klassekameratene dine.',
  },
  {
    emoji: '🌱',
    title: 'Bli en bedre skribent',
    description: 'Å vurdere andre lærer deg like mye som å bli vurdert selv — tren opp det kritiske blikket ditt.',
  },
  {
    emoji: '🎯',
    title: 'Lærerstyrte kriterier',
    description: 'Læreren definerer vurderingskriteriene slik at tilbakemeldingene blir fokuserte, rettferdige og lærerike.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Læreren setter scenen',
    body: 'Opprett en oppgave og definer tydelige vurderingskriterier som elevene skal følge.',
  },
  {
    number: '02',
    title: 'Elevene leverer inn',
    body: 'Alle laster opp teksten sin før fristen — ingen rot i innboksen.',
  },
  {
    number: '03',
    title: 'Hverandrevurdering starter',
    body: 'Elevene vurderer hverandres tekster veiledet av lærerens kriterier.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const featuresReveal = useReveal()
  const stepsReveal = useReveal()
  const splitReveal = useReveal()
  const ctaReveal = useReveal()

  return (
    <div className="bg-bright-snow min-h-screen overflow-x-hidden">

      <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-6 text-center overflow-hidden">

        <span className="absolute top-[10%] left-[6%] text-6xl animate-float pointer-events-none select-none opacity-30">🍋</span>
        <span className="absolute top-[22%] right-[8%] text-5xl animate-float-slow pointer-events-none select-none opacity-25">🌿</span>
        <span className="absolute bottom-[20%] left-[10%] text-4xl animate-float-slow pointer-events-none select-none opacity-20">🍃</span>
        <span className="absolute bottom-[12%] right-[9%] text-5xl animate-float pointer-events-none select-none opacity-30">🍋</span>

        <div className="animate-hero-in relative z-10 max-w-2xl">
          <div
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border"
            style={{ color: 'var(--color-sage-green)', borderColor: 'var(--color-sage-green)', background: 'rgba(103,148,54,0.08)' }}
          >
            Hverandrevurdering for skoler
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-coffee-bean leading-[1.1] mb-6 tracking-tight">
            Tilbakemeldinger<br />
            <span style={{ color: 'var(--color-sage-green)' }}>som faktisk fungerer</span>
          </h1>

          <p className="text-xl mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(31,19,0,0.6)' }}>
            TillerFruits hjelper lærere med å sette kriterier og elever med å vurdere hverandres tekster — og bygger bedre skribenter én innlevering om gangen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/home')}
              className="px-8 py-3.5 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-bright-snow bg-coffee-bean hover:bg-sage-green"
            >
              Kom i gang
            </button>
            <button
              className="px-8 py-3.5 font-semibold rounded-xl border-2 transition-all duration-200 text-coffee-bean hover:text-sage-green border-coffee-bean/20 hover:border-sage-green"
              onClick={() => featuresReveal.ref.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Se hvordan det fungerer ↓
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 block">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <div ref={featuresReveal.ref} className="bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: featuresReveal.visible ? 1 : 0, transform: featuresReveal.visible ? 'none' : 'translateY(24px)' }}
          >
            <h2 className="text-3xl font-bold text-coffee-bean mb-3">Hvorfor TillerFruits?</h2>
            <p className="text-lg" style={{ color: 'rgba(31,19,0,0.5)' }}>
              Alt klasserommet ditt trenger for effektiv hverandrevurdering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl p-7 border hover:-translate-y-1 hover:shadow-md cursor-default"
                style={{
                  background: 'var(--color-bright-snow)',
                  borderColor: 'rgba(31,19,0,0.06)',
                  opacity: featuresReveal.visible ? 1 : 0,
                  transform: featuresReveal.visible ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.6s ease ${i * 100 + 150}ms, transform 0.6s ease ${i * 100 + 150}ms, box-shadow 0.25s ease, translate 0.25s ease`,
                }}
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="text-lg font-bold text-coffee-bean mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(31,19,0,0.55)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={stepsReveal.ref} className="px-6 py-24" style={{ background: 'var(--color-coffee-bean)' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-16 transition-all duration-700"
            style={{
              color: 'var(--color-bright-snow)',
              opacity: stepsReveal.visible ? 1 : 0,
              transform: stepsReveal.visible ? 'none' : 'translateY(20px)',
            }}
          >
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  opacity: stepsReveal.visible ? 1 : 0,
                  transform: stepsReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.55s ease ${i * 150 + 100}ms, transform 0.55s ease ${i * 150 + 100}ms`,
                }}
              >
                <div className="text-5xl font-black mb-3 leading-none" style={{ color: 'var(--color-bright-lemon)' }}>
                  {step.number}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-bright-snow)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,247,248,0.5)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={splitReveal.ref} className="bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-700"
            style={{
              background: 'rgba(103,148,54,0.07)',
              border: '1px solid rgba(103,148,54,0.18)',
              opacity: splitReveal.visible ? 1 : 0,
              transform: splitReveal.visible ? 'translateX(0)' : 'translateX(-32px)',
            }}
          >
            <div className="text-4xl">🎒</div>
            <h3 className="text-2xl font-bold text-coffee-bean">For elever</h3>
            <p className="leading-relaxed" style={{ color: 'rgba(31,19,0,0.65)' }}>
              Lever inn tekstene dine, vurder medelevene dine, og se skrivingen din bli bedre for hver runde. Tilbakemeldinger som er raske, ærlige og lærerike.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="self-start mt-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 text-bright-snow"
              style={{ background: 'var(--color-sage-green)' }}
            >
              Logg inn som elev →
            </button>
          </div>

          <div
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-700 delay-150"
            style={{
              background: 'rgba(109,90,114,0.07)',
              border: '1px solid rgba(109,90,114,0.18)',
              opacity: splitReveal.visible ? 1 : 0,
              transform: splitReveal.visible ? 'translateX(0)' : 'translateX(32px)',
              transitionDelay: '150ms',
            }}
          >
            <div className="text-4xl">📋</div>
            <h3 className="text-2xl font-bold text-coffee-bean">For lærere</h3>
            <p className="leading-relaxed" style={{ color: 'rgba(31,19,0,0.65)' }}>
              Definer kriteriene, følg med på hvordan elevene vurderer hverandre, og få innsikt i klassen din — uten ekstra administrativt arbeid.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="self-start mt-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 text-bright-snow"
              style={{ background: 'var(--color-dusty-lavender)' }}
            >
              Logg inn som lærer →
            </button>
          </div>
        </div>
      </div>

      <div ref={ctaReveal.ref} className="py-28 px-6 text-center bg-bright-snow">
        <div
          className="max-w-xl mx-auto transition-all duration-700"
          style={{ opacity: ctaReveal.visible ? 1 : 0, transform: ctaReveal.visible ? 'none' : 'translateY(24px)' }}
        >
          <div className="text-5xl mb-6">🌿</div>
          <h2 className="text-4xl font-extrabold text-coffee-bean mb-4 tracking-tight">
            Klar til å vokse sammen?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(31,19,0,0.6)' }}>
            Bli med på TillerFruits og gjør klasserommet ditt til et skriverfellesskap.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="px-10 py-4 font-bold rounded-xl text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sage-green/20 text-bright-snow bg-sage-green hover:brightness-110"
          >
            Kom i gang gratis →
          </button>
        </div>
      </div>

    </div>
  )
}