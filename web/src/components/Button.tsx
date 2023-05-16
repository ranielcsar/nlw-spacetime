import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = {
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ title, ...props }: ButtonProps) {
  return <button {...props}>{title}</button>
}
