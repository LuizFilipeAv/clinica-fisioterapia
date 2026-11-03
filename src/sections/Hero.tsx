import { useRef } from 'react'
import { gsap, useGSAP, EASE, DUR, LETTER_STAGGER } from '../lib/motion'
import { scrollToTarget } from '../lib/smoothScroll'
import { chromeOffset } from '../lib/layout'
import { clinic, heroContent } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { SplitText } from '../components/SplitText'
import './Hero.css'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)

  // Entrance after the preloader lifts: photo wipes up, headline letters rise.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.hero__media', { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('.hero__headline .split-letter', { yPercent: 115 })
        gsap.set('.hero__aside > *', { y: 24, opacity: 0 })
        if (!ready) return

        gsap
          .timeline({ defaults: { ease: EASE } })
          .to('.hero__media', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
          .from('.hero__media img', { scale: 1.25, duration: 1.8 }, 0)
          .to('.hero__headline .split-letter', { yPercent: 0, duration: 1.1, stagger: LETTER_STAGGER }, 0.6)
          .to('.hero__aside > *', { y: 0, opacity: 1, duration: DUR.slow, stagger: 0.08 }, 0.9)
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  // Scroll: headline slides left across the photo, photo drifts down slower than the page.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Range starts at scroll 0 (the stage sits under the chrome) and ends as the stage leaves.
        const stage = {
          trigger: '.hero__stage',
          start: () => `top ${chromeOffset()}px`,
          end: 'bottom top',
          invalidateOnRefresh: true,
        }
        const headline = ref.current!.querySelector<HTMLElement>('.hero__headline')!
        const stageEl = ref.current!.querySelector<HTMLElement>('.hero__stage')!

        // The whole phrase travels across the photo: its last letter reaches the right edge
        // while the line is still on screen, not after it has scrolled away.
        gsap.to(headline, {
          x: () => -(headline.scrollWidth - stageEl.clientWidth),
          ease: 'none',
          scrollTrigger: { ...stage, end: 'bottom 45%', scrub: 0.5 },
        })
        gsap.to('.hero__media img', { yPercent: 14, ease: 'none', scrollTrigger: { ...stage, scrub: true } })

        // Lead paragraph lights up word by word as it crosses the viewport.
        gsap.fromTo(
          '.hero__lead-word',
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '.hero__lead', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="inicio" className="section hero">
      <SectionLabel id="inicio" />

      <div className="hero__stage">
        <div className="hero__media">
          <img src={heroContent.image} alt={heroContent.imageAlt} fetchPriority="high" />
        </div>

        <div className="hero__aside">
          <h1 className="hero__title">
            {clinic.fullName}
            <span>{clinic.tagline} em São Paulo</span>
          </h1>
          <a href="#contato" className="btn" onClick={(e) => (e.preventDefault(), scrollToTarget('#contato'))}>
            Agendar avaliação
          </a>
        </div>

        <div className="hero__headline-wrap" aria-hidden="true">
          <SplitText text={heroContent.title} className="hero__headline display" />
        </div>
      </div>

      <div className="hero__intro">
        <p className="hero__lead">
          {heroContent.lead.split(' ').map((word, i) => (
            <span key={i} className="hero__lead-word">
              {word}{' '}
            </span>
          ))}
        </p>

        {heroContent.pillars.map((pillar, i) => (
          <article key={pillar.title} className="hero__pillar">
            <h2 className="hero__pillar-title">
              <span className="hero__pillar-num">{String(i + 1).padStart(2, '0')}.</span>
              {pillar.title}
            </h2>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
