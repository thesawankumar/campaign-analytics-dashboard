import { Injectable, NotFoundException } from '@nestjs/common';
import { FileHelper } from '../common/helpers/file.helper';
import { DateUtil } from '../common/utils/date.util';

@Injectable()
export class CampaignService {

    /**
     * Core analytics calculation (Reusable logic)
     */
    getCampaignAnalytics(campaignId: number) {
        const campaigns = FileHelper.readJSON('campaigns.json');
        const transactions = FileHelper.readJSON('transactions.json');

        const campaign = campaigns.find(c => c.id === campaignId);

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        // Filter only invested transactions
        const investedTransactions = transactions.filter(
            t => t.campaign_id === campaignId && t.status === 'invested'
        );

        // Unique investors
        const uniqueInvestors = new Set(
            investedTransactions.map(t => t.investor_id)
        );

        const totalInvestors = uniqueInvestors.size;

        const totalAmountRaised = investedTransactions.reduce(
            (sum, t) => sum + t.investment_amount,
            0
        );

        const averageInvestmentAmount =
            totalInvestors > 0
                ? totalAmountRaised / totalInvestors
                : 0;

        const fundingProgressPercentage =
            campaign.minimum_amt_commitment > 0
                ? (totalAmountRaised / campaign.minimum_amt_commitment) * 100
                : 0;

        const investorComponent = Math.min(
            (totalInvestors / 50) * 100,
            100
        );

        let campaignPerformanceScore =
            fundingProgressPercentage * 0.6 +
            investorComponent * 0.4;

        if (campaignPerformanceScore > 100) {
            campaignPerformanceScore = 100;
        }

        return {
            campaign_id: campaignId,
            total_investors: totalInvestors,
            total_amount_raised: totalAmountRaised,
            average_investment_amount: this.round(averageInvestmentAmount),
            funding_progress_percentage: this.round(fundingProgressPercentage),
            campaign_performance_score: this.round(campaignPerformanceScore),
        };
    }

    /**
     * Trends endpoint logic
     * GET /campaign-analytics/campaign/:id/trends?days=30
     */
    getCampaignTrends(campaignId: number, days: number) {
        const analytics = FileHelper.readJSON('output/campaign-analytics.json');

        const filtered = analytics
            .filter(r => r.campaign_id === campaignId)
            .sort((a, b) =>
                new Date(a.analytics_date).getTime() -
                new Date(b.analytics_date).getTime()
            )
            .slice(-days);

        return filtered.map(r => ({
            date: r.analytics_date,
            total_amount_raised: r.total_amount_raised,
            performance_score: r.campaign_performance_score,
        }));
    }

    /**
     * Calculate and append to output file
     * POST /campaign-analytics/campaign/:id/calculate
     */
    calculateAndAppend(campaignId: number) {
        const analyticsData = this.getCampaignAnalytics(campaignId);

        const outputPath = 'output/campaign-analytics.json';

        let existing: any[] = [];

        try {
            existing = FileHelper.readJSON(outputPath);
        } catch {
            existing = [];
        }

        const newRecord = {
            id: existing.length + 1,
            analytics_date: DateUtil.getToday(),
            ...analyticsData,
        };

        existing.push(newRecord);

        FileHelper.writeJSON(outputPath, existing);

        return newRecord;
    }

    /**
     * Helper function to round decimals (2 places)
     */
    private round(value: number) {
        return Number(value.toFixed(2));
    }
}
