import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 hover:!text-white transition-all duration-200 focus:ring-black',
    accent: 'bg-accent text-black hover:!bg-[#00AD74] hover:!text-black transition-all duration-200 focus:ring-accent',
    outline: 'border-2 border-black text-black hover:bg-black hover:!text-white transition-all duration-200 focus:ring-black',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:!text-gray-700 transition-all duration-200 focus:ring-gray-500',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
