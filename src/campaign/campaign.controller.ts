import { Controller, Get, Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaign-analytics')
export class CampaignController {

    constructor(private readonly service: CampaignService) { }

    @Get('campaign/:campaignId')
    getCampaign(@Param('campaignId') campaignId: string) {
        return this.service.getCampaignAnalytics(+campaignId);
    }
}
