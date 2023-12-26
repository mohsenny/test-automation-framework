import * as configuration from "./configure";
import { Endpoints } from "../types/EndpointsInterface";

// Function to initialize and combine performance tests configuration with consumer's endpoints
export function initializeConfiguration(consumerEndpoints: Endpoints) {
  return {
    configuration,
    endpoints: consumerEndpoints,
  };
}
