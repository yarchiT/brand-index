import React, { useState, KeyboardEvent, useCallback } from 'react';
import axios from 'axios';
import { Plus, Download } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import BrandStats, { BrandStatsProps } from "./BrandStats/BrandStats.tsx";
import { BrandStatsApiResponse, mapApiResponseToProps } from "./api.tsx";

const BrandIndex: React.FC = () => {
    const [mainBrand, setMainBrand] = useState('');
    const [competitorBrand, setCompetitorBrand] = useState('');
    const [mainBrandResponse, setMainBrandResponse] = useState<BrandStatsProps | null>(null);
    const [competitorBrandResponse, setCompetitorBrandResponse] = useState<BrandStatsProps | null>(null);
    const [showCompetitorInput, setShowCompetitorInput] = useState(false);
    const [lastChangedInput, setLastChangedInput] = useState<'main' | 'competitor' | null>(null);

    const { toPDF, targetRef } = usePDF({ filename: 'BrandIndex.pdf' });

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

    const handleFetchBrandStats = useCallback(async (brandName: string, isMain: boolean) => {
        try {
            const response = await fetchBrandStats(brandName);
            const mappedResponse = mapApiResponseToProps(brandName, response);
            if (isMain) {
                setMainBrandResponse(mappedResponse);
            } else {
                setCompetitorBrandResponse(mappedResponse);
            }
        } catch (error) {
            console.error(`Error fetching ${isMain ? 'main' : 'competitor'} brand stats:`, error);
        }
    }, []);

    const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (lastChangedInput === 'main' && mainBrand) {
                await handleFetchBrandStats(mainBrand, true);
            } else if (lastChangedInput === 'competitor' && competitorBrand) {
                await handleFetchBrandStats(competitorBrand, false);
            }
        }
    };

    const handleMainBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMainBrand(e.target.value);
        setLastChangedInput('main');
    };

    const handleCompetitorBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompetitorBrand(e.target.value);
        setLastChangedInput('competitor');
    };

    const addCompetitorInput = () => {
        setShowCompetitorInput(true);
    };

    const isEmptyScreen = !mainBrandResponse && !competitorBrandResponse;

    return (
        <div className="w-full max-w-full px-4 py-8 sm:py-16">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center mb-4 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                            <input
                                type="text"
                                value={mainBrand}
                                onChange={handleMainBrandChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter brand name"
                                className={`w-full ${isEmptyScreen ? 'text-xl py-3 px-6' : 'text-base py-2 px-4'} max-w-md border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
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
                                onChange={handleCompetitorBrandChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter competitor brand name"
                                className="w-full sm:w-auto max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                    {mainBrandResponse && (
                        <button
                            onClick={() => toPDF()}
                            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                            title="Download PDF"
                        >
                            <Download size={16} />
                        </button>
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