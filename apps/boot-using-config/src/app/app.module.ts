import { join } from 'path';

import { Module } from '@nestjs/common';
import { YggNestConfigModule, loadConfigFile } from '@yggdrasilts/nest-config';
import { TSLogOptions, YggNestLoggerModule } from '@yggdrasilts/nest-logger';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const configFilePath = process.env.CONFIG_FILE_PATH || join(__dirname, 'config/api.yml');

const tslogOptions: { tslog: TSLogOptions } = {
  tslog: {
    settingsParam: { maskValuesOfKeys: ['password', 'apiKey'] },
    rfsSettings: { filename: 'boot-using-config.log', disabled: true },
  },
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
