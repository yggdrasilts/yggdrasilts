import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { ModuleError } from '@yggdrasilts/nest-common';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class YggNestConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    if (!options || Object.keys(options).length === 0) throw new ModuleError('Options for YggNestConfigModule are needed.');

    return {
      module: YggNestConfigModule,
      imports: [ConfigModule.forRoot(options)],
      providers: [],
      exports: [ConfigModule],
    };
  }
}
