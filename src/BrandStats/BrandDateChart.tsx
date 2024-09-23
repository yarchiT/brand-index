import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NumberUtils } from '../numberUtils';
import { format, parseISO } from 'date-fns';

interface BrandDateChartProps {
    data: {
        date: string;
        count: number;
    }[];
}

const BrandDateChart: React.FC<BrandDateChartProps> = ({ data }) => {
    const formatXAxis = (dateString: string) => {
        return format(parseISO(dateString), 'MMM d');
    };

    const formatTooltipDate = (dateString: string) => {
        return format(parseISO(dateString), 'MMM d, yyyy');
    };

    return (
        <div className="w-full lg:min-w-[500px]">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatXAxis}
                        interval="preserveStartEnd"
                        minTickGap={30}
                    />
                    <YAxis tickFormatter={(value) => NumberUtils.formatNumber(value)} />
                    <Tooltip
                        labelFormatter={formatTooltipDate}
                        formatter={(value) => NumberUtils.formatNumber(Number(value))}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BrandDateChart;