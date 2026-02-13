import {
    Controller,
    Get,
    Post,
    Param,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaign-analytics')
export class CampaignController {

    constructor(private readonly service: CampaignService) { }

    /**
     * 1️⃣ GET campaign analytics
     * GET /campaign-analytics/campaign/:campaignId
     */
    @Get('campaign/:campaignId')
    getCampaign(
        @Param('campaignId', ParseIntPipe) campaignId: number,
    ) {
        return this.service.getCampaignAnalytics(campaignId);
    }

    /**
     * 2️⃣ GET campaign trends
     * GET /campaign-analytics/campaign/:campaignId/trends?days=30
     */
    @Get('campaign/:campaignId/trends')
    getCampaignTrends(
        @Param('campaignId', ParseIntPipe) campaignId: number,
        @Query('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
    ) {
        return this.service.getCampaignTrends(campaignId, days);
    }

    /**
     * 3️⃣ POST calculate and append analytics
     * POST /campaign-analytics/campaign/:campaignId/calculate
     */
    @Post('campaign/:campaignId/calculate')
    calculateCampaign(
        @Param('campaignId', ParseIntPipe) campaignId: number,
    ) {
        return this.service.calculateAndAppend(campaignId);
    }
}
