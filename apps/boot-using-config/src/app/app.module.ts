import { TSLogOptions, YggNestLoggerModule } from '@yggdrasilts/nest-logger';
import { YggNestConfigModule, loadConfigFile } from '@yggdrasilts/nest-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

const configFilePath = process.env.CONFIG_FILE_PATH || join(__dirname, 'config/api.yml');

const tslogOptions: { tslog: TSLogOptions } = {
  tslog: { settingsParam: { maskValuesOfKeys: ['password', 'apiKey'] }, rfsSettings: { filename: 'boot-using-config.log' } },
};

@Module({
  imports: [
    YggNestLoggerModule.register(tslogOptions),
    YggNestConfigModule.register({ load: [loadConfigFile({ filePath: configFilePath }, tslogOptions)] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
