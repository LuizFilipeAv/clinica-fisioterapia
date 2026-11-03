import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger })

// Signature curve (expo out) and duration palette shared by every animation.
export const EASE = 'expo.out'
export const DUR = { quick: 0.35, standard: 0.6, slow: 1.1 }
export const LETTER_STAGGER = 0.03

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, useGSAP }
