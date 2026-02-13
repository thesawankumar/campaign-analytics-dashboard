import { FormulaHelper } from './formula.helper';

describe('FormulaHelper', () => {

    it('should calculate campaign performance correctly', () => {
        const score = FormulaHelper.campaignPerformance(80, 60, 50);
        expect(score.performanceScore).toBeLessThanOrEqual(100);
    });

    it('should calculate investor engagement correctly', () => {
        const engagement = FormulaHelper.investorEngagement(5, 500000);
        expect(engagement).toBeLessThanOrEqual(100);
    });

    it('should classify whale investor correctly', () => {
        const segment = FormulaHelper.investorSegment(10, 6000000);
        expect(segment).toBe('whale');
    });

    it('should handle zero division safely', () => {
        const engagement = FormulaHelper.investorEngagement(0, 0);
        expect(engagement).toBe(0);
    });
});
