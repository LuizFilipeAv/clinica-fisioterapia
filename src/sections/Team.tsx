import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { SectionLabel } from '../components/SectionLabel'
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
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: EASE,
            delay: (i % 2) * 0.12,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          })
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="equipe" className="section team">
      <SectionLabel id="equipe" />
      <div className="team__head">
        <RevealHeading text={team.title} className="team__title display" />
        <div className="team__aside">
          <p className="team__count display" aria-hidden="true">
            {String(team.members.length).padStart(2, '0')}
          </p>
          <p className="team__intro">{team.intro}</p>
        </div>
      </div>

      <ul className="team__grid">
        {team.members.map((m) => {
          const first = m.name.replace(/^Dra?\.\s+/, '').split(' ')[0]
          return (
            <li key={m.name} className="team__card">
              <div className="team__photo">
                <img
                  src={m.image}
                  alt={`Retrato de ${m.name}`}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: '35% 30%' }}
                />
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
            </li>
          )
        })}
      </ul>
    </section>
  )
}
