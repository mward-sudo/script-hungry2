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

const staggerDefaultProps: StaggerParams = {
  staggerTime: 0.2,
}
export const stagger: Stagger = (params) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { staggerTime } = { ...staggerDefaultProps, ...params }

  return {
    animate: {
      transition: {
        staggerChildren: staggerTime,
      },
    },
  }
}

const fadeDefaultProps: FadeParams = {
  initialOpacity: 0,
  animateOpacity: 1,
  durationLength: 0.5,
  delayLength: 0,
}
const fade: Fade = (params) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { initialOpacity, animateOpacity, durationLength, delayLength } = {
    ...fadeDefaultProps,
    ...params,
  }

  return {
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
  }
}

const fadeInDefaultProps: FadeParams = {
  ...fadeDefaultProps,
}
export const fadeIn: Fade = (props) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { durationLength, delayLength } = { ...fadeInDefaultProps, ...props }
  return fade({
    durationLength,
    delayLength,
    initialOpacity: 0,
    animateOpacity: 1,
  })
}

const fadeOutDefaultProps: FadeParams = { ...fadeDefaultProps }
export const fadeOut: Fade = (props) => {
  // Spreading the default props and the params gives us an object with
  // default values, overridden by any that were passed in via params
  const { durationLength, delayLength } = { ...fadeOutDefaultProps, ...props }

  return fade({
    durationLength,
    delayLength,
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
    delayLength,
    durationLength,
    transitionType,
  } = { ...fadeInAndUpDefaultProps, ...props }
  return {
    initial: {
      opacity: initialOpacity,
      y: initialYOffset,
    },
    animate: {
      opacity: animateOpacity,
      y: 0,
      transition: {
        delay: delayLength,
        duration: durationLength,
        type: transitionType,
      },
    },
  }
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
