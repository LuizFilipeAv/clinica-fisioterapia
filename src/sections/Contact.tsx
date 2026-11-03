import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import { RevealHeading } from '../components/RevealHeading'
import { RevealImage } from '../components/RevealImage'
import { Marquee } from '../components/Marquee'
import { clinic, contact } from '../data/content'
import './Contact.css'

export function Contact() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const btn = ref.current!.querySelector<HTMLElement>('.contact__cta')
        if (!btn) return
        const qx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' })
        const qy = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          qx(gsap.utils.clamp(-1, 1, dx) * 10)
          qy(gsap.utils.clamp(-1, 1, dy) * 10)
        }
        const leave = () => {
          qx(0)
          qy(0)
        }
        btn.addEventListener('pointermove', move)
        btn.addEventListener('pointerleave', leave)
        return () => {
          btn.removeEventListener('pointermove', move)
          btn.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="contato" className="section contact">
      <div className="contact__head">
        <RevealHeading text={contact.title} className="contact__title display" />
      </div>

      <div className="contact__media">
        <RevealImage src={contact.image} alt={contact.imageAlt} className="contact__image" />
        <Marquee text={contact.marquee} distance={-30} className="contact__marquee" />
      </div>

      <div className="contact__info">
        <div className="contact__cell">
          <h3 className="contact__label">Endereço</h3>
          <p>{clinic.address}</p>
          <p>{clinic.city}</p>
        </div>
        <div className="contact__cell">
          <h3 className="contact__label">Telefone</h3>
          <p>
            <a href={clinic.phoneHref}>{clinic.phone}</a>
          </p>
          <p>
            <a href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp {clinic.whatsapp}
            </a>
          </p>
        </div>
        <div className="contact__cell">
          <h3 className="contact__label">E-mail</h3>
          <p>
            <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </p>
        </div>
        <div className="contact__cell">
          <h3 className="contact__label">Horário</h3>
          <ul className="contact__hours">
            {clinic.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contact__links">
        <a className="btn btn--gold contact__cta" href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer">
          {contact.cta}
        </a>
        <a className="contact__outline" href={clinic.mapsHref} target="_blank" rel="noopener noreferrer">
          Abrir no Google Maps
        </a>
      </div>
    </section>
  )
}
