import { Variants } from 'framer-motion'

export type FadeParams = {
  duration?: number
  delay?: number
  initialOpacity?: number
  animateOpacity?: number
}
export interface Fade {
  (params?: FadeParams): Variants
}

export type FadeInAndUpParams = FadeParams & {
  initialYOffset?: number
  transitionType?: 'tween' | 'spring' | 'inertia'
}
export interface FadeInAndUp {
  (params?: FadeInAndUpParams): Variants
}

export type ZoomParams = {
  zoomInAmount?: number
  zoomOutAmount?: number
}
export interface Zoom {
  (params?: ZoomParams): Variants
}

export type StaggerParams = {
  staggerTime?: number
  delayChildren?: number
}
export interface Stagger {
  (params?: StaggerParams): Variants
}
