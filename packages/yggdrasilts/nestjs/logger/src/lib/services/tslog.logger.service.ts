import * as fs from 'fs';
import { join } from 'path';

import * as _ from 'lodash';
import * as rfs from 'rotating-file-stream';
import { ILogObject, ISettingsParam, Logger } from 'tslog';

import { Inject, Injectable, LoggerService, Optional, Scope } from '@nestjs/common';

import { BannerOptions, RfsSettings, YggLoggerService } from '../logger.interface';
import { LoggerUtils } from '../utils/utils.logger.service';

export const SETTINGS_PARAM = 'SETTINGS_PARAM';
export const RFS_SETTINGS = 'RFS_SETTINGS';

@Injectable({ scope: Scope.TRANSIENT })
export class TSLogLoggerService extends Logger implements LoggerService, YggLoggerService {
  private readonly loggerUtils = new LoggerUtils();

  private dir = 'logs';
  private logFileStream: fs.WriteStream | rfs.RotatingFileStream;

  constructor(@Inject(SETTINGS_PARAM) @Optional() settings: ISettingsParam, @Inject(RFS_SETTINGS) @Optional() rfsSettings?: RfsSettings) {
    super({
      displayLoggerName: true,
      displayFilePath: 'hidden',
      minLevel: 'debug',
      ...settings,
    });
    console.log('rfsSettings', rfsSettings);
    if (_.isNil(rfsSettings)) {
      rfsSettings = { filename: 'YggAPI.log', disable: false };
    } else if (_.isNil(rfsSettings?.disable)) {
      rfsSettings = { ...rfsSettings, disable: false };
    }
    if (rfsSettings?.options?.path) {
      this.dir = rfsSettings.options.path;
    }
    this._ensureDir(this.dir);
    if (!rfsSettings?.disable) {
      this.info('Using RFS Stream.');
      this.logFileStream = rfs.createStream(rfsSettings?.filename || 'YggAPI.log', {
        size: '1K',
        interval: '1d',
        maxFiles: 30,
        compress: 'gzip',
        ...rfsSettings?.options,
        path: this.dir,
      });
    } else {
      this.info('Using File Stream.');
      this.logFileStream = fs.createWriteStream(join(this.dir, rfsSettings?.filename || 'YggAPI.log'));
    }
    // TODO: Create a http transport to store the log in a centralized place
    this.attachTransport(
      {
        silly: this._logToTransport.bind(this),
        debug: this._logToTransport.bind(this),
        trace: this._logToTransport.bind(this),
        info: this._logToTransport.bind(this),
        warn: this._logToTransport.bind(this),
        error: this._logToTransport.bind(this),
        fatal: this._logToTransport.bind(this),
      },
      'debug',
    );
  }

  log(message: any, context?: string) {
    this.info(message, context);
  }

  public setName(name: string) {
    this.setSettings({ ...super.settings, name });
  }

  public banner(msg: string, options?: BannerOptions): void {
    this.info(this.loggerUtils.banner(msg, options));
  }

  private _logToTransport(logObject: ILogObject): void {
    this.logFileStream.write(JSON.stringify(logObject) + '\n');
  }

  private _ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
}
