'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

// Separate the motion-specific props from standard button props
type MotionButtonProps = HTMLMotionProps<'button'>

// Define our custom button props without conflicting event handlers
interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
  children: React.ReactNode
}

// Combine motion props with our custom props, excluding conflicting event handlers
type ButtonProps = Omit<MotionButtonProps, keyof CustomButtonProps> & CustomButtonProps

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    children, 
    className = '', 
    disabled,
    // Extract motion-specific props
    whileHover,
    whileTap,
    animate,
    initial,
    exit,
    transition,
    // Extract any other props that might conflict
    ...restProps 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl',
      outline: 'border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
      ghost: 'text-gray-300 hover:text-white hover:bg-gray-800'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-lg'
    }
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
    
    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        // Use motion-specific props with proper defaults
        whileHover={whileHover || { scale: 1.02 }}
        whileTap={whileTap || { scale: 0.98 }}
        animate={animate}
        initial={initial}
        exit={exit}
        transition={transition}
        // Spread remaining props that are compatible with motion.button
        {...restProps}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
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
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button