import { BaseEntity } from './common.interface';

export enum Role {
  ADMIN,
  PLATFORM_ADMIN,
  USER,
}

export interface UserConfigParams {
  timeZone: string;
  dateFormat: string;
}

export interface User extends BaseEntity {
  email: string;
  active: boolean;
  roles: Role[];
  configParams: UserConfigParams;
}
