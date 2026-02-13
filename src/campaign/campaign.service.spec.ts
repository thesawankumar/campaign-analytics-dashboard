import { CampaignService } from './campaign.service';
import { NotFoundException } from '@nestjs/common';

describe('CampaignService', () => {
    let service: CampaignService;

    beforeEach(() => {
        service = new CampaignService();
    });

    it('should calculate campaign analytics correctly ', () => {
        const result = service.getCampaignAnalytics(1);

        expect(result).toHaveProperty('campaign_id');
        expect(result).toHaveProperty('total_investors');
        expect(result).toHaveProperty('total_amount_raised');
        expect(result).toHaveProperty('campaign_performance_score');
    });

    it('should throw NotFoundException for invalid campaign id', () => {
        expect(() => {
            service.getCampaignAnalytics(99999);
        }).toThrow(NotFoundException);
    });
});
