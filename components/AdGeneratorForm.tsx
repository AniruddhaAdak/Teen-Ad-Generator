
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { LoadingSpinner } from './LoadingSpinner';

interface AdGeneratorFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    onGetSuggestions: () => void;
    isLoading: boolean;
    suggestions: string[];
    setSuggestions: (suggestions: string[]) => void;
    isSuggestionsLoading: boolean;
}

export const AdGeneratorForm: React.FC<AdGeneratorFormProps> = ({
    prompt,
    setPrompt,
    onGenerate,
    onGetSuggestions,
    isLoading,
    suggestions,
    setSuggestions,
    isSuggestionsLoading,
}) => {
    
    const handleSuggestionClick = (suggestion: string) => {
        setPrompt(suggestion);
        setSuggestions([]);
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg sticky top-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Describe Your Product</h2>
            <p className="text-gray-400 mb-4 text-sm">What's the vibe? Give the AI a starting point to work its magic.</p>
            
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A new social media app that only works at midnight"
                className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition duration-200 resize-none"
                disabled={isLoading}
            />

            <div className="mt-4 space-y-3">
                 <button
                    onClick={onGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 shadow-lg"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner className="w-5 h-5" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5" />
                            Generate Ads
                        </>
                    )}
                </button>
                 <button
                    onClick={onGetSuggestions}
                    disabled={isLoading || isSuggestionsLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2 font-semibold text-brand-purple bg-brand-purple/20 rounded-lg hover:bg-brand-purple/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 border border-brand-purple/50"
                >
                    {isSuggestionsLoading ? (
                        <>
                            <LoadingSpinner className="w-5 h-5" />
                            Getting Ideas...
                        </>
                    ) : (
                        <>
                            <LightBulbIcon className="w-5 h-5" />
                            Get Creative Suggestions
                        </>
                    )}
                </button>
            </div>
            
            {suggestions.length > 0 && (
                 <div className="mt-6">
                    <h3 className="text-md font-semibold text-gray-300 mb-2">Feeling stuck? Try one of these:</h3>
                    <div className="space-y-2">
                        {suggestions.map((sugg, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(sugg)}
                                className="w-full text-left p-3 bg-gray-700/50 rounded-md hover:bg-gray-700 transition-colors duration-200 text-sm text-gray-300"
                            >
                                {sugg}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
