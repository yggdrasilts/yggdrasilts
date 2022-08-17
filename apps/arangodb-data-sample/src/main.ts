import { YggNestBoot } from '@yggdrasilts/nest-boot';

import { ArangodbDataSampleModule } from './arangodb.data.sample.module';

YggNestBoot.bootstrapService(ArangodbDataSampleModule);
