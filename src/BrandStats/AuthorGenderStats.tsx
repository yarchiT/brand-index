import React from 'react';
import { User, Users } from 'lucide-react';
import { NumberUtils } from '../numberUtils';

interface AuthorGenderStatsProps {
    data: {
        key: string;
        count: number;
    }[];
}

const AuthorGenderStats: React.FC<AuthorGenderStatsProps> = ({ data }) => {
    const getGenderData = (key: string) => {
        return data.find(item => item.key === key)?.count || 0;
    };

    const femaleCount = getGenderData('female');
    const maleCount = getGenderData('male');
    const communityCount = getGenderData('community');

    return (
        <div className="w-full py-4">
            <h3 className="text-xl font-semibold mb-6 text-center">Author Gender Distribution</h3>
            <div className="flex justify-center items-start space-x-16">
                <div className="flex flex-col items-center">
                    <User size={40} className="text-pink-500 mb-3" />
                    <span className="text-lg font-semibold mb-1">{NumberUtils.formatNumber(femaleCount)}</span>
                    <span className="text-sm text-gray-600">Female</span>
                </div>
                <div className="flex flex-col items-center">
                    <User size={40} className="text-blue-500 mb-3" />
                    <span className="text-lg font-semibold mb-1">{NumberUtils.formatNumber(maleCount)}</span>
                    <span className="text-sm text-gray-600">Male</span>
                </div>
                <div className="flex flex-col items-center">
                    <Users size={40} className="text-green-500 mb-3" />
                    <span className="text-lg font-semibold mb-1">{NumberUtils.formatNumber(communityCount)}</span>
                    <span className="text-sm text-gray-600">Community</span>
                </div>
            </div>
        </div>
    );
};

export default AuthorGenderStats;