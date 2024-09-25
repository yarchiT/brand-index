import React from 'react';
import { X } from 'lucide-react';

interface IndustryGroup {
    name: string;
    comparisons: Array<{
        brand1: string;
        brand2: string;
    }>;
}

const industryGroups: IndustryGroup[] = [
    {
        name: 'FMCG',
        comparisons: [
            { brand1: 'CocaCola', brand2: 'Pepsi' },
            { brand1: 'Fanta', brand2: 'Sprite' },
        ],
    },
    {
        name: 'Automotive',
        comparisons: [
            { brand1: 'Audi', brand2: 'BMW' },
            { brand1: 'Tesla', brand2: 'Toyota' },
        ],
    },
    {
        name: 'Fashion',
        comparisons: [
            { brand1: 'Nike', brand2: 'Adidas' },
            { brand1: 'Zara', brand2: 'H&M' },
        ],
    },
];

interface IndustrySidePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const IndustrySidePanel: React.FC<IndustrySidePanelProps> = ({ isOpen, onClose }) => {
    const handleComparisonClick = (brand1: string, brand2: string) => {
        const currentDomain = window.location.origin;
        const url = `${currentDomain}?mainBrand=${encodeURIComponent(brand1)}&competitorBrand=${encodeURIComponent(brand2)}`;
        window.location.href = url;
    };

    return (
        <div className={`fixed top-20 inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Famous brand comparisons</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
                {industryGroups.map((group, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-md font-semibold mb-3 text-gray-700">{group.name}</h3>
                        <div className="space-y-2">
                            {group.comparisons.map((comparison, cIndex) => (
                                <button
                                    key={cIndex}
                                    onClick={() => handleComparisonClick(comparison.brand1, comparison.brand2)}
                                    className="w-full text-left p-2 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    <span className="font-medium text-gray-800">{comparison.brand1}</span>
                                    <span className="text-gray-400 mx-2">vs</span>
                                    <span className="font-medium text-gray-800">{comparison.brand2}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndustrySidePanel;