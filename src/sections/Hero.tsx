import { useRef, type MouseEvent } from 'react'
import { gsap, useGSAP, EASE, DUR, LETTER_STAGGER } from '../lib/motion'
import { scrollToTarget } from '../lib/smoothScroll'
import { clinic, heroContent } from '../data/content'
import { SplitText } from '../components/SplitText'
import './Hero.css'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)

  // Entrance after the preloader lifts: arch wipes up, title letters rise, shapes pop in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ paused: !ready, defaults: { ease: EASE } })
          .fromTo(
            '.hero__arch',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
          )
          .fromTo('.hero__arch img', { scale: 1.3 }, { scale: 1, duration: 1.8 }, 0)
          .fromTo(
            '.hero__title .split-letter',
            { yPercent: 115 },
            { yPercent: 0, duration: 1, stagger: LETTER_STAGGER * 0.7 },
            0.3,
          )
          .fromTo('.hero__reveal', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: DUR.slow, stagger: 0.08 }, 0.8)
          .fromTo(
            '.hero__headline .split-letter',
            { yPercent: 115 },
            { yPercent: 0, duration: 1.1, stagger: LETTER_STAGGER },
            0.7,
          )
          .fromTo('.hero__shape', { scale: 0 }, { scale: 1, duration: 1.2, ease: 'back.out(1.6)', stagger: 0.12 }, 0.6)
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const stage = { trigger: '.hero__stage', start: 'top top', end: 'bottom top', invalidateOnRefresh: true }
        const headline = ref.current!.querySelector<HTMLElement>('.hero__headline')!

        // The whole phrase travels across the stage while it is still on screen.
        gsap.to(headline, {
          x: () => -(headline.scrollWidth - ref.current!.clientWidth),
          ease: 'none',
          scrollTrigger: { ...stage, end: 'bottom 40%', scrub: 0.5 },
        })

        // The arch opens up into a soft rectangle as you leave the hero.
        gsap.fromTo(
          '.hero__arch',
          { borderRadius: '999px 999px 28px 28px' },
          { borderRadius: '64px 64px 28px 28px', ease: 'none', scrollTrigger: { ...stage, scrub: true } },
        )
        gsap.to('.hero__arch img', { yPercent: 10, ease: 'none', scrollTrigger: { ...stage, scrub: true } })

        // Shapes drift upward at their own depth.
        gsap.utils.toArray<HTMLElement>('.hero__shape').forEach((shape) => {
          gsap.to(shape, {
            yPercent: -Number(shape.dataset.depth) * 60,
            ease: 'none',
            scrollTrigger: { ...stage, scrub: true },
          })
        })

        // Lead paragraph lights up word by word as it crosses the viewport.
        gsap.fromTo(
          '.hero__lead-word',
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '.hero__lead', start: 'top 80%', end: 'bottom 50%', scrub: true },
          },
        )

        gsap.fromTo(
          '.hero__pillar',
          { y: 80, rotate: (i) => (i ? 3 : -3) },
          {
            y: 0,
            rotate: 0,
            duration: DUR.slow,
            ease: EASE,
            stagger: 0.12,
            scrollTrigger: { trigger: '.hero__pillars', start: 'top 85%', once: true },
          },
        )
      })

      // Pointer parallax on the shapes, only where there is a mouse.
      mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
        const shapes = gsap.utils.toArray<HTMLElement>('.hero__shape').map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
        }))
        const onMove = (e: PointerEvent) => {
          const dx = e.clientX / window.innerWidth - 0.5
          const dy = e.clientY / window.innerHeight - 0.5
          shapes.forEach((s) => {
            s.x(dx * 50 * s.depth)
            s.y(dy * 30 * s.depth)
          })
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })
    },
    { scope: ref },
  )

  const go = (target: string) => (e: MouseEvent) => {
    e.preventDefault()
    scrollToTarget(target)
  }

  return (
    <section ref={ref} id="inicio" className="section hero">
      <div className="hero__stage">
        <div className="hero__copy">
          <h1 className="hero__title display">
            <SplitText text={heroContent.heading} />{' '}
            <em>
              <SplitText text={heroContent.headingAccent} />
            </em>
          </h1>
          <p className="hero__sub hero__reveal">
            {clinic.fullName} · {clinic.tagline} em São Paulo.
          </p>
          <div className="hero__actions hero__reveal">
            <a href="#contato" className="btn" onClick={go('#contato')}>
              Agendar avaliação
            </a>
            <a href="#tratamentos" className="hero__link" onClick={go('#tratamentos')}>
              Conheça os tratamentos
            </a>
          </div>
          <p className="hero__hours hero__reveal">
            <span className="hero__dot" aria-hidden="true" />
            {clinic.hours[0].days} · {clinic.hours[0].time}
          </p>
        </div>

        <div className="hero__visual">
          <span className="hero__shape hero__shape--ring" data-depth="1" aria-hidden="true" />
          <span className="hero__shape hero__shape--sun" data-depth="1.8" aria-hidden="true" />
          <span className="hero__shape hero__shape--bubble" data-depth="0.6" aria-hidden="true" />
          <div className="hero__arch">
            <img src={heroContent.image} alt={heroContent.imageAlt} fetchPriority="high" />
          </div>
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

        <div className="hero__pillars">
          {heroContent.pillars.map((pillar, i) => (
            <article key={pillar.title} className="hero__pillar">
              <span className="hero__pillar-num">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="hero__pillar-title display">{pillar.title}</h2>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
