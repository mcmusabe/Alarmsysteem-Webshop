import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  header?: ReactNode
  footer?: ReactNode
}

export default function Card({
  children,
  variant = 'outline',
  header,
  footer,
  className,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg overflow-hidden'
  
  const variants = {
    solid: 'bg-gray-900 text-white divide-y divide-gray-800',
    outline: 'bg-white ring ring-gray-200 divide-y divide-gray-200',
    soft: 'bg-gray-50/50 divide-y divide-gray-200',
    subtle: 'bg-gray-50/50 ring ring-gray-200 divide-y divide-gray-200',
  }
  
  return (
    <div className={clsx(baseStyles, variants[variant], className)} {...props}>
      {header && (
        <div className="p-4 sm:px-6">
          {header}
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>
      {footer && (
        <div className="p-4 sm:px-6">
          {footer}
        </div>
      )}
    </div>
  )
}
