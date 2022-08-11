import { ServiceConfig } from '@yggdrasilts/nest-config';

export const SERVICE = 'service';

export interface BootServiceConfig extends ServiceConfig {
  message: string;
  apiKey: string;
}
