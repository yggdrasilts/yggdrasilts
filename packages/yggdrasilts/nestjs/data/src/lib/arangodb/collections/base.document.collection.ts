import { Database } from 'arangojs';
import { CollectionBatchReadOptions } from 'arangojs/collection';
import { DocumentData, ObjectWithKey } from 'arangojs/documents';

import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

import { BaseDocument } from './base.document';

export abstract class BaseDocumentCollection<D extends DocumentData> extends BaseDocument<D> {
  constructor(db: Database, collectionName: string, logger: TSLogLoggerService) {
    super(db, collectionName, logger);
    this.collection = db.collection(collectionName);
  }

  public async findAll(): Promise<D[]> {
    return await this._findAll();
  }

  public async find(selectors: (string | ObjectWithKey)[], options?: CollectionBatchReadOptions): Promise<D[]> {
    return await this.collection.documents(selectors, options);
  }
}
