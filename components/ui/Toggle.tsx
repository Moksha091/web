import React from 'react';

interface ToggleProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 text-xs font-mono border border-black mr-2 ${active ? 'bg-black text-white' : 'bg-white text-black'}`}
  >
    {label}
  </button>
);