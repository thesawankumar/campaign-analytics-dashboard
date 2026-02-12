import { Injectable } from '@nestjs/common';
import { CampaignService } from '../campaign/campaign.service';
import { InvestorService } from '../investor/investor.service';
import { FileHelper } from '../common/helpers/file.helper';
import { DateUtil } from '../common/utils/date.util';

@Injectable()
export class SeedService {

    constructor(
        private campaignService: CampaignService,
        private investorService: InvestorService,
    ) { }

    generate() {

        const campaigns = FileHelper.readJSON('campaigns.json');
        const investors = FileHelper.readJSON('investors.json');

        const campaignOutput: any[] = [];
        const investorOutput: any[] = [];

        for (let i = 0; i < 40; i++) {

            const campaignId = campaigns[i % campaigns.length].id;
            const investorId = investors[i % investors.length].id;

            campaignOutput.push({
                id: i + 1,
                analytics_date: DateUtil.getPastDate(i),
                ...this.campaignService.getCampaignAnalytics(campaignId),
            });

            investorOutput.push({
                id: i + 1,
                insight_date: DateUtil.getPastDate(i),
                ...this.investorService.getInvestorInsights(investorId),
            });
        }

        FileHelper.writeJSON('campaign-analytics.json', campaignOutput);
        FileHelper.writeJSON('investor-insights.json', investorOutput);

        return {
            campaignAnalytics: 40,
            investorInsights: 40,
        };
    }
}
