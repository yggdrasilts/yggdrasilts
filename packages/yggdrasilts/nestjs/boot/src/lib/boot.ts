import { INestApplicationContext, NestApplicationOptions } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ServiceConfig } from '@yggdrasilts/nest-config';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

const logger = new TSLogLoggerService({ name: 'YggNestBoot' });

const defaultServiceConfig: ServiceConfig = {
  globalPrefix: 'api',
  host: 'localhost',
  port: 3000,
};

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
class EmptyModule {}

export class YggNestBoot {
  public static async bootstrapService(module: any, options?: NestApplicationOptions): Promise<void> {
    const api = await NestFactory.create(module, { cors: true, ...options, bufferLogs: true });
    const config = api.get(ConfigService);

    api.useLogger(logger);

    let serviceConfig = config.get<ServiceConfig>('service');

    if (!serviceConfig || Object.keys(serviceConfig).length === 0) {
      logger.warn('Service using default service config:', defaultServiceConfig);
      serviceConfig = defaultServiceConfig;
    }

    api.setGlobalPrefix(serviceConfig.globalPrefix);

    // Starts listening for shutdown hooks
    api.enableShutdownHooks();

    try {
      await api.listen(serviceConfig.port, serviceConfig.host);
      if (serviceConfig.name) {
        logger.banner(serviceConfig.name, { figletOptions: { width: 180 } });
      }

      logger.info(`🚀 Application is running on: http://${serviceConfig.host}:${serviceConfig.port}/${serviceConfig.globalPrefix}`);
    } catch (error) {
      logger.error('💥 Application is not running due to the following error:\n', error);
      api.close();
    }
  }

  public static async bootstrapStandaloneService(
    module: any = EmptyModule,
    options?: NestApplicationContextOptions,
  ): Promise<INestApplicationContext> {
    return await NestFactory.createApplicationContext(module, options);
  }
}
