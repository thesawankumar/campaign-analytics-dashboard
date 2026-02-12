import { Injectable } from '@nestjs/common';
import { FileHelper } from '../common/helpers/file.helper';
import { FormulaHelper } from '../common/helpers/formula.helper';

@Injectable()
export class InvestorService {

  private transactions = FileHelper.readJSON('transactions.json');
  private campaigns = FileHelper.readJSON('campaigns.json');
  private startups = FileHelper.readJSON('startups.json');

  getInvestorInsights(investorId: number) {

    const investedTx = this.transactions.filter(
      t => t.investor_id === investorId && t.status === 'invested'
    );

    const totalInvestments = investedTx.length;

    const totalAmount = investedTx.reduce(
      (sum, tx) => sum + tx.investment_amount,
      0
    );

    const avg = totalInvestments > 0
      ? totalAmount / totalInvestments
      : 0;

    const sectorCount = {};

    investedTx.forEach(tx => {
      const campaign = this.campaigns.find(c => c.id === tx.campaign_id);
      const startup = this.startups.find(s => s.id === campaign.startup_id);
      const sector = startup?.sector || 'General';

      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    });

    const preferredSector =
      Object.keys(sectorCount).reduce((a, b) =>
        sectorCount[a] > sectorCount[b] ? a : b,
        Object.keys(sectorCount)[0]
      ) || 'General';

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
}
