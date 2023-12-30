import { ApiTestsConfig } from "./types";

let config: ApiTestsConfig | undefined = undefined;

export function initialize(configuration: ApiTestsConfig): void {
  if (config) {
    throw new Error("Configuration is already set.");
  }
  config = configuration;
}

// Function to get the current configuration
export function getConfig(): ApiTestsConfig {
  if (!config) {
    throw new Error("Configuration has not been initialized.");
  }
  return config;
}
