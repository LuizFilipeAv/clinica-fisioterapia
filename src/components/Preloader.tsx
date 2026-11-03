import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, EASE, prefersReducedMotion } from '../lib/motion'
import { SplitText } from './SplitText'
import './Preloader.css'

const LINES = 7

/** Opening curtain: gold rules draw across, a greeting rises, then everything lifts away. */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  const [fontsReady, setFontsReady] = useState(false)

  // Start once the display font is in, so letters don't swap mid-animation.
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onComplete()
        setDone(true)
        return
      }

      gsap.set('.split-letter', { yPercent: 115 })
      if (!fontsReady) return
      const tl = gsap.timeline({ onComplete: () => setDone(true) })

      tl.from('.preloader__line', {
        scaleX: 0,
        duration: 1,
        ease: 'expo.inOut',
        stagger: { each: 0.07, from: 'center' },
      })
        .to('.split-letter', { yPercent: 0, duration: 0.8, ease: EASE, stagger: 0.025 }, '-=0.5')
        .to('.split-letter', { yPercent: -115, duration: 0.5, ease: 'expo.in', stagger: 0.012 }, '+=0.5')
        .to(
          '.preloader__line',
          { scaleX: 0, transformOrigin: 'right center', duration: 0.7, ease: 'expo.inOut', stagger: 0.05 },
          '-=0.3',
        )
        .add(onComplete, '-=0.35')
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.45')
    },
    { scope: ref, dependencies: [fontsReady] },
  )

  if (done) return null

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      {Array.from({ length: LINES }, (_, i) => (
        <span key={i} className="preloader__line" style={{ top: `${((i + 1) * 100) / (LINES + 1)}%` }} />
      ))}
      <p className="preloader__text">
        <SplitText text="Bem-vindo à" />{' '}
        <SplitText text="Áurea" className="preloader__accent" />
      </p>
    </div>
  )
}
