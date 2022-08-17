import { BaseEntity } from './common.interface';

export interface Provider extends BaseEntity {
  authorizationToken: string;
  forceHttps: boolean;
  inputQuota: number;
  outputQuota: number;
  contactName: string;
  contactEmail: string;
}
