import { join } from 'path';

import { Module } from '@nestjs/common';
import { YggNestConfigModule, loadConfigFile } from '@yggdrasilts/nest-config';
import { YggNestLoggerModule } from '@yggdrasilts/nest-logger';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const configFilePath = process.env.CONFIG_FILE_PATH || join(__dirname, 'config/api.yml');

@Module({
  imports: [YggNestLoggerModule, YggNestConfigModule.register({ load: [loadConfigFile({ filePath: configFilePath })] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
