import React, { useState, KeyboardEvent, useEffect } from 'react';
import axios from 'axios';
import { Plus, Download, Share2 } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import BrandStats, { BrandStatsProps } from "./BrandStats/BrandStats.tsx";
import { BrandStatsApiResponse, mapApiResponseToProps } from "./api.tsx";

const BrandIndex: React.FC = () => {
    const [mainBrand, setMainBrand] = useState('');
    const [competitorBrand, setCompetitorBrand] = useState('');
    const [mainBrandResponse, setMainBrandResponse] = useState<BrandStatsProps | null>(null);
    const [competitorBrandResponse, setCompetitorBrandResponse] = useState<BrandStatsProps | null>(null);
    const [showCompetitorInput, setShowCompetitorInput] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [showCopiedText, setShowCopiedText] = useState(false);

    const { toPDF, targetRef } = usePDF({ filename: 'BrandIndex.pdf' });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const mainBrandParam = urlParams.get('mainBrand');
        const competitorBrandParam = urlParams.get('competitorBrand');

        if (mainBrandParam) {
            setMainBrand(mainBrandParam);
            fetchBrandStats(mainBrandParam).then(response => {
                setMainBrandResponse(mapApiResponseToProps(mainBrandParam, response));
            });
        }

        if (competitorBrandParam) {
            setCompetitorBrand(competitorBrandParam);
            setShowCompetitorInput(true);
            fetchBrandStats(competitorBrandParam).then(response => {
                setCompetitorBrandResponse(mapApiResponseToProps(competitorBrandParam, response));
            });
        }
    }, []);

    const fetchBrandStats = async (brandName: string): Promise<BrandStatsApiResponse> => {
        const response = await axios.post<{ brandStats: BrandStatsApiResponse }>(
            'https://workers-playground-yellow-frost-b654.ytykhonchuk.workers.dev/brand-stats',
            { brand: brandName },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.brandStats;
    };

    const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>, isMainBrand: boolean) => {
        if (e.key === 'Enter') {
            if (isMainBrand) {
                if (mainBrand) {
                    try {
                        const mainResponse = await fetchBrandStats(mainBrand);
                        setMainBrandResponse(mapApiResponseToProps(mainBrand, mainResponse));
                    } catch (error) {
                        console.error('Error fetching main brand stats:', error);
                    }
                }
            } else if (showCompetitorInput && competitorBrand) {
                try {
                    const competitorResponse = await fetchBrandStats(competitorBrand);
                    setCompetitorBrandResponse(mapApiResponseToProps(competitorBrand, competitorResponse));
                } catch (error) {
                    console.error('Error fetching competitor brand stats:', error);
                }
            }
        }
    };

    const addCompetitorInput = () => {
        setShowCompetitorInput(true);
    };

    const handleShare = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('mainBrand', mainBrand);
        if (competitorBrand) {
            url.searchParams.set('competitorBrand', competitorBrand);
        }
        navigator.clipboard.writeText(url.toString()).then(() => {
            setIsSharing(true);
            setShowCopiedText(true);
            setTimeout(() => {
                setIsSharing(false);
                setShowCopiedText(false);
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="w-full max-w-full px-4 py-8 sm:py-16">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center mb-4 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={mainBrand}
                                onChange={(e) => setMainBrand(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, true)}
                                placeholder="Enter brand name"
                                className="w-full sm:w-auto max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {mainBrandResponse && !showCompetitorInput && (
                                <button
                                    type="button"
                                    onClick={addCompetitorInput}
                                    className="px-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                >
                                    <Plus size={20} />
                                </button>
                            )}
                        </div>
                        {showCompetitorInput && (
                            <input
                                type="text"
                                value={competitorBrand}
                                onChange={(e) => setCompetitorBrand(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, false)}
                                placeholder="Enter competitor brand name"
                                className="w-full sm:w-auto max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                    {mainBrandResponse && (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => toPDF()}
                                className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                                title="Download PDF"
                            >
                                <Download size={16} />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={handleShare}
                                    className={`p-1 ${isSharing ? 'bg-green-600' : 'bg-green-500'} text-white rounded-full hover:bg-green-600 transition duration-300`}
                                    title="Share"
                                >
                                    <Share2 size={16} />
                                </button>
                                {showCopiedText && (
                                    <span className="absolute left-full ml-2 whitespace-nowrap text-sm text-green-600 font-medium">
                                        Copied to clipboard
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div ref={targetRef} className={`grid ${showCompetitorInput ? 'grid-cols-2' : 'grid-cols-1'} gap-16`}>
                    {mainBrandResponse && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <BrandStats name={mainBrandResponse.name} stats={mainBrandResponse.stats} />
                        </div>
                    )}
                    {competitorBrandResponse && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <BrandStats name={competitorBrandResponse.name} stats={competitorBrandResponse.stats} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrandIndex;