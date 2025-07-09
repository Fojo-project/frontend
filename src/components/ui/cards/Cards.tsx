import React, { ReactNode } from 'react';

interface CardsProps {
  children: ReactNode;
  className?: string; // ✅ Allow custom className
}

export default function Cards({ children, className = '' }: CardsProps) {
  return (
    <div className={`border-2 border-gray-200 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}
