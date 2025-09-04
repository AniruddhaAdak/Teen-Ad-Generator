
import React from 'react';

interface LoadingSpinnerProps {
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = 'w-8 h-8' }) => {
    return (
        <div className={`${className} animate-spin rounded-full border-4 border-t-brand-purple border-gray-600`} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};
