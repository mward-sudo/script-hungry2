import { Variants } from 'framer-motion'

export type FadeParams = {
  duration?: number
  delay?: number
  initialOpacity?: number
  animateOpacity?: number
}
export interface Fade {
  ({ duration, delay, initialOpacity, animateOpacity }?: FadeParams): Variants
}

export type FadeInAndUpParams = FadeParams & {
  initialYOffset?: number
  transitionType?: 'tween' | 'spring' | 'inertia'
}
export interface FadeInAndUp {
  ({
    duration,
    delay,
    initialOpacity,
    animateOpacity,
    initialYOffset,
    transitionType,
  }?: FadeInAndUpParams): Variants
}

export type ZoomParams = {
  zoomInAmount?: number
  zoomOutAmount?: number
}
export interface Zoom {
  ({ zoomInAmount, zoomOutAmount }?: ZoomParams): Variants
}

export type StaggerParams = {
  staggerTime?: number
  delayChildren?: number
}
export interface Stagger {
  ({ staggerTime, delayChildren }?: StaggerParams): Variants
}
