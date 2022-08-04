import { Database, aql } from 'arangojs';
import { AqlQuery } from 'arangojs/aql';
import { DocumentData } from 'arangojs/documents';

import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

export abstract class BaseDocumentCollection<D extends DocumentData> {
  protected logger: TSLogLoggerService;

  private db: Database;

  public collectionName: string;

  constructor(db: Database, collectionName: string, logger: TSLogLoggerService) {
    this.db = db;
    this.collectionName = collectionName;
    this.logger = logger;
  }

  public async findAll(): Promise<D[]> {
    return await this._findAll();
  }

  protected async _findAll(): Promise<D[] | null> {
    const collection = this.db.collection(this.collectionName);
    const cursor = await this.db.query(aql`FOR c IN ${collection} RETURN c`);
    return cursor.all();
  }

  protected async _findByQuery(query: AqlQuery): Promise<D[] | null> {
    this.logger.debug('FindByQuery by query:', query);
    const cursor = await this.db.query(query);
    const data: D[] = await cursor.all();

    if (data) {
      this.logger.trace('Data found:', data);
      return data;
    }
    return null;
  }
}
