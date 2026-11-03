import { useRef } from 'react'
import { gsap, useGSAP, EASE, DUR } from '../lib/motion'
import './RevealImage.css'

type RevealImageProps = {
  src: string
  alt: string
  className?: string
  /** CSS object-position for the photo (portraits shot in landscape need this). */
  position?: string
  delay?: number
  /** Inner parallax drift while scrolling. */
  parallax?: boolean
}

/** Photo that wipes in from the bottom, then drifts slightly inside its frame. */
export function RevealImage({ src, alt, className = '', position = 'center', delay = 0, parallax = true }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const img = ref.current!.querySelector('img')
        gsap.fromTo(
          ref.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: DUR.slow,
            ease: EASE,
            delay,
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          },
        )
        if (parallax) {
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.14 },
            {
              yPercent: 6,
              scale: 1.14,
              ease: 'none',
              scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`reveal-image ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: position }} />
    </div>
  )
}
