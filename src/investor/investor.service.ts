import { Injectable, NotFoundException } from '@nestjs/common';
import { FileHelper } from '../common/helpers/file.helper';
import { FormulaHelper } from '../common/helpers/formula.helper';
import { DateUtil } from '../common/utils/date.util';

@Injectable()
export class InvestorService {

  /**
   * Core reusable logic
   */
  getInvestorInsights(investorId: number) {

    const transactions = FileHelper.readJSON('transactions.json');
    const campaigns = FileHelper.readJSON('campaigns.json');
    const startups = FileHelper.readJSON('startups.json');

    const investedTx = transactions.filter(
      t => t.investor_id === investorId && t.status === 'invested'
    );

    const totalInvestments = investedTx.length;

    const totalAmount = investedTx.reduce(
      (sum, tx) => sum + tx.investment_amount,
      0
    );

    const avg =
      totalInvestments > 0
        ? totalAmount / totalInvestments
        : 0;

    // Preferred sector calculation
    const sectorCount: Record<string, number> = {};

    investedTx.forEach(tx => {
      const campaign = campaigns.find(c => c.id === tx.campaign_id);
      const startup = startups.find(s => s.id === campaign?.startup_id);

      const sector = startup?.sector || 'General';

      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    });

    const preferredSector =
      Object.keys(sectorCount).length > 0
        ? Object.keys(sectorCount).reduce((a, b) =>
            sectorCount[a] > sectorCount[b] ? a : b
          )
        : 'General';

    const engagement = FormulaHelper.investorEngagement(
      totalInvestments,
      totalAmount
    );

    const segment = FormulaHelper.investorSegment(
      totalInvestments,
      totalAmount
    );

    const lastInvestment =
      investedTx.length > 0
        ? investedTx[investedTx.length - 1].investment_at
        : null;

    return {
      investor_id: investorId,
      total_investments: totalInvestments,
      total_investment_amount: totalAmount,
      average_investment_amount: +avg.toFixed(2),
      preferred_sector: preferredSector,
      engagement_score: engagement,
      investor_segment: segment,
      last_investment_date: lastInvestment,
    };
  }

  /**
   * Top investors by total investment amount
   */
  getTopInvestors(limit: number) {
    const investors = FileHelper.readJSON('investors.json');

    const insights = investors.map(inv =>
      this.getInvestorInsights(inv.id)
    );

    return insights
      .sort((a, b) =>
        b.total_investment_amount - a.total_investment_amount
      )
      .slice(0, limit);
  }

  /**
   * Calculate and append to output file
   */
  calculateAndAppend(investorId: number) {
    const outputPath = 'output/investor-insights.json';

    let existing: any[] = [];

    try {
      existing = FileHelper.readJSON(outputPath);
    } catch {
      existing = [];
    }

    const insights = this.getInvestorInsights(investorId);

    const newRecord = {
      id: existing.length + 1,
      insight_date: DateUtil.getToday(),
      ...insights,
    };

    existing.push(newRecord);

    FileHelper.writeJSON(outputPath, existing);

    return newRecord;
  }
}
