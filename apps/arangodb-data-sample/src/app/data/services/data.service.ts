import { Injectable } from '@nestjs/common';
import { ArangodbService } from '@yggdrasilts/nest-data';
import { TSLogLoggerService } from '@yggdrasilts/nest-logger';

import { ComponentsCollection } from '../../arangodb/collections/components.collections';
import { ComponentsSensorsEdge } from '../../arangodb/collections/components.sensors.edge';
import { IOT_CATALOG_COLLECTION, IOT_CATALOG_DB_NAME } from '../../arangodb/contants';
import { Component } from '../../arangodb/entities';

@Injectable()
export class DataService {
  private componentsCollection: ComponentsCollection;
  private componentsSensorsEdge: ComponentsSensorsEdge;

  constructor(private readonly logger: TSLogLoggerService, private readonly arangoDBService: ArangodbService) {
    this.logger.setName('DataService');
    this.componentsCollection = this.arangoDBService.getCollection<ComponentsCollection>(
      IOT_CATALOG_DB_NAME,
      IOT_CATALOG_COLLECTION.COMPONENTS,
    );
    this.componentsSensorsEdge = this.arangoDBService.getEdge<ComponentsSensorsEdge>(
      IOT_CATALOG_DB_NAME,
      IOT_CATALOG_COLLECTION.COMPONENTS_SENSORS,
    );
  }

  public async getComponents(): Promise<Component[]> {
    this.logger.debug('getComponents');
    return await this.componentsCollection.findAll();
  }

  public async getEdges(): Promise<any[]> {
    this.logger.debug('getEdges');
    return await this.componentsSensorsEdge.findAll('components/alcobendas@openweathermap.OPENWEATHER_Alcobendas');
  }
}
