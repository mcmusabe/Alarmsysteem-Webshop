import Image from 'next/image'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  layout?: 'horizontal' | 'vertical'
}

export default function Logo({ 
  className = '', 
  showText = true, 
  size = 'md', 
  variant = 'light',
  layout = 'vertical'
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-24 w-auto',
    md: 'h-32 w-auto',
    lg: 'h-40 w-auto'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl lg:text-2xl',
    lg: 'text-2xl lg:text-3xl'
  }

  const logoImage = (
    <Image
      src="/logo/AlarmWebshop.png.png"
      alt="AlarmWebshop Logo"
      width={200}
      height={200}
      className={sizeClasses[size]}
      priority
      unoptimized
    />
  )

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {logoImage}
      </div>
    )
  }

  // Horizontal layout
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {logoImage}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-medium ${variant === 'dark' ? 'text-white' : 'text-black'} block`}>
            AlarmWebshop
          </span>
          <span className={`text-xs ${variant === 'dark' ? 'text-gray-300' : 'text-gray-500'} block`}>
            Alarmsystemen
          </span>
        </div>
      )}
    </div>
  )
}
