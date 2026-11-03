import { useRef } from 'react'
import { gsap, useGSAP, EASE, DUR } from '../lib/motion'
import { specialties } from '../data/content'
import { RevealHeading } from '../components/RevealHeading'
import './Specialties.css'

export function Specialties() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Cards rise and settle out of a fan.
        gsap.fromTo(
          '.specialty',
          { y: 120, rotate: (i) => (i % 2 ? 8 : -6) },
          {
            y: 0,
            rotate: 0,
            duration: DUR.slow,
            ease: EASE,
            stagger: 0.06,
            scrollTrigger: { trigger: '.specialties__track', start: 'top 90%', once: true },
          },
        )
      })

      // Desktop: the section pins, vertical scroll drives the row sideways,
      // and each card sways as it crosses the screen.
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = ref.current!.querySelector<HTMLElement>('.specialties__pin')!
        const track = ref.current!.querySelector<HTMLElement>('.specialties__track')!
        const distance = () => track.scrollWidth - pin.clientWidth

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        gsap.utils.toArray<HTMLElement>('.specialty__card').forEach((card, i) => {
          gsap.fromTo(
            card,
            { rotate: i % 2 ? 5 : -4, y: i % 2 ? 50 : -30 },
            {
              rotate: i % 2 ? -4 : 5,
              y: i % 2 ? -30 : 50,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: slide,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        gsap.fromTo(
          '.specialties__progress span',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="especialidades" className="section specialties">
      <div className="specialties__pin">
        <header className="specialties__head">
          <RevealHeading text="Especialidades," className="specialties__title display" />
          <p className="specialties__sub">em que podemos ajudar:</p>
        </header>

        <ol className="specialties__track">
          {specialties.map((item, i) => (
            <li key={item.title} className="specialty">
              <article className={`specialty__card specialty__card--${i % 4}`}>
                <span className="specialty__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="specialty__title display">{item.title}</h3>
                <p className="specialty__text">{item.text}</p>
              </article>
            </li>
          ))}
        </ol>

        <div className="specialties__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
