import { Database } from 'arangojs';

import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

export abstract class BaseDocument {
  protected logger: TSLogLoggerService;

  protected db: Database;

  public collectionName: string;

  constructor(db: Database, collectionName: string, logger: TSLogLoggerService) {
    this.db = db;
    this.collectionName = collectionName;
    this.logger = logger;
  }
}
