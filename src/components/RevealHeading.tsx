import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, EASE, DUR, LETTER_STAGGER } from '../lib/motion'
import { SplitText } from './SplitText'

type RevealHeadingProps = {
  text: string
  as?: ElementType
  className?: string
  /** Leave undefined to reveal on scroll; pass a boolean to drive it manually (e.g. after the preloader). */
  play?: boolean
  delay?: number
}

/** Heading whose letters rise one by one out of their word mask. */
export function RevealHeading({ text, as = 'h2', className, play, delay = 0 }: RevealHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // fromTo (not set + to) so GSAP never has to re-read a half-applied transform after a refresh.
        gsap.fromTo(
          ref.current!.querySelectorAll('.split-letter'),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: DUR.standard * 1.3,
            ease: EASE,
            delay,
            stagger: LETTER_STAGGER,
            paused: play === false,
            scrollTrigger: play === undefined ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
          },
        )
      })
    },
    { scope: ref, dependencies: [play] },
  )

  return (
    <div ref={ref} className={className}>
      <SplitText as={as} text={text} />
    </div>
  )
}
