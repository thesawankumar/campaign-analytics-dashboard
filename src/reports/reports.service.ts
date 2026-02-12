import { Injectable } from '@nestjs/common';
import { FileHelper } from '../common/helpers/file.helper';

@Injectable()
export class ReportsService {

  generateReport(type: 'campaign' | 'investor', start: string, end: string) {

    const fileName =
      type === 'campaign'
        ? 'campaign-analytics.json'
        : 'investor-insights.json';

    const data = FileHelper.readJSON(`output/${fileName}`);

    const filtered = data.filter(r => {
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

    return {
      report_type: type,
      report_period_start: start,
      report_period_end: end,
      total_records: filtered.length,
      total_amount: totalAmount,
      details: filtered,
    };
  }
}
