import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { RevealHeading } from '../components/RevealHeading'
import { RevealImage } from '../components/RevealImage'
import { treatments } from '../data/content'
import './Treatments.css'

const SPEEDS = [1, 1.6, 0.7, 1.3]

export function Treatments() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.treatments__panel')

        gsap.from(panels, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: '.treatments__panels', start: 'top 85%', once: true },
        })
      })

      // Drift at different speeds on desktop only (single column on mobile)
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
        const inners = gsap.utils.toArray<HTMLElement>('.treatments__drift')
        inners.forEach((el, i) => {
          const f = SPEEDS[i % SPEEDS.length]
          gsap.fromTo(
            el,
            { yPercent: 20 * f },
            {
              yPercent: -20 * f,
              ease: 'none',
              scrollTrigger: { trigger: '.treatments__panels', start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="tratamentos" className="section treatments">
      <div className="treatments__head">
        <RevealHeading text={treatments.title} className="treatments__title display" />
        <p className="treatments__intro">{treatments.intro}</p>
      </div>

      <ol className="treatments__panels">
        {treatments.items.map((item, i) => (
          <li key={item.title} className="treatments__cell">
            <div className="treatments__drift">
              <article className="treatments__panel">
                <p className="treatments__num">
                  <span className="treatments__dot" aria-hidden="true" />
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="treatments__name display">{item.title}</h3>
                <p className="treatments__text">{item.text}</p>
              </article>
            </div>
          </li>
        ))}
      </ol>

      <RevealImage
        src={treatments.image}
        alt={treatments.imageAlt}
        className="treatments__image"
        position="center 40%"
      />
    </section>
  )
}
