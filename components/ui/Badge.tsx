import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  square?: boolean
}

export default function Badge({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  square = false,
  className,
  ...props
}: BadgeProps) {
  const baseStyles = 'font-medium inline-flex items-center'
  
  const colors = {
    primary: {
      solid: 'bg-black text-white',
      outline: 'ring ring-inset ring-black/50 text-black',
      soft: 'bg-black/10 text-black',
      subtle: 'bg-black/10 ring ring-inset ring-black/25 text-black',
    },
    secondary: {
      solid: 'bg-gray-600 text-white',
      outline: 'ring ring-inset ring-gray-600/50 text-gray-600',
      soft: 'bg-gray-600/10 text-gray-600',
      subtle: 'bg-gray-600/10 ring ring-inset ring-gray-600/25 text-gray-600',
    },
    success: {
      solid: 'bg-green-600 text-white',
      outline: 'ring ring-inset ring-green-600/50 text-green-600',
      soft: 'bg-green-600/10 text-green-600',
      subtle: 'bg-green-600/10 ring ring-inset ring-green-600/25 text-green-600',
    },
    info: {
      solid: 'bg-blue-600 text-white',
      outline: 'ring ring-inset ring-blue-600/50 text-blue-600',
      soft: 'bg-blue-600/10 text-blue-600',
      subtle: 'bg-blue-600/10 ring ring-inset ring-blue-600/25 text-blue-600',
    },
    warning: {
      solid: 'bg-yellow-600 text-white',
      outline: 'ring ring-inset ring-yellow-600/50 text-yellow-600',
      soft: 'bg-yellow-600/10 text-yellow-600',
      subtle: 'bg-yellow-600/10 ring ring-inset ring-yellow-600/25 text-yellow-600',
    },
    error: {
      solid: 'bg-red-600 text-white',
      outline: 'ring ring-inset ring-red-600/50 text-red-600',
      soft: 'bg-red-600/10 text-red-600',
      subtle: 'bg-red-600/10 ring ring-inset ring-red-600/25 text-red-600',
    },
    neutral: {
      solid: 'bg-gray-200 text-gray-900',
      outline: 'ring ring-inset ring-gray-300 text-gray-700',
      soft: 'bg-gray-100 text-gray-700',
      subtle: 'bg-gray-100 ring ring-inset ring-gray-200 text-gray-700',
    },
  }
  
  const sizes = {
    xs: square ? 'p-0.5' : 'text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm',
    sm: square ? 'p-1' : 'text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm',
    md: square ? 'p-1' : 'text-xs px-2 py-1 gap-1 rounded-md',
    lg: square ? 'p-1' : 'text-sm px-2 py-1 gap-1.5 rounded-md',
    xl: square ? 'p-1' : 'text-base px-2.5 py-1 gap-1.5 rounded-md',
  }
  
  return (
    <span
      className={clsx(
        baseStyles,
        colors[color][variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
