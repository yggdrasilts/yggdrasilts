import { join } from 'path';

import { Module } from '@nestjs/common';
import { YggNestConfigModule, loadConfigFile } from '@yggdrasilts/nest-config';
import { ARANGODB_STORE, ArangodbModule } from '@yggdrasilts/nest-data';
import { TSLogOptions, YggNestLoggerModule } from '@yggdrasilts/nest-logger';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Store } from './arangodb/collections/store';
import { DataModule } from './data/data.module';

const configFilePath = process.env.CONFIG_FILE_PATH || join(__dirname, 'config/api.yml');

const tslogOptions: { tslog: TSLogOptions } = {
  tslog: { settingsParam: { maskValuesOfKeys: ['password'] }, rfsSettings: { filename: 'arangodb-data-sample.log' } },
};

@Module({
  imports: [
    YggNestLoggerModule.register(tslogOptions),
    YggNestConfigModule.register({ load: [loadConfigFile({ filePath: configFilePath }, tslogOptions)] }),
    DataModule.register({
      imports: [
        ArangodbModule.register({
          providers: [{ provide: ARANGODB_STORE, useValue: Store }],
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
