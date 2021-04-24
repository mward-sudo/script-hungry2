import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Card, CardActionArea, CardMedia, CardContent, Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardContent: {
    padding: '.5em',
  },
}))

type HomeMediaCardProps = {
  href: string
  imgSrc: string
  imgWidth: number
  imgHeight: number
  btnText: string
}

type ConditionalLinkProps = {
  href: string
}

const ConditionalLink: FC<ConditionalLinkProps> = ({ href, children }) => {
  const externalHref = href.indexOf('http') === 0

  return externalHref ? (
    <Link href={href} passHref>
      <CardActionArea>
        {children}
      </CardActionArea>
    </Link>
  ) : (
    <CardActionArea href={href}>
      {children}
    </CardActionArea>
  )
}

const HomeMediaCard: FC<HomeMediaCardProps> = ({
  href, imgSrc, imgWidth, imgHeight, btnText,
}) => {
  const classes = useStyles()

  const sizes = '(max-width: 600px): 0.5vw, (max-width: 1200px): 0.25vw'

  return (
    <Card className={classes.card}>
      <ConditionalLink href={href}>
        <CardMedia>
          <Image src={imgSrc} width={imgWidth} height={imgHeight} sizes={sizes} layout="responsive" />
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Button variant="text">
            {btnText}
            {' '}
            &gt;
          </Button>
        </CardContent>
      </ConditionalLink>
    </Card>
  )
}

export default HomeMediaCard
