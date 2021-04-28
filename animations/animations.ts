import { Variants } from 'framer-motion'
import {
  Fade,
  FadeParams,
  FadeInAndUp,
  Zoom,
  Stagger,
  StaggerParams,
  FadeInAndUpParams,
  ZoomParams,
} from '../types/animations'

/**
 * Default parameters of the stagger function
 * @constant staggerDefaultProps
 * @type StaggerParams
 */
const staggerDefaultProps: StaggerParams = {
  staggerTime: 0.2,
  delayChildren: 0,
}

/**
 * Allows framer-motion to stagger the animation of child elemenets.
 * Returns an obejct of type Variants which should be passed to the
 * variants property of a framer-motion motion tag.
 * @param params @type StaggerParams
 * @returns Variants
 */
export const stagger: Stagger = (params) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params

  /**
   * The amount of time between each child animation starting in the stagger
   * @constant staggerTime number
   */
  const { staggerTime, delayChildren } = { ...staggerDefaultProps, ...params }

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
 * The default properties for the fade function
 * @constant fadeDefaultProps
 * @returns FadeParams
 */
const fadeDefaultProps: FadeParams = {
  initialOpacity: 0,
  animateOpacity: 1,
  duration: 0.5,
}
/**
 * Non-exported utility function for fade functionality.
 * Returns an obejct of type Variants which should be passed to the
 * variants property of a framer-motion motion tag.
 * @param params FadeParams
 * @returns Variants
 */
const fade: Fade = (params) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { initialOpacity, animateOpacity, duration, delay } = {
    ...fadeDefaultProps,
    ...params,
  }

  const variants: Variants = {
    initial: {
      opacity: initialOpacity,
    },
    animate: {
      opacity: animateOpacity,
      transition: {
        duration,
      },
    },
  }

  if (delay !== undefined) variant.animate.transition.delay = delay

  return variants
}

const fadeInDefaultProps: FadeParams = {
  ...fadeDefaultProps,
}
export const fadeIn: Fade = (props) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { duration, delay } = { ...fadeInDefaultProps, ...props }
  return fade({
    duration,
    delay,
    initialOpacity: 0,
    animateOpacity: 1,
  })
}

const fadeOutDefaultProps: FadeParams = { ...fadeDefaultProps }
export const fadeOut: Fade = (props) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { duration, delay } = { ...fadeOutDefaultProps, ...props }

  return fade({
    duration,
    delay,
    initialOpacity: 1,
    animateOpacity: 0,
  })
}

const fadeInAndUpDefaultProps: FadeInAndUpParams = {
  ...fadeInDefaultProps,
  initialYOffset: 200,
  transitionType: 'spring',
}
export const fadeInAndUp: FadeInAndUp = (props) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const {
    initialOpacity,
    initialYOffset,
    animateOpacity,
    delay,
    duration,
    transitionType,
  } = { ...fadeInAndUpDefaultProps, ...props }
  const variants: Variants = {
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
      },
    },
  }

  if (delay !== undefined) variants.animate.transition.delay = delay

  return variants
}

const zoomDefaultProps: ZoomParams = {
  zoomInAmount: 1.1,
  zoomOutAmount: 0.9,
}
export const zoom: Zoom = (params) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { zoomInAmount, zoomOutAmount } = { ...zoomDefaultProps, ...params }

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
