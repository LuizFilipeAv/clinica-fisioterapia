import { RevealHeading } from '../components/RevealHeading'
import { RevealImage } from '../components/RevealImage'
import { Marquee } from '../components/Marquee'
import { clinic, contact } from '../data/content'
import './Contact.css'

export function Contact() {
  return (
    <section id="contato" className="section contact">
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
        <a className="contact__link" href={clinic.mapsHref} target="_blank" rel="noopener noreferrer">
          <span>Abrir no Google Maps</span>
        </a>
        <a className="contact__link" href={clinic.whatsappHref} target="_blank" rel="noopener noreferrer">
          <span>{contact.cta}</span>
        </a>
      </div>
    </section>
  )
}
