import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE, DUR } from '../lib/motion'
import { lockScroll, scrollToTarget } from '../lib/smoothScroll'
import { clinic, sections } from '../data/content'
import { Logo } from './Logo'
import './Header.css'

// The hero is reached through the logo; the pill lists the rest.
const navItems = sections.filter((s) => s.id !== 'inicio' && s.id !== 'contato')

/** Floating pill header with a sliding active marker, plus a full-screen menu that grows from its button. */
export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(sections[0].id)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline>(null)

  useGSAP(() => {
    // Track which section sits in the middle of the viewport.
    sections.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        refreshPriority: -1, // measure after the pins inside each section have added their spacing
        onToggle: (self) => self.isActive && setActive(id),
      })
    })

    // Tuck the pill away while reading down, bring it back on any scroll up.
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const hide = gsap.quickTo(headerRef.current, 'yPercent', { duration: DUR.standard, ease: 'power3.out' })
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => hide(self.direction === 1 && self.scroll() > 200 ? -160 : 0),
      })
    })
  })

  // Slide the marker under the active link.
  useLayoutEffect(() => {
    const place = () => {
      const link = navRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
      const marker = markerRef.current
      if (!marker) return
      if (!link) {
        marker.style.opacity = '0'
        return
      }
      marker.style.opacity = '1'
      marker.style.transform = `translateX(${link.offsetLeft}px)`
      marker.style.width = `${link.offsetWidth}px`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { visibility: 'visible' })
        .fromTo(menuRef.current, { '--r': '0%' }, { '--r': '150%', duration: 0.9, ease: 'power3.inOut' })
        .fromTo(
          '.menu__item',
          { yPercent: 110 },
          { yPercent: 0, duration: DUR.standard * 1.4, ease: EASE, stagger: 0.05 },
          0.3,
        )
        .fromTo('.menu__foot', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DUR.standard, ease: EASE }, 0.55)
    },
    { scope: menuRef },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      // The circle grows from the button that opened it.
      const r = buttonRef.current!.getBoundingClientRect()
      menuRef.current!.style.setProperty('--origin-x', `${r.left + r.width / 2}px`)
      menuRef.current!.style.setProperty('--origin-y', `${r.top + r.height / 2}px`)
      lockScroll(true)
      tl.current.timeScale(1).play()
      menuRef.current?.querySelector('a')?.focus({ preventScroll: true })
    } else if (tl.current.progress() > 0) {
      lockScroll(false)
      tl.current.timeScale(1.5).reverse()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // Wait for the scroll lock to release before travelling.
    requestAnimationFrame(() => scrollToTarget(`#${id}`))
  }

  return (
    <>
      <header ref={headerRef} className="header">
        <a href="#inicio" className="header__logo" onClick={go('inicio')} aria-label={`${clinic.fullName}, início`}>
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Seções">
          <span ref={markerRef} className="header__marker" aria-hidden="true" />
          <ul ref={navRef}>
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  data-id={id}
                  className={active === id ? 'is-active' : undefined}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={go(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contato" className="btn btn--gold header__cta" onClick={go('contato')}>
          Agendar
        </a>

        <button
          ref={buttonRef}
          className={`menu-button ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        ref={menuRef}
        className="menu"
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navegação"
        aria-hidden={!open}
        inert={!open}
      >
        <ol className="menu__list">
          {sections.map(({ id, label }, i) => (
            <li key={id} className="menu__row">
              <a
                href={`#${id}`}
                className={`menu__item ${active === id ? 'is-active' : ''}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={go(id)}
              >
                <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
        <div className="menu__foot">
          <a href={clinic.phoneHref}>{clinic.phone}</a>
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          <a href={clinic.whatsappHref} className="btn btn--gold" target="_blank" rel="noopener">
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
