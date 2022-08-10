import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BootServiceConfig, SERVICE } from '../config/service.config';

@Injectable()
export class AppService {
  private message: string;

  constructor(private readonly configService: ConfigService) {
    const serviceConfig = this.configService.get<BootServiceConfig>(SERVICE);
    this.message = serviceConfig.message;
  }

  getData(): { message: string } {
    return { message: this.message };
  }
}
