import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/motion'
import { initSmoothScroll, lockScroll } from './lib/smoothScroll'
import { Preloader } from './components/Preloader'
import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { Specialties } from './sections/Specialties'
import { Gallery } from './sections/Gallery'
import { Treatments } from './sections/Treatments'
import { Process } from './sections/Process'
import { Team } from './sections/Team'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => initSmoothScroll(), [])

  // Triggers are created child-first, so earlier ones don't know about pins further down.
  // Sorting by page position before refreshing lets every start/end include the pin spacing.
  useEffect(() => {
    lockScroll(!ready)
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }, [ready])

  // Late fonts and images change section heights, so trigger positions need recalculating.
  // Refreshing settles after one extra pass, since pin spacing is recreated at the same size.
  useEffect(() => {
    let timer = 0
    let lastHeight = 0
    const observer = new ResizeObserver(([entry]) => {
      const height = Math.round(entry.contentRect.height)
      if (height === lastHeight) return
      lastHeight = height
      clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    observer.observe(document.body)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Header />
      <div className="page">
        <main>
          <Hero ready={ready} />
          <Specialties />
          <Gallery />
          <Treatments />
          <Process />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
