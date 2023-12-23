import { GraphqlTestsConfig } from "./types";

let config: GraphqlTestsConfig | undefined = undefined;

export function initialize(configuration: GraphqlTestsConfig): void {
  if (config) {
    throw new Error("Configuration is already set.");
  }
  config = configuration;
}
