import { ComponentsCollection } from './components.collections';
import { ComponentsSensorsEdge } from './components.sensors.edge';
import { ProvidersCollection } from './providers.collections';
import { ProvidersComponentsEdge } from './providers.components.edge';
import { SensorsCollection } from './sensors.collections';

export const Store: any = {
  providers: ProvidersCollection,
  components: ComponentsCollection,
  sensors: SensorsCollection,
  providers_components: ProvidersComponentsEdge,
  components_sensors: ComponentsSensorsEdge,
};
