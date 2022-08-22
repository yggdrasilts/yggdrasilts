import * as chalk from 'chalk';

import { INestApplicationContext, NestApplicationOptions } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ServiceConfig } from '@yggdrasilts/nest-config';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

// Default logger
const logger = new TSLogLoggerService({ name: 'YggNestBoot' }, { filename: 'nest-boot.log', disable: true });

// Default service config. Used when there is no configuration file (yml).
const defaultServiceConfig: ServiceConfig = {
  name: 'YggAPI',
  globalPrefix: 'api',
  host: 'localhost',
  port: 3000,
};

// Empty module to be loaded if the standalone application has no module.
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
class EmptyModule {}

/**
 * Boot class.
 */
export class YggNestBoot {
  /**
   * Bootstrap service to load NestJS application as REST API.
   *
   * @param module NestJS module to be loaded.
   * @param options @see{NestApplicationOptions}
   */
  public static async bootstrapService(module: any, options?: NestApplicationOptions): Promise<void> {
    const api = await NestFactory.create(module, {
      cors: true,
      ...options,
      bufferLogs: true,
    });
    const config = api.get(ConfigService);

    api.useLogger(logger);

    let serviceConfig = config.get<ServiceConfig>('service');

    if (!serviceConfig || Object.keys(serviceConfig).length === 0) {
      logger.warn(
        'Service using default service config:',
        defaultServiceConfig,
        `\nIf you want custom config, use ${chalk.bold.yellow('YggNestConfigModule.register(...)')}`,
      );
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

      logger.info(
        `🚀 Application is running on: ${chalk.bold.greenBright(
          `http://${serviceConfig.host}:${serviceConfig.port}/${serviceConfig.globalPrefix}`,
        )}`,
      );
    } catch (error) {
      logger.error('💥 Application is not running due to the following error:\n', error);
      api.close();
    }
  }

  /**
   * Bootstrap service to load NestJS application as standalone application.
   *
   * @param module NestJS module.
   * @param options @see{NestApplicationContextOptions}
   * @returns @see{INestApplicationContext}
   */
  public static async bootstrapStandaloneService(
    module: any = EmptyModule,
    options?: NestApplicationContextOptions,
  ): Promise<INestApplicationContext> {
    return await NestFactory.createApplicationContext(module, options);
  }
}
