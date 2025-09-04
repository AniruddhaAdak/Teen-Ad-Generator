
import React, { useState, useEffect } from 'react';
import type { Ad } from '../types';
import { EditIcon } from './icons/EditIcon';
import { SaveIcon } from './icons/SaveIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';

interface AdCardProps {
    ad: Ad;
    onUpdate: (id: number, copy: string) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCopy, setEditedCopy] = useState(ad.copy);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setEditedCopy(ad.copy);
    }, [ad.copy]);
    
    const handleSave = () => {
        onUpdate(ad.id, editedCopy);
        setIsEditing(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(ad.copy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([ad.copy], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ad_variation_${ad.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Ad Variation #${ad.id}`,
                    text: ad.copy,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            handleCopy();
            alert('Share API not supported. Ad copy copied to clipboard instead!');
        }
    };
    
    return (
        <div className="bg-gray-800/60 p-5 rounded-lg border border-gray-700 flex flex-col justify-between transition-all duration-300 hover:border-brand-purple hover:shadow-2xl hover:shadow-brand-purple/10">
            <div className="flex-grow">
                {isEditing ? (
                    <textarea
                        value={editedCopy}
                        onChange={(e) => setEditedCopy(e.target.value)}
                        className="w-full h-40 p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-brand-purple resize-none"
                    />
                ) : (
                    <p className="text-gray-300 leading-relaxed h-40 overflow-y-auto">{ad.copy}</p>
                )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <button onClick={handleSave} className="action-button bg-green-500/20 text-green-300 hover:bg-green-500/40">
                           <SaveIcon className="w-5 h-5" />
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="action-button bg-blue-500/20 text-blue-300 hover:bg-blue-500/40">
                           <EditIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleCopy} className="action-button bg-gray-600/30 text-gray-300 hover:bg-gray-600/50">
                        <ClipboardIcon className="w-5 h-5" />
                        {copied && <span className="text-xs absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 px-2 py-1 rounded">Copied!</span>}
                    </button>
                    <button onClick={handleDownload} className="action-button bg-gray-600/30 text-gray-300 hover:bg-gray-600/50">
                        <DownloadIcon className="w-5 h-5" />
                    </button>
                    <button onClick={handleShare} className="action-button bg-gray-600/30 text-gray-300 hover:bg-gray-600/50">
                        <ShareIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
