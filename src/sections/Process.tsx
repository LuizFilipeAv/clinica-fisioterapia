import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import { chromeOffset } from '../lib/layout'
import { process } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { RevealHeading } from '../components/RevealHeading'
import { RevealImage } from '../components/RevealImage'
import './Process.css'

const R = 46 // progress ring radius in the 100x100 viewBox
const CIRC = 2 * Math.PI * R

export function Process() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Without motion the steps stay a plain ordered list (the CSS default).
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const root = ref.current!
        root.classList.add('is-animated')
        const steps = gsap.utils.toArray<HTMLElement>('.process__step')

        gsap.set(steps.slice(1), { autoAlpha: 0, yPercent: 30 })
        gsap.set('.process__progress', { strokeDasharray: CIRC, strokeDashoffset: CIRC })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '.process__stage',
            start: () => `top ${chromeOffset()}px`,
            end: '+=320%',
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        // The circle grows from a seed into the stage, then each step hands over to the next.
        tl.fromTo('.process__circle', { scale: 0.25 }, { scale: 1, duration: 1, ease: 'power3.out' })
          .from('.process__ring', { opacity: 0, scale: 0.7, duration: 0.6 }, 0.3)
          .fromTo('.process__marquee-track', { xPercent: 0 }, { xPercent: -50, ease: 'none', duration: 5 }, 0)
          .to('.process__progress', { strokeDashoffset: CIRC * 0.75, duration: 0.6, ease: 'none' }, 0.6)

        steps.slice(1).forEach((step, i) => {
          const at = 1.4 + i * 1.2
          tl.to(steps[i], { autoAlpha: 0, yPercent: -30, duration: 0.5 }, at)
            .to(step, { autoAlpha: 1, yPercent: 0, duration: 0.5 }, at + 0.25)
            .to('.process__progress', { strokeDashoffset: CIRC * (0.5 - i * 0.25), duration: 0.75, ease: 'none' }, at)
        })

        return () => root.classList.remove('is-animated')
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="como-funciona" className="section process">
      <SectionLabel id="como-funciona" />

      <header className="process__head">
        <div className="process__copy">
          <RevealHeading text={process.title} className="process__title display" />
          <p className="process__intro">{process.intro}</p>
        </div>
        <RevealImage src={process.image} alt={process.imageAlt} className="process__photo" position="center 30%" />
      </header>

      <div className="process__stage">
        <div className="process__marquee" aria-hidden="true">
          <div className="process__marquee-track display">
            <span>{process.title} · </span>
            <span>{process.title} · </span>
            <span>{process.title} · </span>
            <span>{process.title} · </span>
          </div>
        </div>

        <div className="process__circle">
          <svg className="process__ring" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="process-ring-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
            </defs>
            <circle className="process__track" cx="50" cy="50" r={R} />
            <circle className="process__progress" cx="50" cy="50" r={R} />
            <g className="process__spin">
              <text>
                <textPath href="#process-ring-path" textLength={2 * Math.PI * 40 - 1}>
                  {process.ring.repeat(2)}
                </textPath>
              </text>
            </g>
          </svg>

          <ol className="process__steps">
            {process.steps.map((step, i) => (
              <li key={step.title} className="process__step">
                <span className="process__step-label">Etapa</span>
                <span className="process__step-num display">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="process__step-title display">{step.title}</h3>
                <p className="process__step-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
