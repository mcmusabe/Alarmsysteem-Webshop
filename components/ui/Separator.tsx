import { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  color?: 'neutral' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'solid' | 'dashed' | 'dotted'
  label?: string
  decorative?: boolean
}

export default function Separator({
  orientation = 'horizontal',
  color = 'neutral',
  size = 'xs',
  type = 'solid',
  label,
  decorative = false,
  className,
  ...props
}: SeparatorProps) {
  const baseStyles = 'flex items-center align-center text-center'
  
  const orientations = {
    horizontal: 'w-full flex-row',
    vertical: 'h-full flex-col',
  }
  
  const colors = {
    neutral: 'border-gray-300',
    primary: 'border-black',
    secondary: 'border-gray-600',
    success: 'border-green-600',
    info: 'border-blue-600',
    warning: 'border-yellow-600',
    error: 'border-red-600',
  }
  
  const sizesMap = {
    xs: orientation === 'horizontal' ? 'border-t' : 'border-s',
    sm: orientation === 'horizontal' ? 'border-t-[2px]' : 'border-s-[2px]',
    md: orientation === 'horizontal' ? 'border-t-[3px]' : 'border-s-[3px]',
    lg: orientation === 'horizontal' ? 'border-t-[4px]' : 'border-s-[4px]',
    xl: orientation === 'horizontal' ? 'border-t-[5px]' : 'border-s-[5px]',
  }
  
  const typesMap = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  }
  
  if (label) {
    return (
      <div
        className={clsx(
          baseStyles,
          orientations[orientation],
          className
        )}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        {...props}
      >
        <div className={clsx('flex-1', sizesMap[size], typesMap[type], colors[color])} />
        <div className={clsx(
          'font-medium text-default flex',
          orientation === 'horizontal' ? 'mx-3 whitespace-nowrap' : 'my-2'
        )}>
          <span className="text-sm">{label}</span>
        </div>
        <div className={clsx('flex-1', sizesMap[size], typesMap[type], colors[color])} />
      </div>
    )
  }
  
  return (
    <div
      className={clsx(
        baseStyles,
        orientations[orientation],
        sizesMap[size],
        typesMap[type],
        colors[color],
        className
      )}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      {...props}
    />
  )
}
