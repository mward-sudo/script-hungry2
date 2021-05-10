import { Fade, FadeInAndUp, Zoom, Stagger } from '@root/types/animations'

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
