import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { YggNestConfigModule } from '@yggdrasilts/nest-config';
import { YggNestLoggerModule } from '@yggdrasilts/nest-logger';

import { ArangodbService } from './services/arangodb.service';

@Global()
@Module({
  imports: [YggNestConfigModule, YggNestLoggerModule],
  providers: [ArangodbService],
  exports: [ArangodbService],
})
export class ArangodbModule {
  static register(options: { providers: Provider[] }): DynamicModule {
    return {
      module: ArangodbModule,
      providers: [...options.providers, ArangodbService],
      exports: [ArangodbService],
    };
  }
}
