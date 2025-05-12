import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className={`${className} flex justify-center items-center`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-primary-200 border-t-primary-600 animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;