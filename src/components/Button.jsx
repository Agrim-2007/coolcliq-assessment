import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className, onClick, fullWidth, type = 'button', ...props }) {
  const baseClasses = "rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2 py-3 px-6 text-sm active:scale-95";
  
  const variants = {
    primary: "bg-gradient-accent text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    secondary: "bg-card text-white border border-gray-800 hover:bg-gray-800/50",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    outline: "border border-gray-700 text-gray-300 hover:bg-gray-800",
  };

  const classes = twMerge(
    clsx(baseClasses, variants[variant], fullWidth && "w-full", className)
  );

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className={classes} 
      onClick={onClick} 
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  );
}
