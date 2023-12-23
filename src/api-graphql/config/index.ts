// index.ts
import { PackageConfig } from './types';

let config: PackageConfig | undefined = undefined;

export function initialize(configuration: PackageConfig): void {
  if (config) {
    throw new Error('Configuration is already set.');
  }
  config = configuration;
}

export function getConfig(): PackageConfig | undefined {
  return config;
}
