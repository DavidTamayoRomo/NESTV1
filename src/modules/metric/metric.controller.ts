import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { GetAllMetricDto } from './dto/get-all-metric.dto';
import { MetricService } from './metric.service';
import { Observable, mergeMap, of } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';

@Controller('metrics')
@ApiTags('metrics')
export class MetricController {
  constructor(private readonly _metricService: MetricService) {}

  @Get()
  @ApiOperation({
    summary: 'Get metrics',
    description:
      'Get all metrics. This endpoint is used to get all metrics.',
  })
  getMetrics(): Observable<GetAllMetricDto[]> {
    return of(1).pipe(mergeMap(() => this._metricService.getAllItems()));
  }

  @Post()
  createMetric(@Body() metric: CreateMetricDto): Observable<GetAllMetricDto> {
    return of(1).pipe(mergeMap(() => this._metricService.createItem(metric)));
  }
}
