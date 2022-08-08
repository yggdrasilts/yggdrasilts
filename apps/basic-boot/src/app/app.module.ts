import { Module } from '@nestjs/common';
import { YggNestConfigModule } from '@yggdrasilts/nest-config';
import { YggNestLoggerModule } from '@yggdrasilts/nest-logger';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [YggNestLoggerModule, YggNestConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
