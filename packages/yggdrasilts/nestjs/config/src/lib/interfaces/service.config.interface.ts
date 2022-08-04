import { ContainerConfig } from './container.config.interface';

export interface ServiceConfig {
  globalPrefix: string;
  host: string;
  port: number;
  name?: string;
  container?: ContainerConfig;
}
