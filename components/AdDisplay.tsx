
import React from 'react';
import { AdCard } from './AdCard';
import type { CampaignData } from '../types';

interface AdDisplayProps {
    campaignData: CampaignData;
    onUpdateAd: (adId: number, newCopy: string) => void;
}

export const AdDisplay: React.FC<AdDisplayProps> = ({ campaignData, onUpdateAd }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Campaign Name</h2>
                <p className="mt-1 text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {campaignData.campaignName}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaignData.ads.map(ad => (
                    <AdCard
                        key={ad.id}
                        ad={ad}
                        onUpdate={onUpdateAd}
                    />
                ))}
            </div>
        </div>
    );
};
