import { Injectable } from '@nestjs/common';
import { FileHelper } from '../common/helpers/file.helper';
import { FormulaHelper } from '../common/helpers/formula.helper';

@Injectable()
export class CampaignService {

    private campaigns = FileHelper.readJSON('campaigns.json');
    private transactions = FileHelper.readJSON('transactions.json');

    getCampaignAnalytics(campaignId: number) {

        const campaign = this.campaigns.find(c => c.id === campaignId);
        if (!campaign) return null;

        const investedTx = this.transactions.filter(
            t => t.campaign_id === campaignId && t.status === 'invested'
        );

        const uniqueInvestors = new Set(
            investedTx.map(t => t.investor_id)
        );

        const totalInvestors = uniqueInvestors.size;

        const totalRaised = investedTx.reduce(
            (sum, tx) => sum + tx.investment_amount,
            0
        );

        const avg =
            totalInvestors > 0 ? totalRaised / totalInvestors : 0;

        const performance = FormulaHelper.campaignPerformance(
            totalRaised,
            campaign.minimum_amt_commitment,
            totalInvestors
        );

        return {
            campaign_id: campaignId,
            total_investors: totalInvestors,
            total_amount_raised: totalRaised,
            average_investment_amount: +avg.toFixed(2),
            funding_progress_percentage: performance.fundingProgress,
            campaign_performance_score: performance.performanceScore,
        };
    }
}
