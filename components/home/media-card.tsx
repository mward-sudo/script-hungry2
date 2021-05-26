import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from '@material-ui/core'
import { motion } from 'framer-motion'
import { fadeInAndUp } from '@/animations/animations'

/** Component styles */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      fontSize: 12,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    cardContent: {
      padding: '.5em',
    },
  })
)

type HomeMediaCardProps = {
  /** Card link */
  href: string
  /** URL of card image */
  imgSrc: string
  /** Width of card image (used for ratio) */
  imgWidth: number
  /** Height of card image (used for ratio) */
  imgHeight: number
  /** Text for card link */
  btnText: string
}

type ConditionalLinkProps = {
  /** URL for ConditionalLink */
  href: string
}

/** JSX code for internal or external links */
const ConditionalLink: FC<ConditionalLinkProps> = ({ href, children }) => {
  /** External link if it begins with http */
  const externalHref = href.indexOf('http') === 0

  return externalHref ? (
    /** Use next/Link component for internal links */
    <Link href={href} passHref>
      <CardActionArea>{children}</CardActionArea>
    </Link>
  ) : (
    <CardActionArea href={href}>{children}</CardActionArea>
  )
}

const HomeMediaCard: FC<HomeMediaCardProps> = ({
  href,
  imgSrc,
  imgWidth,
  imgHeight,
  btnText,
}) => {
  const classes = useStyles()

  /** Sizes for responsive image, reflects page layout used */
  const sizes = '(max-width: 600px): 50vw, 25vw'

  return (
    <motion.div variants={fadeInAndUp()}>
      <Card className={classes.card}>
        <ConditionalLink href={href}>
          <CardMedia>
            <Image
              src={imgSrc}
              width={imgWidth}
              height={imgHeight}
              sizes={sizes}
            />
          </CardMedia>
          <CardContent className={classes.cardContent}>
            <Button variant="text">{btnText} &gt;</Button>
          </CardContent>
        </ConditionalLink>
      </Card>
    </motion.div>
  )
}

export default HomeMediaCard
