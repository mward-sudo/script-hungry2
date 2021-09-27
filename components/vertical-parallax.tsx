import { FC, Children, useEffect } from 'react'

// generate scroll multipliers for child elements
const generateScrollMultipliers = (
  childCount: number,
  maxScrollMultiplier: number,
  minScrollMultiplier: number = 0.5
): number[] => {
  // list of multipliers for parallax scrolling
  let scrollMultipliers: number[] = [0]

  if (childCount > 2) {
    // when there are more than 2 child elements, calculate scroll multipliers

    // calculate the interval based on the scroll multiplier
    const interval =
      (maxScrollMultiplier - minScrollMultiplier) / (childCount - 2)
    for (let i = 1; i <= childCount; i++) {
      scrollMultipliers.push(minScrollMultiplier + interval * i)
    }
  }
  scrollMultipliers.push(maxScrollMultiplier)

  return scrollMultipliers
}

const getFrameElement = (id: string) => {
  const frame = document.getElementById(`frame-${id}`)
  if (frame === null) throw new Error('No frame element for parallax')
  return frame
}

const getFrameHeight = (frame: HTMLElement) => frame.offsetHeight

const clearFrameHeightStyle = (frame: HTMLElement) => {
  frame.style.height = ''
}

type ParallexElem = {
  domElem: HTMLElement | null
  scrollMultiplier: number
  startTop?: number
}

type VerticalParallaxProps = {
  id: string
} & (
  | {
      maxScrollMultiplier: number
      scrollMultipliers?: never
    }
  | {
      scrollMultipliers: number[]
      maxScrollMultiplier?: never
    }
)

const setInitialTopValues = (parallaxElems: ParallexElem[]) => {
  parallaxElems.forEach((elem) => {
    elem.startTop = elem.domElem?.offsetTop
  })
}

const VerticalParallax: FC<VerticalParallaxProps> = ({
  id,
  maxScrollMultiplier,
  scrollMultipliers,
  children,
}) => {
  useEffect(() => {
    const handleResize = () => {
      // Clear the frame height style to allow the browser layout engine to determine a new height
      // for the element, then store the new value in initialFrameHeight
      clearFrameHeightStyle(frame)
      initialFrameHeight = getFrameHeight(frame)
    }

    const handleScroll = () => {
      if (parallaxElems) {
        parallaxElems.map((elem) => {
          if (elem.startTop !== undefined && elem.domElem) {
            elem.domElem.style.top = `${
              elem.startTop - window.scrollY * elem.scrollMultiplier
            }px`
          }
          const lastElem = parallaxElems[parallaxElems.length - 1]
          if (lastElem.domElem)
            frame.style.height = `${
              initialFrameHeight - lastElem.domElem.offsetHeight
            }px`
        })
      }
    }

    /**
     * Initialise the handling of parallax
     */
    const init = () => {
      if (parallaxElems) {
        initialFrameHeight = getFrameHeight(frame)
        setInitialTopValues(parallaxElems)

        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)
      }
    }

    // scroll multiplier array takes either the supplied parameter OR calculates the array
    let multipliers: number[]

    if (scrollMultipliers !== undefined) {
      multipliers = scrollMultipliers
    } else if (maxScrollMultiplier !== undefined) {
      multipliers = generateScrollMultipliers(
        Children.count(children),
        maxScrollMultiplier
      )
    } else {
      throw new Error('Empty multipliers array')
    }

    // parallax element definition
    const parallaxElems: ParallexElem[] | null | undefined = Children.map(
      children,
      (child, index): ParallexElem => {
        return {
          // get element by id
          domElem: document.getElementById(`parallax-${id}-${index}`),
          // parallax order is important here
          scrollMultiplier: multipliers[index],
        }
      }
    )

    // The parallax frame element
    const frame = getFrameElement(id)
    let initialFrameHeight: number

    init()
  }, [children, id, maxScrollMultiplier, scrollMultipliers])

  return (
    <>
      <div
        id={`frame-${id}`}
        style={{
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '16 / 9',
          width: '100%',
        }}
      >
        {Children.map(children, (child, index) => (
          <div
            className="absolute top-0 bottom-0 left-0 w-full overflow-hidden"
            id={`parallax-${id}-${index}`}
          >
            {child}
          </div>
        ))}
      </div>
    </>
  )
}

export default VerticalParallax
