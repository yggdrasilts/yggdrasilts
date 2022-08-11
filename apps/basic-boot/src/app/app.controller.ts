import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: TSLogLoggerService) {
    this.logger.setName('AppController');
  }

  @Get()
  getData() {
    this.logger.debug('getData');
    return this.appService.getData();
  }
}
