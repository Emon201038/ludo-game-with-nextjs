import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react'

const Button = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ children, className, ...props }: React.ComponentPropsWithoutRef<"button">, ref) => {
  return (
    <button ref={ref} className={cn('relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl h-full px-4 py-0 rounded-2xl border-3 flex justify-center items-center text-white', className)} style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
      fontFamily: "Luckiest Guy, cursive",
      fontSize: "20px",
      fontWeight: "bolder"
    }} {...props} >
      <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-30 pointer-events-none"></div>
      {children}
    </button>
  )
});

Button.displayName = 'Button'

export default Button