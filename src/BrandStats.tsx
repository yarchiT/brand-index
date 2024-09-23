import React from 'react';
import BrandDateChart from "./BrandDateChart.tsx";
import {NumberUtils} from "./numberUtils.ts";
import ResourceTypeChart from "./BrandStats/ResourceTypeChart.tsx";

export interface BrandStatsProps {
    name: string;
    stats: {
        totalCount: number;
        dates: { date: string; count: number }[];
        resourceTypes: { key: string; count: number; }[];
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
        </div>
    );
};

export default BrandStats;