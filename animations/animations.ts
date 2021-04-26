import { AnimationProps } from 'framer-motion'
import { Fade } from '../types/fade'

export const stagger = (staggerTime = 0.2): AnimationProps => ({
  animate: {
    transition: {
      staggerChildren: staggerTime,
    },
  },
})

const fade: Fade = (
  durationLength,
  delayLength,
  initialOpacity,
  animateOpacity
) => ({
  initial: {
    opacity: initialOpacity,
  },
  animate: {
    opacity: animateOpacity,
    transition: {
      duration: durationLength,
      delay: delayLength,
    },
  },
})

export const fadeIn: Fade = (durationLength = 0.5, delayLength = 0) =>
  fade(durationLength, delayLength, 0, 1)

export const fadeOut: Fade = (durationLength = 0.5, delayLength = 0) =>
  fade(durationLength, delayLength, 1, 0)
