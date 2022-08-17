import { BaseDocumentCollection } from '@yggdrasilts/nest-data';

import { Sensor } from '../entities';

export class SensorsCollection extends BaseDocumentCollection<Sensor> {}
