import { Database, aql } from 'arangojs';
import { AqlQuery } from 'arangojs/aql';
import { DocumentCollection, EdgeCollection } from 'arangojs/collection';

import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

export abstract class BaseDocument<D> {
  protected logger: TSLogLoggerService;

  protected db: Database;
  protected collection: DocumentCollection<D> & EdgeCollection<D>;

  public collectionName: string;

  constructor(db: Database, collectionName: string, logger: TSLogLoggerService) {
    this.db = db;
    this.collectionName = collectionName;
    this.logger = logger;
  }

  protected async _findAll(): Promise<D[] | null> {
    const cursor = await this.db.query(aql`FOR d IN ${this.collection} RETURN d`);
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
