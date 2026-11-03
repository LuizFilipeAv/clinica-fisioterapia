import { useEffect, useRef, useState, type MouseEvent, type Ref } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE, DUR } from '../lib/motion'
import { lockScroll, scrollToTarget } from '../lib/smoothScroll'
import { clinic, sections } from '../data/content'
import { Logo } from './Logo'
import './Header.css'

/** Fixed rail (logo + menu button), top contact bar and the slide-in navigation drawer. */
export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(sections[0].id)
  const drawerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline>(null)

  // Highlight the section currently under the top bar.
  useGSAP(() => {
    sections.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 40%',
        end: 'bottom 40%',
        refreshPriority: -1, // measure after the pins inside each section have added their spacing
        onToggle: (self) => self.isActive && setActive(id),
      })
    })
  })

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(drawerRef.current, { visibility: 'visible' })
        .fromTo('.menu__scrim', { opacity: 0 }, { opacity: 1, duration: DUR.standard, ease: 'power2.out' }, 0)
        .fromTo(
          '.menu__panel',
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR.standard * 1.3, ease: 'expo.inOut' },
          0,
        )
        .fromTo(
          '.menu__item',
          { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: DUR.standard, ease: EASE, stagger: 0.05 },
          0.3,
        )
    },
    { scope: drawerRef },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      lockScroll(true)
      tl.current.timeScale(1).play()
      drawerRef.current?.querySelector('a')?.focus({ preventScroll: true })
    } else if (tl.current.progress() > 0) {
      lockScroll(false)
      tl.current.timeScale(1.6).reverse()
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

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <aside className="rail">
        <a href="#inicio" className="rail__logo" onClick={go('inicio')} aria-label={`${clinic.fullName}, voltar ao início`}>
          <Logo />
        </a>
        <MenuButton open={open} onClick={() => setOpen((o) => !o)} ref={buttonRef} className="rail__menu" />
      </aside>

      <header className="bar">
        <a href="#inicio" className="bar__logo" onClick={go('inicio')} aria-label={clinic.fullName}>
          <Logo />
        </a>
        <p className="bar__tagline">{clinic.tagline}</p>
        <a className="bar__link" href={clinic.phoneHref}>
          {clinic.phone}
        </a>
        <a className="bar__link bar__link--email" href={`mailto:${clinic.email}`}>
          {clinic.email}
        </a>
        <MenuButton open={open} onClick={() => setOpen((o) => !o)} className="bar__menu" />
      </header>

      <div
        ref={drawerRef}
        className="menu"
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navegação"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="menu__scrim" onClick={() => setOpen(false)} />
        <nav className="menu__panel">
          <ol className="menu__list">
            {sections.map(({ id, label }, i) => (
              <li key={id} className="menu__row">
                <a
                  href={`#${id}`}
                  className={`menu__item ${active === id ? 'is-active' : ''}`}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={go(id)}
                >
                  <span className="menu__num">{pad(i + 1)}.</span>
                  <span className="menu__label">{label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="menu__foot">
            <a href={clinic.whatsappHref} className="btn" target="_blank" rel="noopener">
              Agendar pelo WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

type MenuButtonProps = {
  open: boolean
  onClick: () => void
  className?: string
  ref?: Ref<HTMLButtonElement>
}

function MenuButton({ open, onClick, className = '', ref }: MenuButtonProps) {
  return (
    <button
      ref={ref}
      className={`menu-button ${open ? 'is-open' : ''} ${className}`}
      onClick={onClick}
      aria-expanded={open}
      aria-controls="menu"
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
    >
      <span />
      <span />
      <span />
    </button>
  )
}
