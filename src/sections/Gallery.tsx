import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import { RevealHeading } from '../components/RevealHeading'
import { RevealImage } from '../components/RevealImage'
import { Marquee } from '../components/Marquee'
import { gallery } from '../data/content'
import './Gallery.css'

const SPEEDS = [-30, 50, -70, 20]

export function Gallery() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 640px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.gallery__item').forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: -SPEEDS[i] },
            {
              y: SPEEDS[i],
              ease: 'none',
              scrollTrigger: { trigger: '.gallery__grid', start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="clinica" className="section gallery">
      <div className="gallery__body">
        <RevealHeading text={gallery.title} className="gallery__title display" />
        <div className="gallery__grid">
          {gallery.images.map((img, i) => (
            <div key={img.src} className={`gallery__item gallery__item--${i + 1}`}>
              <RevealImage src={img.src} alt={img.alt} delay={i * 0.1} className="gallery__img" />
            </div>
          ))}
        </div>
      </div>
      <div className="gallery__ribbons">
        <Marquee text={gallery.marquee} distance={-35} className="gallery__ribbon gallery__ribbon--gold" />
        <Marquee text={gallery.marquee} distance={30} className="gallery__ribbon gallery__ribbon--blue" />
      </div>
    </section>
  )
}
