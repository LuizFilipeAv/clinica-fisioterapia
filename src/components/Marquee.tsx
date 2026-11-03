import { useRef, type RefObject } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import './Marquee.css'

type MarqueeProps = {
  text: string
  className?: string
  /** How far the line travels across the scroll range, in % of its own width. Negative moves left. */
  distance?: number
  /** Element whose passage through the viewport drives the movement. Defaults to the marquee itself. */
  trigger?: RefObject<HTMLElement | null>
}

/** Giant decorative line of text that slides sideways as the page scrolls. */
export function Marquee({ text, className = '', distance = -35, trigger }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.marquee__track',
          { xPercent: 0 },
          {
            xPercent: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: trigger?.current ?? ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track display">
        <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
      </div>
    </div>
  )
}
