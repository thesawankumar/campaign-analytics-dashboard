import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

  constructor(private readonly reportsService: ReportsService) {}

  /**
   * POST /reports/generate
   * Body:
   * {
   *   "type": "campaign" | "investor",
   *   "start": "2026-01-01",
   *   "end": "2026-03-31"
   * }
   */
  @Post('generate')
  generateReport(@Body() body: {
    type: 'campaign' | 'investor';
    start: string;
    end: string;
  }) {
    return this.reportsService.generateReport(
      body.type,
      body.start,
      body.end,
    );
  }

  /**
   * Optional: if you later store reports in memory or file
   */
  @Get(':reportId')
  getReport(@Param('reportId') reportId: string) {
    return {
      message: `Report retrieval not persisted yet`,
      reportId,
    };
  }
}
