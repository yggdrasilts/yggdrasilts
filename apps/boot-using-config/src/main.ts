import { YggNestBoot } from '@yggdrasilts/nest-boot';

import { AppModule } from './app/app.module';

YggNestBoot.bootstrapService(AppModule);
