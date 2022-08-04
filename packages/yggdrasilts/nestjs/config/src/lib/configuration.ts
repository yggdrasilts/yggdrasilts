import 'source-map-support/register';

import { existsSync, readFileSync } from 'fs';
import { isAbsolute, join } from 'path';

import * as yaml from 'js-yaml';

import { ConfigFactory, ConfigObject } from '@nestjs/config';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

import { ConfigError } from './errors';

const YAML_CONFIG_FILENAME = 'config.yml';

const logger = new TSLogLoggerService({ name: 'YggNestConfig' });

export const loadDefaultConfigFile = (): Record<string, unknown> => {
  const filePath = join(process.cwd(), YAML_CONFIG_FILENAME);
  logger.info('Loading config from:', filePath);
  if (existsSync(filePath)) {
    return yaml.load(readFileSync(filePath, 'utf8')) as Record<string, unknown>;
  }
  throw new ConfigError(`Configuration file not loaded: ${filePath}`);
};

export const loadConfigFile = (options: { filePath: string }): ConfigFactory<ConfigObject> => {
  return (): Record<string, unknown> => {
    logger.info('Config options:', options);
    const filePath = isAbsolute(options.filePath) ? options.filePath : join(process.cwd(), options.filePath);
    let errorMessage = `Configuration file not loaded: ${filePath}`;
    logger.info('Loading config from:', filePath);
    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf8');
      if (fileData.length !== 0) {
        const config = yaml.load(fileData) as Record<string, unknown>;
        logger.info(config);
        return config;
      } else {
        errorMessage = `File ${filePath} must no be empty.`;
      }
    }
    throw new ConfigError(errorMessage);
  };
};
