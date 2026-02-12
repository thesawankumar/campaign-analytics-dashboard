import { Controller, Get, Param } from '@nestjs/common';
import { InvestorService } from './investor.service';

@Controller('campaign-analytics')
export class InvestorController {

  constructor(private readonly service: InvestorService) {}

  @Get('investor/:investorId')
  getInvestor(@Param('investorId') investorId: string) {
    return this.service.getInvestorInsights(+investorId);
  }
}
