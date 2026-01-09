import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
}

export default function Card({
  children,
  variant = 'default',
  className,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
    elevated: 'bg-white rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
    outlined: 'bg-white rounded-xl border-2 border-gray-200 p-6 transition-all duration-300 hover:border-black hover:shadow-lg hover:-translate-y-1',
  }
  
  return (
    <div className={clsx(variants[variant], className)} {...props}>
      {children}
    </div>
  )
}
