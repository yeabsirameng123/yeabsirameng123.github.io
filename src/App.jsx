import { useEffect, useRef } from 'react'
import Scene from './three/Scene.jsx'
import { initSmoothScroll, destroySmoothScroll, initReveals } from './lib/smooth.js'
import {
  TopNav, SideNav, Hero, About, Work, Publication,
  Experience, Skills, Education, Contact, Footer,
} from './ui/Sections.jsx'

export default function App() {
  const scrollRef = useRef(0)

  useEffect(() => {
    // scroll progress (0..1) shared with the 3D scene + the top progress bar
    const bar = document.getElementById('progress')
    const nav = document.getElementById('top-nav')
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      scrollRef.current = p
      if (bar) bar.style.width = p * 100 + '%'
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const lenis = initSmoothScroll()
    initReveals()

    // active-section highlight in the side nav
    const sideLinks = Array.from(document.querySelectorAll('.side a'))
    let spy
    if ('IntersectionObserver' in window) {
      spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              sideLinks.forEach((a) =>
                a.classList.toggle('active', a.getAttribute('data-s') === e.target.id)
              )
            }
          })
        },
        { rootMargin: '-45% 0px -50% 0px' }
      )
      ;['about', 'work', 'publication', 'experience', 'skills', 'education', 'contact'].forEach(
        (id) => {
          const el = document.getElementById(id)
          if (el) spy.observe(el)
        }
      )
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      destroySmoothScroll(lenis)
      if (spy) spy.disconnect()
    }
  }, [])

  return (
    <>
      <Scene scrollRef={scrollRef} />
      <div className="grain" aria-hidden="true" />
      <div id="progress" />
      <TopNav />
      <SideNav />
      <Hero />
      <main>
        <About />
        <Work />
        <Publication />
        <Experience />
        <Skills />
        <Education />
      </main>
      <Contact />
      <Footer />
    </>
  )
}
