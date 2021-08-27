import { types } from 'react-bricks'
import { website } from 'react-bricks-ui'
import SuperHeroUnit from './SuperHeroUnit'
import Cards from './Cards'
import Card from './Card'

// React Bricks UI + Custom HeroUnit brick
const bricks: types.Brick<any>[] = [...website, SuperHeroUnit, Card, Cards]

export default bricks
