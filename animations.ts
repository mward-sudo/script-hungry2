import { AnimationProps, Variants } from 'framer-motion'

export const stagger = (staggerTime: number = 0.2): AnimationProps => ({
  animate: {
    transition: {
      staggerChildren: staggerTime,
    },
  },
})

interface iFadeFunc {
  (
    durationLength: number,
    delayLength: number,
    initialOpacity?: number,
    animateOpacity?: number
  ): Variants
}

const fade: iFadeFunc = (
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

export const fadeIn: iFadeFunc = (durationLength = 0.5, delayLength = 0) =>
  fade(durationLength, delayLength, 0, 1)

export const fadeOut: iFadeFunc = (durationLength = 0.5, delayLength = 0) =>
  fade(durationLength, delayLength, 1, 0)
