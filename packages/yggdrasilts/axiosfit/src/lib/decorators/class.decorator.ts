import { AxiosfitConfig } from '../interfaces';
import { createServiceMap, serviceMap } from './utilities';

const defaultAxiosfitConfig: AxiosfitConfig = {
  usePromises: false,
};

/**
 * Class decorator.
 * Indicates that this class is an Axiosfit service.
 *
 * @param {string} [endpointPath] Optional. Common endpoint for all the methods inside the class.
 */
export function HTTP(endpointPath?: string | AxiosfitConfig, axiosfitConfig?: AxiosfitConfig) {
  return (constructor) => {
    const serviceName = constructor.serviceName || constructor.name;
    const ep = endpointPath && typeof endpointPath === 'string' ? endpointPath : '';
    if (typeof endpointPath === 'object') {
      axiosfitConfig = endpointPath;
    }
    if (!serviceMap[serviceName]) {
      createServiceMap(constructor);
    }
    serviceMap[serviceName].setBaseServiceEndpoint(ep);
    serviceMap[serviceName].setAxiosfitConfig(axiosfitConfig || defaultAxiosfitConfig);
  };
}

/**
 * Class decorator.
 * Decorator to be used to add a global request interceptor.
 *
 * @param {(AxiosfitInterceptor | AxiosfitRequestInterceptor | AxiosfitResponseInterceptor)[]} interceptors The interceptors.
 */
export function Interceptors(...interceptors: any[]) {
  return (constructor) => {
    // TODO: Ensure interceptors are one of them
    const serviceName = constructor.serviceName || constructor.name;
    if (!serviceMap[serviceName]) {
      createServiceMap(constructor);
    }
    serviceMap[serviceName].setGlobalInterceptors(interceptors);
  };
}
