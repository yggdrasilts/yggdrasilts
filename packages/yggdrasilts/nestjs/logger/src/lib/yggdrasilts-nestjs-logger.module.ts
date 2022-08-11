import { DynamicModule, Global, Module } from '@nestjs/common';
import { RFS_SETTINGS, SETTINGS_PARAM, TSLogLoggerService } from './services';

import { ModuleError } from '@yggdrasilts/nest-common';
import { TSLogOptions } from './logger.interface';

@Global()
@Module({
  controllers: [],
  providers: [TSLogLoggerService],
  exports: [TSLogLoggerService],
})
export class YggNestLoggerModule {
  static register(options: { tslog: TSLogOptions }): DynamicModule {
    if (!options || Object.keys(options).length === 0) throw new ModuleError('Options for YggLoggerModule are needed.');

    return {
      module: YggNestLoggerModule,
      providers: [
        { provide: SETTINGS_PARAM, useValue: options.tslog.settingsParam },
        { provide: RFS_SETTINGS, useValue: options.tslog.rfsSettings },
        TSLogLoggerService,
      ],
      exports: [TSLogLoggerService],
    };
  }
}
