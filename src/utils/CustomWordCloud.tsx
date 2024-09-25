import React, {useEffect, useState, useRef} from 'react';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';

interface D3WordCloudProps {
    data: {
        key: string;
        count: number;
    }[];
}

const allInterestCategories = [
    "technology", "design", "arts", "movies", "music", "games", "other activities",
    "books", "decorative arts", "home & garden", "information technology",
    "food & drinks", "science", "sports", "shopping", "business", "security",
    "engineering", "fashion", "family & parenting", "outdoor recreation",
    "animals & pets", "media", "health & fitness", "automotive", "aviation",
    "photo & video", "travel", "beauty", "sustainability", "transport",
    "law & politics", "military", "relationship status", "nature", "celebrities", "dancing"
];

const extendedColorPalette = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
    "#F06292", "#AED581", "#7E57C2", "#FFD54F", "#4DB6AC",
    "#FF7043", "#9575CD", "#4DD0E1", "#81C784", "#DCE775",
    "#BA68C8", "#4FC3F7", "#FFF176", "#FFB74D", "#A1887F",
    "#90CAF9", "#80CBC4", "#C5E1A5", "#9FA8DA", "#FFCC80",
    "#BCAAA4", "#B39DDB", "#81D4FA", "#80DEEA", "#FFF59D"
];

const generateColor = (index: number) => {
    const hue = (index * 137.508) % 360; // Use golden angle approximation
    return `hsl(${hue}, 70%, 50%)`;
};

// Create a global color scale with extended palette
const globalColorScale = scaleOrdinal<string, string>()
    .domain(allInterestCategories)
    .range(allInterestCategories.map((_, index) =>
        index < extendedColorPalette.length ? extendedColorPalette[index] : generateColor(index)
    ));

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
                                fill: globalColorScale(word.text),
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