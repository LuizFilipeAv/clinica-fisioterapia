import { scrollToTarget } from '../lib/smoothScroll'
import { clinic } from '../data/content'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name display">{clinic.fullName}</p>
      <div className="footer__row">
        <p className="footer__legal">© 2026 · Projeto fictício para portfólio</p>
        <button type="button" className="footer__top" onClick={() => scrollToTarget('#inicio')}>
          Voltar ao topo
        </button>
      </div>
    </footer>
  )
}
