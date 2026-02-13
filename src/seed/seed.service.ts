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
        const reportsOutput: any[] = [];

        // 🔥 Generate 100 Campaign + Investor records
        for (let i = 0; i < 100; i++) {

            const campaignId = campaigns[i % campaigns.length].id;
            const investorId = investors[i % investors.length].id;

            const analyticsDate = DateUtil.getPastDate(i);

            campaignOutput.push({
                id: i + 1,
                analytics_date: analyticsDate,
                ...this.campaignService.getCampaignAnalytics(campaignId),
            });

            investorOutput.push({
                id: i + 1,
                insight_date: analyticsDate,
                ...this.investorService.getInvestorInsights(investorId),
            });
        }

        // 🔥 Write first two files
        FileHelper.writeJSON('output/campaign-analytics.json', campaignOutput);
        FileHelper.writeJSON('output/investor-insights.json', investorOutput);

        // 🔥 Generate 100 Reports
        for (let i = 0; i < 100; i++) {

            const type = i % 2 === 0 ? 'campaign' : 'investor';

            const start = DateUtil.getPastDate(90);
            const end = DateUtil.getPastDate(0);

            const sourceData =
                type === 'campaign'
                    ? campaignOutput
                    : investorOutput;

            const filtered = sourceData.filter(r => {
                const date = r.analytics_date || r.insight_date;
                return date >= start && date <= end;
            });

            const totalAmount = filtered.reduce(
                (sum, r) =>
                    sum +
                    (type === 'campaign'
                        ? r.total_amount_raised
                        : r.total_investment_amount),
                0
            );

            reportsOutput.push({
                id: i + 1,
                report_name: `${type.toUpperCase()} Report #${i + 1}`,
                report_type: type,
                generated_by: 1,
                report_period_start: start,
                report_period_end: end,
                report_data: {
                    summary: {
                        total_records: filtered.length,
                        total_amount: totalAmount,
                    },
                    details: [],
                },
                export_file_url: null,
                generated_at: new Date().toISOString(),
            });
        }

        FileHelper.writeJSON('output/analytics-reports.json', reportsOutput);


        return {
            campaignAnalytics: 100,
            investorInsights: 100,
            reports: 100,
        };
    }

}
