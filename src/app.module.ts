import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { InvestorModule } from './investor/investor.module';
import { ReportsModule } from './reports/reports.module';
import { ChartsModule } from './charts/charts.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    CampaignModule,
    InvestorModule,
    ReportsModule,
    ChartsModule,
    SeedModule,
  ],
})
export class AppModule { }
