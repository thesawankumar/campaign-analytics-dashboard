export class FormulaHelper {

  static campaignPerformance(totalRaised: number, minCommitment: number, totalInvestors: number) {

    const fundingProgress = minCommitment > 0
      ? (totalRaised / minCommitment) * 100
      : 0;

    const investorComponent = Math.min((totalInvestors / 50) * 100, 100);

    const score =
      (fundingProgress * 0.6) +
      (investorComponent * 0.4);

    return {
      fundingProgress: +fundingProgress.toFixed(2),
      performanceScore: +Math.min(score, 100).toFixed(2),
    };
  }

  static investorEngagement(totalInvestments: number, totalAmount: number) {

    const countComponent = Math.min(totalInvestments / 10, 1) * 50;
    const amountComponent = Math.min(totalAmount / 1000000, 1) * 50;

    return +Math.min(countComponent + amountComponent, 100).toFixed(2);
  }

  static investorSegment(totalInvestments: number, totalAmount: number) {
    if (totalAmount >= 5000000) return 'whale';
    if (totalInvestments >= 5) return 'regular';
    if (totalInvestments >= 2) return 'occasional';
    return 'new';
  }
}
