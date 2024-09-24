import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label, Tooltip } from 'recharts';
import { NumberUtils } from "../numberUtils";

interface SentimentChartProps {
    nsr: number;
    sentiment: {
        negative: number;
        neutral: number;
        positive: number;
    };
}

const SentimentChart: React.FC<SentimentChartProps> = ({ nsr, sentiment }) => {
    const normalizedNSR = nsr + 100;

    const data = [
        { name: 'NSR', value: normalizedNSR },
        { name: 'Remaining', value: 200 - normalizedNSR },
    ];

    const getColor = (nsr: number) => {
        if (nsr <= -80) return '#8B0000';
        if (nsr <= -60) return '#FF0000';
        if (nsr <= -40) return '#FF4500';
        if (nsr <= -20) return '#FFA500';
        if (nsr < 0) return '#FFD700';
        if (nsr === 0) return '#FFFF00';
        if (nsr < 20) return '#ADFF2F';
        if (nsr < 40) return '#7FFF00';
        if (nsr < 60) return '#32CD32';
        if (nsr < 80) return '#008000';
        return '#006400';
    };

    const color = getColor(nsr);

    const renderLegend = () => (
        <div className="text-center mt-2">
            <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-red-500">Negative: {NumberUtils.formatNumber(sentiment.negative)}</div>
                <div className="text-yellow-500">Neutral: {NumberUtils.formatNumber(sentiment.neutral)}</div>
                <div className="text-green-500">Positive: {NumberUtils.formatNumber(sentiment.positive)}</div>
            </div>
        </div>
    );

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-300 p-2 rounded shadow-md">
                    <p className="font-semibold">NSR (Net Sentiment Rate)</p>
                    <p>Sentiment in the topic on -100 to 100 scale, where 0 is neutral</p>
                    <p className="font-bold">Current NSR: {nsr.toFixed(1)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full lg:min-w-[300px] h-[230px]">
            <h3 className="text-xl font-semibold mb-1 text-center cursor-help">Sentiment (NSR)</h3>
            <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={0}
                        dataKey="value"
                    >
                        <Cell key="nsr" fill={color} />
                        <Cell key="remaining" fill="#F1F1F1" />
                        <Label
                            value={`${nsr.toFixed(1)}`}
                            position="center"
                            fill="#333333"
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                            }}
                        />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SentimentChart;