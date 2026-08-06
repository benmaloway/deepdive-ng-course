
// This a compile time only provider not included in the final bundle. It is used to provide configuration values to the application. It is a good practice to use a compile time only provider for configuration values that are not expected to change at runtime. This allows the application to be optimized for performance and reduces the size of the final bundle. It also allows the application to be configured at build time, which can be useful for different environments (e.g. development, staging, production). The configuration values can be provided using an InjectionToken, which is a unique identifier for the configuration values. The InjectionToken can be used to inject the configuration values into components and services that need them.
import { InjectionToken } from "@angular/core";

export interface AppConfig {
  apiUrl: string;
  courseCacheSize:number;
}

export const APP_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:8080/api',
  courseCacheSize: 10
};

export const CONFIG_TOKEN = 
  new InjectionToken<AppConfig>('CONFIG_TOKEN', {
      providedIn: 'root',
      factory: () => APP_CONFIG
  });