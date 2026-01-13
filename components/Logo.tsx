'use client'

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
  variant = 'dark',
  layout = 'horizontal'
}: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo/AlarmWebshop.png.png"
        alt="AlarmWebshop Logo"
        className="h-32 w-auto"
      />
      <div className={`flex flex-col ml-3 ${showText ? '' : 'hidden'}`}>
        <span className={`text-xl font-medium ${variant === 'dark' ? 'text-white' : 'text-black'}`}>
          AlarmWebshop
        </span>
        <span className={`text-xs ${variant === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
          Alarmsystemen
        </span>
      </div>
    </div>
  )
}
