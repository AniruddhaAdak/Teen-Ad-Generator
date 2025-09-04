
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700">
                 <SparklesIcon className="w-6 h-6 text-brand-pink" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
                    Teen Ad Generator
                </h1>
            </div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Craft viral ads for teens featuring the legendary <span className="font-semibold text-yellow-300">nano banana</span> and the mind-bending <span className="font-semibold text-cyan-300">zing imaginfoor</span>.
            </p>
        </header>
    );
};
