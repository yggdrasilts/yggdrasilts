import { GenericContainer } from 'testcontainers';
import { StartedTestContainer } from 'testcontainers/dist/test-container';

import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContainerConfig, ContainerInfo } from '@yggdrasilts/nest-config';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

@Injectable()
export class ContainerService implements OnModuleInit, OnApplicationShutdown {
  private readonly containersConfig: ContainerConfig[];

  private readonly containers: { id: string; startedTestContainer: StartedTestContainer }[];

  constructor(private readonly logger: TSLogLoggerService, private readonly configService: ConfigService) {
    this.logger.setName('ContainerService');
    this.containersConfig = this.configService.get<ContainerConfig[]>('service.containers');
    if (!this.containersConfig || this.containersConfig.length === 0) {
      throw new Error('There is no container configuration to be used.');
    }
    this.containers = [];
  }

  async onModuleInit() {
    for (const containerConfig of this.containersConfig) {
      for (const key in containerConfig) {
        try {
          const containerInfo = containerConfig[key];
          const container = await new GenericContainer(containerInfo.image);

          this.logger.info('Initializing container...');
          if (containerInfo.ExposedPorts) {
            container.withExposedPorts(...containerInfo.ExposedPorts.ports);
          }
          if (containerInfo.NetworkMode) {
            container.withNetworkMode(containerInfo.NetworkMode.networkMode);
          }
          if (containerInfo.BindMount) {
            container.withBindMount(containerInfo.BindMount.source, containerInfo.BindMount.target, containerInfo.BindMount.bindMode);
          }
          if (containerInfo.Env) {
            for (const key in containerInfo.Env) {
              const env: { key: string; value: string } = containerInfo.Env[key];
              container.withEnv(env.key, env.value);
            }
          }

          const startedTestContainer = await container.start();

          const internalIp = startedTestContainer.getIpAddress(containerInfo.NetworkMode.networkMode);
          const ip = startedTestContainer.getHost();
          const ports = [];
          containerInfo.ExposedPorts.ports.forEach((port) => {
            if (typeof port === 'number') {
              ports.push(port);
            }
            if (typeof port === 'object') {
              ports.push(port.host);
            }
          });

          this.logger.info(`\nContainer ${key} info:
          - Container IP => ${internalIp}
          - Host IP => ${ip}
          - ports: ${ports}`);
          this.containers.push({ id: key, startedTestContainer });
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.info(`Signal ${signal} detected.`);
    for (const container of this.containers) {
      try {
        this.logger.info(`Stopping container ${container.id}...`);
        container.startedTestContainer.stop();
        this.logger.info(`Container ${container.id} stopped.`);
      } catch (error) {
        this.logger.error(`Container ${container.id} error:`, error);
      }
    }
  }

  // TBD
  private buildContainerOptions(container: GenericContainer, containerInfo: ContainerInfo) {
    const notValidKeys = ['image'];
    for (const key in containerInfo) {
      if (!notValidKeys.includes(key)) {
        const element = containerInfo[key];
      }
    }
  }
}
