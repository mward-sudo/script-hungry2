import { Variants } from 'framer-motion'

export interface Fade {
  (
    durationLength?: number,
    delayLength?: number,
    initialOpacity?: number,
    animateOpacity?: number
  ): Variants
}
