import * as rfs from 'rotating-file-stream';
import { ISettingsParam } from 'tslog';

export interface RfsSettings {
  filename: string;
  disabled?: boolean;
  options?: rfs.Options;
}

export interface TSLogOptions {
  settingsParam: ISettingsParam;
  rfsSettings?: RfsSettings;
}

export interface BannerOptions {
  preffix?: string;
  suffix?: string;
  figletOptions?: figlet.Options;
}

export interface YggLoggerService {
  banner(msg: string, options?: BannerOptions): void;
  setName(name: string): void;
}
