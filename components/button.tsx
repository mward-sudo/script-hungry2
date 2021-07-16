import Link from 'next/link'
import { FC } from 'react'

const styles = {
  primary: 'bg-blue-700 text-white',
  secondary: 'border-blue-700 border-2 bg-white text-black',
  disabled: 'bg-gray-200 text-gray-500',
}

type ButtonProps = {
  /** Button text */
  text: string
  /** Url for button link */
  url?: string
  /** The type of button to render */
  variant?: 'primary' | 'secondary' | 'disabled'
  /** An onClick event */
  onClick?: VoidFunction | null
}

const Button: FC<ButtonProps> = ({
  text,
  url = '',
  variant = 'primary',
  onClick = null,
}) => {
  const defaultStyles = 'cursor-default inline-block rounded px-4 py-3 w-full'
  let button

  if (onClick !== null) {
    button = (
      <button
        className={`${defaultStyles} ${styles[variant]}`}
        onClick={onClick}
        type="button"
      >
        {text}
      </button>
    )
  } else {
    button =
      variant === 'disabled' ? (
        <a className={`${defaultStyles} ${styles[variant]}`}>{text}</a>
      ) : (
        <Link href={url}>
          <a className={`${defaultStyles} ${styles[variant]}`}>{text}</a>
        </Link>
      )
  }

  return button
}

export default Button
