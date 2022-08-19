import { Database } from 'arangojs';
import { DocumentSelector, EdgeData } from 'arangojs/documents';

import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

import { BaseDocument } from './base.document';

export abstract class BaseDocumentEdge<D extends EdgeData> extends BaseDocument<D> {
  constructor(db: Database, collectionName: string, logger: TSLogLoggerService) {
    super(db, collectionName, logger);
    this.collection = db.collection(collectionName);
  }

  public async findAll(): Promise<D[]> {
    return await this._findAll();
  }

  public async find(selector: DocumentSelector): Promise<D[]> {
    const data = await this.collection.edges(selector);
    return data.edges;
  }
}
