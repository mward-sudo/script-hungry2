import { fadeInAndUp } from '@/animations/animations'
import { m, Variants } from 'framer-motion'
import { Link, Image, types, Text } from 'react-bricks'

const hoverImgVariant: Variants = {
  initial: {
    transform: 'scale(1)',
  },
  hover: {
    transform: 'scale(1.1)',
  },
  tap: {
    transform: 'scale(1.05)',
  },
}

//=============================
// Local Types
//=============================

interface CardProps {
  link: string
}

//=============================
// Component to be rendered
//=============================
const Card: types.Brick<CardProps> = ({ link, ...rest }) => {
  return (
    <m.div variants={fadeInAndUp()} className="w-1/2 lg:w-1/4" {...rest}>
      <div className="m-2">
        <Link href={link} className="text-base no-underline uppercase">
          <m.div
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="overflow-hidden bg-white border-2 border-gray-200 border-solid rounded-lg dark:border-gray-800 drop-shadow-sm dark:bg-gray-900"
          >
            <div style={{ overflow: 'hidden' }}>
              <m.div variants={hoverImgVariant}>
                <Image
                  propName="cardImage"
                  alt=""
                  imageStyle={{ ratio: '16 / 9', width: '100%' }}
                  maxWidth={400}
                />
              </m.div>
            </div>

            <Text
              propName="cardText"
              placeholder="Card Text"
              renderBlock={({ children }) => (
                <div className="px-2 py-3 text-center text-black no-underline dark:text-gray-200">
                  {children} &gt;
                </div>
              )}
            />
          </m.div>
        </Link>
      </div>
    </m.div>
  )
}

//=============================
// Block Schema
//=============================
Card.schema = {
  name: 'card',
  label: 'Card',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    cardText: 'Card Text',
    link: '/',
    cardImage: '',
  }),
  sideEditProps: [
    {
      name: 'link',
      label: 'Link',
      type: types.SideEditPropType.Text,
    },
  ],
}

export default Card
