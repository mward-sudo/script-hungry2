import { FC } from 'react'
import Head from 'next/head'
import { Admin, Editor } from 'react-bricks'

const AdminEditor: FC = () => {
  return (
    <Admin>
      <Head>
        <title>Editor</title>
      </Head>
      <Editor />
    </Admin>
  )
}

export default AdminEditor
