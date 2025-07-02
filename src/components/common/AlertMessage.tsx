'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';

interface AlertMessageProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  className?: string;
  duration?: number;
}

const iconMap = {
  success: <CheckCircle className="text-green-600 w-5 h-5" />,
  error: <XCircle className="text-red-600 w-5 h-5" />,
  info: <Info className="text-blue-600 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
};

const baseStyles = {
  success: 'bg-green-100 text-green-800 border border-green-300',
  error: 'bg-red-100 text-red-800 border border-red-300',
  info: 'bg-blue-100 text-blue-800 border border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
};

const AlertMessage: React.FC<AlertMessageProps> = ({
  type = 'info',
  message,
  className = '',
  duration = 5000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`flex items-start gap-2 p-4 rounded-md text-base ${baseStyles[type]} ${className}`}
    >
      <div className="mt-0.5">{iconMap[type]}</div>
      <p>{message}</p>
    </div>
  );
};

export default AlertMessage;
