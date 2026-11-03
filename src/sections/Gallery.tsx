import { SectionLabel } from '../components/SectionLabel'
import { RevealHeading } from '../components/RevealHeading'
import { RevealImage } from '../components/RevealImage'
import { Marquee } from '../components/Marquee'
import { gallery } from '../data/content'
import './Gallery.css'

export function Gallery() {
  return (
    <section id="clinica" className="section gallery">
      <SectionLabel id="clinica" />
      <div className="gallery__body">
        <RevealHeading text={gallery.title} className="gallery__title display" />
        <div className="gallery__grid">
          {gallery.images.map((img, i) => (
            <RevealImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              delay={i * 0.1}
              className={`gallery__img gallery__img--${i + 1}`}
            />
          ))}
        </div>
      </div>
      <Marquee text={gallery.marquee} distance={-40} className="gallery__marquee" />
    </section>
  )
}
