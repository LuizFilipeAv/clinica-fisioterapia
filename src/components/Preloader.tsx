import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, EASE, prefersReducedMotion } from '../lib/motion'
import { SplitText } from './SplitText'
import './Preloader.css'

const R = 46
const CIRC = 2 * Math.PI * R

/** Opening curtain: a gold ring draws itself, the greeting rises, then the sheet lifts with a curved edge. */
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
      gsap.set('.preloader__ring circle', { strokeDasharray: CIRC, strokeDashoffset: CIRC })
      if (!fontsReady) return

      gsap
        .timeline({ onComplete: () => setDone(true) })
        .to('.preloader__ring circle', { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' })
        .fromTo('.preloader__ring', { rotate: -90, scale: 0.85 }, { rotate: 0, scale: 1, duration: 1.3, ease: EASE }, 0)
        .to('.split-letter', { yPercent: 0, duration: 0.8, ease: EASE, stagger: 0.025 }, 0.45)
        .to('.split-letter', { yPercent: -115, duration: 0.5, ease: 'expo.in', stagger: 0.012 }, '+=0.45')
        .to('.preloader__ring', { scale: 6, opacity: 0, duration: 0.9, ease: 'expo.in' }, '<')
        .add(onComplete, '-=0.2')
        .to(
          ref.current,
          { clipPath: 'ellipse(160% 0% at 50% 0%)', duration: 1, ease: 'expo.inOut' },
          '-=0.35',
        )
    },
    { scope: ref, dependencies: [fontsReady] },
  )

  if (done) return null

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <svg className="preloader__ring" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={R} />
      </svg>
      <p className="preloader__text">
        <SplitText text="Bem-vindo à" />{' '}
        <SplitText text="Áurea" className="preloader__accent" />
      </p>
    </div>
  )
}
