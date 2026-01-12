import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'soft' | 'subtle'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  loading?: boolean
  block?: boolean
  square?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  block = false,
  square = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-md inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-800 focus-visible:ring-black',
    accent: 'bg-accent text-black hover:bg-[#00AD74] active:bg-[#00AD74] focus-visible:ring-accent',
    outline: 'ring ring-inset ring-black/50 text-black hover:bg-black/10 active:bg-black/10 focus-visible:ring-black disabled:bg-transparent',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-100 focus-visible:ring-gray-500 disabled:bg-transparent',
    soft: 'bg-black/10 text-black hover:bg-black/15 active:bg-black/15 focus-visible:ring-black disabled:bg-black/10',
    subtle: 'bg-black/10 ring ring-inset ring-black/25 text-black hover:bg-black/15 active:bg-black/15 focus-visible:ring-black disabled:bg-black/10',
  }
  
  const sizes = {
    xs: square ? 'p-1' : 'px-2 py-1 text-xs gap-1',
    sm: square ? 'p-1.5' : 'px-2.5 py-1.5 text-xs gap-1.5',
    md: square ? 'p-1.5' : 'px-2.5 py-1.5 text-sm gap-1.5',
    lg: square ? 'p-2' : 'px-3 py-2 text-sm gap-2',
    xl: square ? 'p-2' : 'px-3 py-2 text-base gap-2',
  }
  
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        block && 'w-full',
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
