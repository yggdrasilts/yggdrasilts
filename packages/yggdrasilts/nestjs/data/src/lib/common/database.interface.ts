import { CollectionType, Database } from 'arangojs';
import { DocumentData } from 'arangojs/documents';

import { BaseDocumentCollection, BaseDocumentEdge } from '../arangodb/collections';

export interface IDatabaseInstance<D extends DocumentData> {
  name: string;
  db: Database;
  collections?: BaseDocumentCollection<D>[];
  edges?: BaseDocumentEdge<D>[];
}

export interface IConfigDatabase {
  name: string;
  user?: string;
  password?: string;
  collections?: string[] | IConfigCollection[];
}

export interface IConfigCollection {
  name: string;
  type?: CollectionType;
}

export interface IDatabase {
  host: string;
  port: number;
  databases?: string[] | IConfigDatabase[];
  user?: string;
  password?: string;
}
