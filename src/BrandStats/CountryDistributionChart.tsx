import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NumberUtils } from '../numberUtils';

interface CountryDistributionChartProps {
    data: {
        key: string;
        count: number;
    }[];
}

const CountryDistributionChart: React.FC<CountryDistributionChartProps> = ({ data }) => {
    const sortedData = useMemo(() => [...data].sort((a, b) => b.count - a.count), [data]);

    const getCountryName = (isoCode: string) => {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        try {
            return regionNames.of(isoCode.toUpperCase());
        } catch (error) {
            return isoCode.toUpperCase();
        }
    };

    const chartData = useMemo(() => {
        const realData = sortedData.map(item => ({
            country: getCountryName(item.key),
            count: item.count
        }));

        // Pad the data to always have 10 items
        const paddedData = [...realData];
        while (paddedData.length < 10) {
            paddedData.push({ country: '', count: 0 });
        }
        return paddedData;
    }, [sortedData]);

    return (
        <div className="w-full lg:min-w-[500px] h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">Geographical Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        tickFormatter={(value) => NumberUtils.formatNumber(value)}
                    />
                    <YAxis
                        dataKey="country"
                        type="category"
                        width={100}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => value || ' '} // Replace empty strings with spaces
                    />
                    <Tooltip
                        formatter={(value) => NumberUtils.formatNumber(Number(value))}
                        labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CountryDistributionChart;