import { Controller, Post, Body } from '@nestjs/common';
import { ChartsService } from './charts.service';

@Controller('charts')
export class ChartsController {

    constructor(private readonly chartsService: ChartsService) { }

    /**
     * POST /charts/generate
     * Body Example:
     * {
     *   "type": "bar",
     *   "data": {
     *     "labels": ["Jan", "Feb", "Mar"],
     *     "datasets": [
     *       {
     *         "label": "Revenue",
     *         "data": [100, 200, 300]
     *       }
     *     ]
     *   }
     * }
     */
    @Post('generate')
    generateChart(@Body() chartConfig: any) {
        return {
            chartUrl: this.chartsService.generateChart(chartConfig),
        };
    }
}
