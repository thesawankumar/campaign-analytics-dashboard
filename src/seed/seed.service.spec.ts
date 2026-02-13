import { SeedService } from './seed.service';
import { CampaignService } from '../campaign/campaign.service';
import { InvestorService } from '../investor/investor.service';

describe('SeedService', () => {
    let service: SeedService;

    beforeEach(() => {
        service = new SeedService(
            new CampaignService(),
            new InvestorService(),
        );
    });

    it('should generate 100 records per output file', () => {
        const result = service.generate();

        expect(result.campaignAnalytics).toBe(100);
        expect(result.investorInsights).toBe(100);
        expect(result.reports).toBe(100);
    });
});
