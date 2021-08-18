import { FC } from 'react'

/** Component for site wide copyright footer */
const Copyright: FC = () => {
  return (
    <div className="mt-16 text-gray-700 dark:text-gray-400 text-sm text-center">
      &copy; Copyright Michael Ward {new Date().getFullYear()}
    </div>
  )
}
export default Copyright
