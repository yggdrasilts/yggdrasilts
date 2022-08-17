import { Controller, Get } from '@nestjs/common';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

import { Component } from '../../arangodb/entities';
import { DataService } from '../services/data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService, private readonly logger: TSLogLoggerService) {
    this.logger.setName('DataController');
  }

  @Get('components')
  public async getComponents(): Promise<Component[]> {
    this.logger.debug('getComponents');
    return await this.dataService.getComponents();
  }

  @Get('componentEdges')
  public async getComponentEdges(): Promise<Component[]> {
    this.logger.debug('getComponentEdges');
    return await this.dataService.getEdges();
  }
}
