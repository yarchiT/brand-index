import {BrandStatsProps} from "./BrandStats/BrandStats.tsx";

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
        sentiment: {
            nsr: number,
            values: {
                key: string;
                count: number;
            }[];
        };
        countries: {
            values: {
                key: string;
                count: number;
            }[];
        }
    };
}

export function mapApiResponseToProps(brandName: string, apiResponse: BrandStatsApiResponse): BrandStatsProps {
    const extrapolateAndRound = (value: number): number => {
        const extrapolated = value * 100;
        if (extrapolated > 1000) {
            return Math.round(extrapolated / 100) * 100;
        }
        return extrapolated;
    };

    return {
        name: brandName,
        stats: {
            totalCount: extrapolateAndRound(apiResponse.totalCount),
            dates: apiResponse.aggregations.dates.values.map(item => ({
                date: item.dateAsUtc,
                count: extrapolateAndRound(item.count)
            })),
            resourceTypes: (apiResponse.aggregations.resourceTypes?.values ?? []).map(item => ({
                ...item,
                count: extrapolateAndRound(item.count)
            })),
            sentiment: {
                nsr: apiResponse.aggregations.sentiment.nsr,
                values: apiResponse.aggregations.sentiment.values.map(item => ({
                    ...item,
                    count: extrapolateAndRound(item.count)
                }))
            },
            countries: (apiResponse.aggregations.countries?.values ?? []).map(item => ({
                ...item,
                count: extrapolateAndRound(item.count)
            }))
        }
    };
}