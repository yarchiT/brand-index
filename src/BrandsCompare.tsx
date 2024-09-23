import React, { useState } from 'react';
import axios from 'axios';
import './BrandsCompare.css';

interface BrandCompareStats {
    brand1: BrandStats;
    brand2: BrandStats;
}

interface BrandStats {
    totalCount: number;
}

const BrandsCompare: React.FC = () => {
    const [brand1, setBrand1] = useState('');
    const [brand2, setBrand2] = useState('');
    const [stats1, setStats1] = useState<BrandStats | null>(null);
    const [stats2, setStats2] = useState<BrandStats | null>(null);

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
            setStats1(response.brand1);
            setStats2(response.brand2);
        } catch (error) {
            console.error('Error fetching brand stats:', error);
        }
    };

    return (
        <div className="brand-compare">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={brand1}
                        onChange={(e) => setBrand1(e.target.value)}
                        placeholder="Enter first brand name"
                        required
                    />
                    <input
                        type="text"
                        value={brand2}
                        onChange={(e) => setBrand2(e.target.value)}
                        placeholder="Enter second brand name"
                        required
                    />
                </div>
                <button type="submit">Go</button>
            </form>
            {stats1 && stats2 && (
                <div className="results">
                    <div className="brand-stats">
                        <h2>{brand1}</h2>
                        <p>Total Count: {stats1.totalCount}</p>
                    </div>
                    <div className="brand-stats">
                        <h2>{brand2}</h2>
                        <p>Total Count: {stats2.totalCount}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandsCompare;