import { sections, type SectionId } from '../data/content'
import './SectionLabel.css'

/** Sticky bar at the top of each section: its name and position in the page ("02 / 07"). */
export function SectionLabel({ id }: { id: SectionId }) {
  const index = sections.findIndex((s) => s.id === id)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="section-label">
      <span>{sections[index].label}</span>
      <span className="section-label__count">
        <span className="section-label__current">{pad(index + 1)}</span> / {pad(sections.length)}
      </span>
    </div>
  )
}
