import { Injectable } from '@nestjs/common';

@Injectable()
export class ChartsService {

  generateChart(config: any) {
    const baseUrl = 'https://quickchart.io/chart';
    const encoded = encodeURIComponent(JSON.stringify(config));
    return `${baseUrl}?c=${encoded}`;
  }
}
