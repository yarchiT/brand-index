import React from 'react';
import BrandDateChart from "./BrandDateChart.tsx";
import {NumberUtils} from "./numberUtils.ts";

export interface BrandStatsProps {
    name: string;
    stats: {
        totalCount: number;
        dates: { date: string; count: number }[];
        resourceTypes: { key: string; count: number; metricValue: number }[];
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

            <h3 className="text-xl font-semibold mb-4">Resource Types</h3>
            <ul>
                {stats.resourceTypes.map((type) => (
                    <li key={type.key} className="mb-2">
                        {type.key}: <span className="font-bold">{type.count}</span> (Metric Value: {type.metricValue})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrandStats;