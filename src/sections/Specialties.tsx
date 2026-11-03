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
        // Cards rise out of their row one after another.
        gsap.from('.specialty__inner', {
          yPercent: 100,
          duration: DUR.standard * 1.3,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: '.specialties__track', start: 'top 85%', once: true },
        })
      })

      // Desktop: the section pins and vertical scroll drives the row sideways.
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = ref.current!.querySelector<HTMLElement>('.specialties__track')!
        const distance = () => track.scrollWidth - track.clientWidth

        gsap.to(track.children, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.specialties__pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
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
              <div className="specialty__inner">
                <span className="specialty__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="specialty__title">{item.title}</h3>
                <p className="specialty__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
