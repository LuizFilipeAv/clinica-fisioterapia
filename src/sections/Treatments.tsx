import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import { RevealHeading } from '../components/RevealHeading'
import { treatments } from '../data/content'
import './Treatments.css'

export function Treatments() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('.treatment')
        const cards = gsap.utils.toArray<HTMLElement>('.treatment__card')

        const stickyTop = (el: HTMLElement) => parseFloat(getComputedStyle(el).top)

        // Cards are sticky; as the next one slides over, the one beneath sinks back and tilts.
        // The effect runs only while they overlap: from the moment the next card's top touches
        // this card's bottom edge until the next card settles into its own sticky spot.
        cards.forEach((card, i) => {
          const next = items[i + 1]
          if (!next) return
          const depth = cards.length - 1 - i
          gsap.fromTo(
            card,
            // Explicit start values: tweening from filter "none" makes GSAP start at brightness(0).
            { scale: 1, rotate: 0, filter: 'brightness(1)' },
            {
              scale: 1 - depth * 0.04,
              rotate: i % 2 ? 1.5 : -1.5,
              filter: 'brightness(0.88)',
              ease: 'none',
              scrollTrigger: {
                trigger: next,
                start: () => `top ${stickyTop(items[i]) + card.offsetHeight}px`,
                end: () => `top ${stickyTop(next)}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        })

        // Each photo drifts inside its frame.
        gsap.utils.toArray<HTMLElement>('.treatment__media img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: img.closest('.treatment'), start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="tratamentos" className="section treatments">
      <header className="treatments__head">
        <RevealHeading text={treatments.title} className="treatments__title display" />
        <p className="treatments__intro">{treatments.intro}</p>
      </header>

      <ol className="treatments__stack">
        {treatments.items.map((item, i) => (
          <li key={item.title} className="treatment" style={{ '--i': i } as CSSProperties}>
            <article className={`treatment__card treatment__card--${i}`}>
              <div className="treatment__copy">
                <span className="treatment__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="treatment__title display">{item.title}</h3>
                <p className="treatment__text">{item.text}</p>
              </div>
              <div className="treatment__media">
                <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
