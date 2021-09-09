import { FC } from 'react'
import Head from 'next/head'
import { Admin, AppSettings } from 'react-bricks'

const AdminAppSettings: FC = () => {
  return (
    <Admin>
      <Head>
        <title>App Settings</title>
      </Head>
      <AppSettings />
    </Admin>
  )
}

export default AdminAppSettings
