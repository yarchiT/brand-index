import React from 'react';
import BrandDateChart from "./BrandDateChart.tsx";
import {NumberUtils} from "../numberUtils.ts";
import ResourceTypeChart from "./ResourceTypeChart.tsx";
import SentimentChart from "./SentimentChart.tsx";
import CountryDistributionChart from "./CountryDistributionChart.tsx";
import LanguageDistributionChart from "./LanguageDistributionChart.tsx";

export interface BrandStatsProps {
    name: string;
    stats: {
        totalCount: number;
        dates: { date: string; count: number }[];
        resourceTypes: { key: string; count: number; }[];
        sentiment: {
            nsr: number;
            values: { key: string; count: number; }[];
        };
        countries: { key: string; count: number; }[];
        languages: { key: string; count: number; }[];
    };
}

const BrandStats: React.FC<BrandStatsProps> = ({ name, stats }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{name}</h1>
            <p className="text-lg mb-4">Total Mentions: <span className="font-bold">{NumberUtils.formatNumber(stats.totalCount)}</span></p>

            <div className="mb-8">
                <BrandDateChart data={stats.dates} />
            </div>

            <div className="mb-8">
                <ResourceTypeChart data={stats.resourceTypes} />
            </div>

            <div className="mb-8">
                <SentimentChart
                    nsr={stats.sentiment.nsr}
                    sentiment={{
                        negative: stats.sentiment.values.find(v => v.key === 'negative')?.count || 0,
                        neutral: stats.sentiment.values.find(v => v.key === 'neutral')?.count || 0,
                        positive: stats.sentiment.values.find(v => v.key === 'positive')?.count || 0,
                    }}
                />
            </div>

            <div className="mb-8">
                <CountryDistributionChart data={stats.countries} />
            </div>

            <div className="mt-16 mb-8">
                <LanguageDistributionChart data={stats.languages} />
            </div>
            
        </div>
    );
};

export default BrandStats;