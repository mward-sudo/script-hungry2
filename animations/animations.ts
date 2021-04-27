import { AnimationProps } from 'framer-motion'
import { Fade } from '../types/fade'
import { Zoom } from '../types/zoom'

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

export const zoom: Zoom = (zoomInAmount = 1.1, zoomOutAmount = 0.9) => ({
  initial: {
    zoom: 1,
  },
  zoomIn: {
    zoom: zoomInAmount,
  },
  zoomOut: {
    zoom: zoomOutAmount,
  },
})
