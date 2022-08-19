import { DocumentMetadata, EdgeMetadata } from 'arangojs/documents';

import { BaseDocumentEdge } from '@yggdrasilts/nest-data';

export type ComponentSensorType = DocumentMetadata & EdgeMetadata;

export class ComponentsSensorsEdge extends BaseDocumentEdge<ComponentSensorType> {}
