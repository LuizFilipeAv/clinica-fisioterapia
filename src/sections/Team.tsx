import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { RevealHeading } from '../components/RevealHeading'
import { team } from '../data/content'
import './Team.css'

export function Team() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.team__card').forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 80, rotation: 2, opacity: 0 },
            {
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 1.2,
              ease: EASE,
              delay: (i % 4) * 0.1,
              scrollTrigger: { trigger: card, start: 'top 92%', once: true },
            },
          )
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="equipe" className="section team">
      <div className="team__head">
        <RevealHeading text={team.title} className="team__title display" />
        <p className="team__intro">{team.intro}</p>
      </div>

      <ul className="team__grid">
        {team.members.map((m) => {
          const first = m.name.replace(/^Dra?\.\s+/, '').split(' ')[0]
          return (
            <li key={m.name} className="team__card">
              <article className="team__inner">
                <div className="team__photo">
                  <img src={m.image} alt={`Retrato de ${m.name}`} loading="lazy" decoding="async" />
                  <span className="team__ring" aria-hidden="true" />
                </div>
                <div className="team__info">
                  <p className="team__focus">
                    <span className="team__dot" aria-hidden="true" />
                    {m.focus}
                  </p>
                  <h3 className="team__name display">{m.name}</h3>
                  <p className="team__role">{m.role}</p>
                  <p className="team__cred">{m.credential}</p>
                  <a className="btn team__btn" href="#contato">
                    Agendar com {first}
                  </a>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
