import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  disabled = false
}) => {
  // Low-fi: Boxy, thick borders, no rounded corners, black/white only
  const baseStyle = "px-4 py-2 text-sm font-mono border-2 border-black transition-none focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black hover:bg-gray-100",
    ghost: "bg-transparent text-black border-transparent underline hover:no-underline"
  };
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};