import Link from 'next/link'
import { FC } from 'react'

const styles = {
  primary: 'bg-blue-700 text-white',
  secondary: 'border-blue-700 bg-white text-black',
  disabled: 'bg-gray-200 text-gray-500',
}

type ButtonProps = {
  /** Button text */
  text: string
  /** Url for button link */
  url?: string
  /** The type of button to render */
  variant?: 'primary' | 'secondary' | 'disabled'
}

const Button: FC<ButtonProps> = ({ text, url = '', variant = 'primary' }) => {
  const defaultStyles = 'cursor-default inline-block rounded px-4 py-3'

  return variant === 'disabled' ? (
    <a className={`${defaultStyles} ${styles[variant]}`}>{text}</a>
  ) : (
    <Link href={url}>
      <a className={`${defaultStyles} ${styles[variant]}`}>{text}</a>
    </Link>
  )
}

export default Button
