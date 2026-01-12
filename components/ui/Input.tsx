import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  leading?: ReactNode
  trailing?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    color = 'primary',
    variant = 'outline',
    size = 'md',
    loading = false,
    leading,
    trailing,
    className,
    ...props
  }, ref) => {
    const baseStyles = 'relative inline-flex items-center w-full'
    
    const inputBaseStyles = 'w-full rounded-md border-0 appearance-none placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors'
    
    const variants = {
      outline: 'text-gray-900 bg-white ring ring-inset ring-gray-300 focus-visible:ring-2 focus-visible:ring-inset',
      soft: 'text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-gray-50',
      subtle: 'text-gray-900 bg-gray-50 ring ring-inset ring-gray-300',
      ghost: 'text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-gray-50 disabled:bg-transparent',
      none: 'text-gray-900 bg-transparent',
    }
    
    const sizes = {
      xs: {
        input: 'px-2 py-1 text-xs gap-1',
        leading: 'ps-2',
        trailing: 'pe-2',
      },
      sm: {
        input: 'px-2.5 py-1.5 text-xs gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
      },
      md: {
        input: 'px-2.5 py-1.5 text-sm gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
      },
      lg: {
        input: 'px-3 py-2 text-sm gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
      },
      xl: {
        input: 'px-3 py-2 text-base gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
      },
    }
    
    const colors = {
      primary: error ? 'ring-red-500 focus-visible:ring-red-500' : 'ring-gray-300 focus-visible:ring-black',
      secondary: error ? 'ring-red-500 focus-visible:ring-red-500' : 'ring-gray-400 focus-visible:ring-gray-600',
      success: error ? 'ring-red-500 focus-visible:ring-red-500' : 'ring-green-500 focus-visible:ring-green-600',
      info: error ? 'ring-red-500 focus-visible:ring-red-500' : 'ring-blue-500 focus-visible:ring-blue-600',
      warning: error ? 'ring-red-500 focus-visible:ring-red-500' : 'ring-yellow-500 focus-visible:ring-yellow-600',
      error: 'ring-red-500 focus-visible:ring-red-500',
      neutral: error ? 'ring-red-500 focus-visible:ring-red-500' : 'ring-gray-300 focus-visible:ring-gray-500',
    }
    
    const hasLeading = !!leading || loading
    const hasTrailing = !!trailing
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className={baseStyles}>
          {hasLeading && (
            <div className={clsx('absolute inset-y-0 start-0 flex items-center', sizes[size].leading)}>
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 text-gray-400"
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
              ) : (
                leading
              )}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              inputBaseStyles,
              variants[variant],
              colors[color],
              sizes[size].input,
              hasLeading && size === 'xs' && 'ps-7',
              hasLeading && size === 'sm' && 'ps-8',
              hasLeading && size === 'md' && 'ps-9',
              hasLeading && size === 'lg' && 'ps-10',
              hasLeading && size === 'xl' && 'ps-11',
              hasTrailing && size === 'xs' && 'pe-7',
              hasTrailing && size === 'sm' && 'pe-8',
              hasTrailing && size === 'md' && 'pe-9',
              hasTrailing && size === 'lg' && 'pe-10',
              hasTrailing && size === 'xl' && 'pe-11',
              className
            )}
            {...props}
          />
          {hasTrailing && (
            <div className={clsx('absolute inset-y-0 end-0 flex items-center', sizes[size].trailing)}>
              {trailing}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
