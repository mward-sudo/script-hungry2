import { types } from 'react-bricks'
import { website } from 'react-bricks-ui'
import SuperHeroUnit from './SuperHeroUnit'
import Cards from './Cards'
import Card from './Card'
import Heading2 from './blog/Heading2'
import PostContent from './blog/PostContent'
import Heading3 from './blog/Heading3'
import Title from './blog/Title'
import Code from './blog/Code'

// React Bricks UI + Custom HeroUnit brick
const bricks: types.Brick<any>[] = [
  ...website,
  SuperHeroUnit,
  Card,
  Cards,
  Title,
  Heading2,
  Heading3,
  PostContent,
  Code,
]

export default bricks
