
import React, { useState, useCallback } from 'react';
import { AdGeneratorForm } from './components/AdGeneratorForm';
import { AdDisplay } from './components/AdDisplay';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateAds, getCreativeSuggestions } from './services/geminiService';
import type { CampaignData, Ad } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A new energy drink that tastes like stardust.');
    const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState<boolean>(false);

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError("Please enter a product idea or prompt.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setCampaignData(null);
        try {
            const data = await generateAds(prompt);
            setCampaignData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to generate ads. The AI might be busy, or there was an issue with the request. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    const handleGetSuggestions = useCallback(async () => {
        setIsSuggestionsLoading(true);
        setError(null);
        try {
            const suggs = await getCreativeSuggestions(prompt);
            setSuggestions(suggs);
        } catch (err) {
            console.error(err);
            setError("Failed to get suggestions. Please try again.");
        } finally {
            setIsSuggestionsLoading(false);
        }
    }, [prompt]);

    const handleUpdateAdCopy = useCallback((adId: number, newCopy: string) => {
        setCampaignData(prevData => {
            if (!prevData) return null;
            return {
                ...prevData,
                ads: prevData.ads.map(ad =>
                    ad.id === adId ? { ...ad, copy: newCopy } : ad
                ),
            };
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#6d28d9] via-[#1e1b4b] to-[#ec4899] opacity-20" aria-hidden="true" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Header />

                    <main className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <div className="lg:col-span-4">
                           <AdGeneratorForm
                                prompt={prompt}
                                setPrompt={setPrompt}
                                onGenerate={handleGenerate}
                                onGetSuggestions={handleGetSuggestions}
                                isLoading={isLoading}
                                suggestions={suggestions}
                                setSuggestions={setSuggestions}
                                isSuggestionsLoading={isSuggestionsLoading}
                            />
                        </div>

                        <div className="lg:col-span-8">
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center h-full bg-gray-800/50 rounded-lg p-8">
                                    <LoadingSpinner />
                                    <p className="mt-4 text-lg font-medium text-gray-300">Generating your campaign...</p>
                                    <p className="text-sm text-gray-400">The AI is warming up its creative circuits!</p>
                                </div>
                            )}
                            {error && (
                                <div className="flex flex-col items-center justify-center h-full bg-red-900/50 rounded-lg p-8 text-center">
                                     <p className="text-lg font-bold text-red-300">Oops! Something went wrong.</p>
                                    <p className="mt-2 text-red-400">{error}</p>
                                </div>
                            )}
                            {!isLoading && !error && campaignData && (
                                <AdDisplay campaignData={campaignData} onUpdateAd={handleUpdateAdCopy} />
                            )}
                            {!isLoading && !error && !campaignData && (
                                <div className="flex flex-col items-center justify-center h-full bg-gray-800/30 rounded-lg p-8 border-2 border-dashed border-gray-700">
                                    <SparklesIcon className="w-16 h-16 text-brand-purple" />
                                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Your Ads Await</h2>
                                    <p className="mt-2 text-lg text-gray-400">Enter a prompt and hit "Generate" to see the magic happen!</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
