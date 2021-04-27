import { Variants } from 'framer-motion'

export interface Zoom {
  (zoomInAmount?: number, zoomOutAmount?: number): Variants
}
