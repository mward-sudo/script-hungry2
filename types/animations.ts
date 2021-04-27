import { Variants } from 'framer-motion'

export interface Fade {
  (
    durationLength?: number,
    delayLength?: number,
    initialOpacity?: number,
    animateOpacity?: number
  ): Variants
}

export interface FadeInAndUp extends Fade {
  (initialYOffset?: number): Variants
}

export interface Zoom {
  (zoomInAmount?: number, zoomOutAmount?: number): Variants
}
