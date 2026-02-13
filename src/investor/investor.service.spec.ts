import { InvestorService } from './investor.service';

describe('InvestorService', () => {
    let service: InvestorService;

    beforeEach(() => {
        service = new InvestorService();
    });

    it('should calculate investor insights correctly', () => {
        const result = service.getInvestorInsights(1);

        expect(result).toHaveProperty('investor_id');
        expect(result).toHaveProperty('total_investments');
        expect(result).toHaveProperty('total_investment_amount');
        expect(result).toHaveProperty('engagement_score');
        expect(result).toHaveProperty('investor_segment');
    });

    it('should classify investor segment correctly', () => {
        const result = service.getInvestorInsights(1);

        expect(
            ['whale', 'regular', 'occasional', 'new']
        ).toContain(result.investor_segment);
    });
});
