import { FC } from 'react'
import Head from 'next/head'
import { Container } from '@material-ui/core'
import Header from '../../components/header'

const Index: FC = () => (
  <>
    <Head>
      <title>Portfolio - Michael Ward</title>
    </Head>
    <Header element="p" />
    <Container maxWidth="sm">
      <h1>Under development</h1>
    </Container>
  </>
)

export default Index
