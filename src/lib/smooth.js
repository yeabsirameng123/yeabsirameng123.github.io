import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Buttery smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in sync.
export function initSmoothScroll() {
  if (prefersReduced) return null
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const onTick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)
  lenis._onTick = onTick
  return lenis
}

export function destroySmoothScroll(lenis) {
  if (!lenis) return
  if (lenis._onTick) gsap.ticker.remove(lenis._onTick)
  lenis.destroy()
}

// Fade-and-rise reveal for anything with className "reveal".
export function initReveals() {
  if (prefersReduced) return
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    })
  })
  // staggered children inside ".stagger" groups
  gsap.utils.toArray('.stagger').forEach((group) => {
    gsap.from(group.children, {
      y: 26,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 84%', once: true },
    })
  })
}
