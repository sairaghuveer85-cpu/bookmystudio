import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'darkOutline' | 'white' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-[#10B981] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] hover:bg-slate-800 dark:hover:bg-white active:bg-slate-900 shadow-sm',
    secondary: 'bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-200 dark:hover:bg-[#262626] active:bg-slate-300',
    outline: 'border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-50 dark:hover:bg-[#202020] hover:border-slate-300 dark:hover:border-[#454545] shadow-xs',
    darkOutline: 'border border-slate-700 dark:border-[#383838] bg-slate-900/60 dark:bg-[#202020]/60 text-white hover:bg-slate-800 dark:hover:bg-[#262626] hover:border-slate-600',
    white: 'bg-white dark:bg-[#262626] text-slate-900 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#303030] active:bg-slate-200 shadow-sm font-semibold',
    pill: 'rounded-full bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] hover:bg-slate-800 dark:hover:bg-white text-sm px-5 py-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}

