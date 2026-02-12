import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { CampaignModule } from '../campaign/campaign.module';
import { InvestorModule } from '../investor/investor.module';

@Module({
  imports: [CampaignModule, InvestorModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
