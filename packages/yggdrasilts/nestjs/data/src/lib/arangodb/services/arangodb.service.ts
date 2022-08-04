import { Database } from 'arangojs';
import { Config } from 'arangojs/connection';
import { VersionInfo } from 'arangojs/database';
import { isArangoError, isSystemError } from 'arangojs/error';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

import { IConfigDatabase, IDatabase, IDatabaseInstance } from '../../common/database.interface';
import { ARANGODB_STORE } from '../../utils/constants';
import { ArangoDBException } from '../exceptions';

@Injectable()
export class ArangodbService implements OnModuleInit {
  public static readonly NAME = 'ArangodbService';

  private readonly arangodbUrl: string;

  private readonly databaseConfig: IDatabase;

  private readonly _systemDBInstance: Database;

  private readonly dbInstances: IDatabaseInstance<unknown>[] = [];

  constructor(
    @Inject(ARANGODB_STORE) private readonly store: any,
    private readonly configService: ConfigService,
    private readonly logger: TSLogLoggerService,
  ) {
    this.logger.setName(ArangodbService.NAME);
    this.databaseConfig = this.configService.get<IDatabase>('database.arangodb');
    this.logger.debug('Configure ArangodbService:', this.databaseConfig);
    this.arangodbUrl = `http://${this.databaseConfig.host}:${this.databaseConfig.port}`;
    this._systemDBInstance = new Database({
      url: this.arangodbUrl,
      databaseName: '_system',
      auth: {
        username: this.databaseConfig.user,
        password: this.databaseConfig.password,
      },
    });
    if (this.databaseConfig.databases) {
      this.dbInstances = [];
      for (const db of this.databaseConfig.databases) {
        const databaseName = typeof db === 'string' ? db : db.name;
        const collections = typeof db === 'string' ? [] : db.collections;
        const dbData: Config = {
          url: this.arangodbUrl,
          databaseName: databaseName,
          auth: {
            username: (db as IConfigDatabase).user ? (db as IConfigDatabase).user : this.databaseConfig.user,
            password: (db as IConfigDatabase).password ? (db as IConfigDatabase).password : this.databaseConfig.password,
          },
        };
        const innerDb = new Database(dbData);
        const instanceData = {
          name: databaseName,
          db: innerDb,
          collections: collections.map((c) => {
            let col;
            if (typeof c === 'string') {
              if (this.store[c] === undefined || this.store[c] === null) {
                throw new Error(`Class type of '${c}' is not in the store`);
              }
              col = new this.store[c](innerDb, c, this.logger);
              this.logger.info(`${this.store[c].name} has been loaded.`);
            }
            return col;
          }),
        };
        this.dbInstances.push(instanceData);
      }
    }
    this.logger.debug('ArangodbService constructor finished.');
  }

  async onModuleInit(): Promise<void> {
    this.logger.debug('onModuleInit start...');
    let arangodbVersion: VersionInfo;
    try {
      arangodbVersion = await this._systemDBInstance.version();
      this.logger.info('Connected to:', arangodbVersion);
      for (const dbInstance of this.dbInstances) {
        this.logger.info('Trying to connect to db', dbInstance.name);
        await dbInstance.db.version();
        this.logger.info('Connected to', dbInstance.name);
      }
    } catch (error) {
      if (isArangoError(error) || isSystemError(error)) {
        this.logger.error(error.message);
        throw new ArangoDBException(error.message, { arangoDBError: error });
      } else {
        this.logger.error('Not controlled error.', error);
      }
    }
  }

  public getCollection<C>(dbName: string, collectionName: string): C {
    return this.dbInstances.find((i) => i.name === dbName).collections.find((c) => c.collectionName === collectionName) as any;
  }
}
