import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';

import { DataController } from './controllers/data.controller';
import { DataService } from './services/data.service';

@Module({
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {
  static register(options: { imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> }): DynamicModule {
    return {
      module: DataModule,
      imports: [...options.imports],
    };
  }
}
