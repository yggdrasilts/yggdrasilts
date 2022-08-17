import { AqlQuery } from 'arangojs/aql';
import { DocumentSelector, EdgeData } from 'arangojs/documents';

import { BaseDocument } from './base.document';

export abstract class BaseDocumentEdge<D extends EdgeData> extends BaseDocument {
  public async findAll(selector: DocumentSelector): Promise<D[]> {
    return await this._findAll(selector);
  }

  protected async _findAll(selector: DocumentSelector): Promise<D[] | null> {
    const collection = this.db.collection(this.collectionName);
    const data = await collection.edges(selector);
    return data.edges;
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
