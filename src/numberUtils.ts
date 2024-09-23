export class NumberUtils {
    static formatNumber(num: number): string {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + ' mln';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
}