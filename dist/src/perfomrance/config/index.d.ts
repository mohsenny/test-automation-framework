import * as configuration from "./configure";
import { Endpoints } from "../types/EndpointsInterface";
export declare function initializeConfiguration(consumerEndpoints: Endpoints): {
    configuration: typeof configuration;
    endpoints: Endpoints;
};
