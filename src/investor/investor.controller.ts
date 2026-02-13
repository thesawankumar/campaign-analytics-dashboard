import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { InvestorService } from './investor.service';

@Controller('campaign-analytics')
export class InvestorController {

  constructor(private readonly service: InvestorService) {}

  /**
   * 1️⃣ GET Investor Insights
   * GET /campaign-analytics/investor/:investorId
   */
  @Get('investor/:investorId')
  getInvestor(
    @Param('investorId', ParseIntPipe) investorId: number,
  ) {
    return this.service.getInvestorInsights(investorId);
  }

  /**
   * 2️⃣ GET Top Investors
   * GET /campaign-analytics/investors/top?limit=10
   */
  @Get('investors/top')
  getTopInvestors(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ) {
    return this.service.getTopInvestors(limit);
  }

  /**
   * 3️⃣ POST Calculate & Append
   * POST /campaign-analytics/investor/:investorId/calculate
   */
  @Post('investor/:investorId/calculate')
  calculateInvestor(
    @Param('investorId', ParseIntPipe) investorId: number,
  ) {
    return this.service.calculateAndAppend(investorId);
  }
}
