import { Fade, FadeInAndUp, Zoom, Stagger } from '@/types/animations'

/**
 * Returns a Variant for framer-motion to implement
 * a staggered animation
 */
export const stagger: Stagger = ({
  staggerTime = 0.2,
  delayChildren = 0,
} = {}) => {
  return {
    animate: {
      transition: {
        staggerChildren: staggerTime,
        delayChildren,
      },
    },
  }
}

/**
 * Returns a Variant for framer-motion to implement
 * a fade animation
 */
const fade: Fade = ({
  duration = 0.5,
  delay = undefined,
  initialOpacity = 0,
  animateOpacity = 1,
} = {}) => {
  return {
    initial: {
      opacity: initialOpacity,
    },
    animate: {
      opacity: animateOpacity,
      transition: {
        duration,
        ...(delay !== undefined && { delay }),
      },
    },
  }
}

/**
 * Returns a Variant for framer-motion to implement
 * a fade in animation
 */
export const fadeIn: Fade = ({
  duration = 0.5,
  delay = undefined,
  initialOpacity = 0,
  animateOpacity = 1,
} = {}) => {
  return fade({
    duration,
    delay,
    initialOpacity,
    animateOpacity,
  })
}

/**
 * Returns a Variant for framer-motion to implement
 * a fadeOut animation
 */
export const fadeOut: Fade = ({
  duration = 0.5,
  delay = undefined,
  initialOpacity = 1,
  animateOpacity = 0,
} = {}) => {
  return fade({
    duration,
    delay,
    initialOpacity,
    animateOpacity,
  })
}

/**
 * Returns a Variant for framer-motion to implement
 * a fade in and up animation
 */
export const fadeInAndUp: FadeInAndUp = ({
  duration = 0.5,
  delay = undefined,
  initialOpacity = 0,
  animateOpacity = 1,
  initialYOffset = 200,
  transitionType = 'spring',
} = {}) => {
  return {
    initial: {
      opacity: initialOpacity,
      y: initialYOffset,
    },
    animate: {
      opacity: animateOpacity,
      y: 0,
      transition: {
        type: transitionType,
        duration,
        ...(delay !== undefined && { delay }),
      },
    },
  }
}

/**
 * Returns a Variant for framer-motion to implement
 * a zoom animation
 */
export const zoom: Zoom = ({
  zoomInAmount = 1.1,
  zoomOutAmount = 0.9,
} = {}) => {
  return {
    initial: {
      zoom: 1,
    },
    zoomIn: {
      zoom: zoomInAmount,
    },
    zoomOut: {
      zoom: zoomOutAmount,
    },
  }
}
