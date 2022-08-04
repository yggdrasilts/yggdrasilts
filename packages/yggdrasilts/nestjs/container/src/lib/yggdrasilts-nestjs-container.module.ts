import { Module } from '@nestjs/common';

import { ContainerService } from './container.service';

@Module({
  controllers: [],
  providers: [ContainerService],
  exports: [ContainerService],
})
export class YggNestContainerModule {}
