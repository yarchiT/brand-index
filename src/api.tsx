import {BrandStatsProps} from "./BrandStats.tsx";

export interface BrandStatsApiResponse {
    totalCount: number;
    aggregations: {
        dates: {
            values: {
                date: string;
                dateAsUtc: string;
                key: string;
                count: number;
                metricValue: number;
            }[];
        };
        resourceTypes: {
            values: {
                key: string;
                count: number;
                metricValue: number;
            }[];
            otherCount: number;
        };
    };
}

export function mapApiResponseToProps(brandName: string, apiResponse: BrandStatsApiResponse): BrandStatsProps {
    return {
        name: brandName,
        stats:{
            totalCount: apiResponse.totalCount,
            dates: apiResponse.aggregations.dates.values.map(item => ({
                date: item.date,
                count: item.count
            })),
            resourceTypes: apiResponse.aggregations.resourceTypes?.values ?? []
        }
    };
}