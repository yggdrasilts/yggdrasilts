import { Readable } from 'stream';

import { PullPolicy } from 'testcontainers';
import { BindMode, Command, Dir, EnvKey, EnvValue, ExtraHost, NetworkMode, TmpFs } from 'testcontainers/dist/docker/types';
import { PortWithOptionalBinding } from 'testcontainers/dist/port';
import { WaitStrategy } from 'testcontainers/dist/wait-strategy';

export interface ContainerInfo {
  image: string;
  Env?: { key: EnvKey; value: EnvValue };
  Cmd?: { cmd: Command[] };
  TmpFs?: { tmpFs: TmpFs };
  ExposedPorts?: { ports: PortWithOptionalBinding[] };
  BindMount?: { source: Dir; target: Dir; bindMode: BindMode };
  WaitStrategy?: { waitStrategy: WaitStrategy };
  StartupTimeout?: { startupTimeout: number };
  NetworkMode?: { networkMode: NetworkMode };
  ExtraHosts?: { extraHosts: ExtraHost[] };
  User?: { user: string };
  PullPolicy?: { pullPolicy: PullPolicy };
  CopyFileToContainer?: { sourcePath: string; containerPath: string };
  CopyContentToContainer?: { content: string | Buffer | Readable; containerPath: string };
}

export interface ContainerConfig {
  [key: string]: ContainerInfo;
}
