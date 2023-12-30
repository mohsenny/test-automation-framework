"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.initialize = void 0;
let config = undefined;
function initialize(configuration) {
    if (config) {
        throw new Error("Configuration is already set.");
    }
    config = configuration;
}
exports.initialize = initialize;
// Function to get the current configuration
function getConfig() {
    if (!config) {
        throw new Error("Configuration has not been initialized.");
    }
    return config;
}
exports.getConfig = getConfig;
