import React, {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import axios from 'axios';
import BrandStats, {BrandStatsProps} from "./BrandStats.tsx";
import {BrandStatsApiResponse, mapApiResponseToProps} from "./api.tsx";

interface BrandCompareStats {
    brand1: BrandStatsApiResponse;
    brand2: BrandStatsApiResponse;
}

const BrandsCompare: React.FC = () => {
    const [brand1, setBrand1] = useState('');
    const [brand2, setBrand2] = useState('');
    const [brand1Response, setBrand1Response] = useState<BrandStatsProps | null>(null);
    const [brand2Response, setBrand2Response] = useState<BrandStatsProps | null>(null);

    const fetchBrandStats = async (brand1: string, brand2: string): Promise<BrandCompareStats> => {
        const payload = {
            brand1: brand1,
            brand2: brand2
        };

        const response = await axios.post<BrandCompareStats>(
            'https://workers-playground-yellow-frost-b654.ytykhonchuk.workers.dev/compare/social-search',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetchBrandStats(brand1, brand2);

            setBrand1Response(mapApiResponseToProps(brand1, response.brand1));
            setBrand2Response(mapApiResponseToProps(brand2, response.brand2));
        } catch (error) {
            console.error('Error fetching brand stats:', error);
        }
    };

    return (
        <div className="w-full max-w-full px-4 py-8">
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        value={brand1}
                        onChange={(e) => setBrand1(e.target.value)}
                        placeholder="Enter first brand name"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={brand2}
                        onChange={(e) => setBrand2(e.target.value)}
                        placeholder="Enter second brand name"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                    >
                        Go <ArrowRight className="ml-2" size={20} />
                    </button>
                </div>
            </form>


            {brand1Response && brand2Response && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg">
                        <BrandStats name={brand1Response.name} stats={brand1Response.stats} />
                    </div>
                    <div className="bg-white rounded-lg shadow-lg">
                        <BrandStats name={brand2Response.name} stats={brand2Response.stats} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandsCompare;