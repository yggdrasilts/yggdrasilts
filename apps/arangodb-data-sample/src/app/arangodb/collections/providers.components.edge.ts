import { DocumentMetadata, EdgeMetadata } from 'arangojs/documents';

import { BaseDocumentEdge } from '@yggdrasilts/nest-data';

export type ProviderComponentType = DocumentMetadata & EdgeMetadata;

export class ProvidersComponentsEdge extends BaseDocumentEdge<ProviderComponentType> {}
