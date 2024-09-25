import React, { useEffect, useState, useRef } from 'react';
import cloud from 'd3-cloud';

interface D3WordCloudProps {
    data: {
        key: string;
        count: number;
    }[];
}

const D3WordCloud: React.FC<D3WordCloudProps> = ({ data }) => {
    const [words, setWords] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return;

        const maxCount = Math.max(...data.map(item => item.count));
        const minCount = Math.min(...data.map(item => item.count));

        const layout = cloud()
            .size([dimensions.width, dimensions.height])
            .words(data.map(d => ({
                text: d.key,
                size: 20 + ((d.count - minCount) / (maxCount - minCount)) * 30, // Increased size range
                count: d.count
            })))
            .padding(5)
            .rotate(() => 0)
            .font("Arial")
            .fontSize(d => d.size as number)
            .on("end", output => {
                setWords(output);
            });

        layout.start();
    }, [data, dimensions]);

    return (
        <div ref={containerRef} className="w-full h-full" style={{ minHeight: '300px' }}>
            <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                <g transform={`translate(${dimensions.width / 2},${dimensions.height / 2})`}>
                    {words.map((word, i) => (
                        <text
                            key={i}
                            style={{
                                fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
                                fontSize: word.size,
                                fontFamily: 'Arial, sans-serif',
                            }}
                            textAnchor="middle"
                            transform={`translate(${word.x},${word.y}) rotate(${word.rotate})`}
                        >
                            {word.text}
                        </text>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default D3WordCloud;