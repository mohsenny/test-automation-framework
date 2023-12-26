"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = exports.getEnvVariable = void 0;
function getEnvVariable(varName, defaultValue = undefined) {
    const envSource = typeof __ENV !== "undefined" ? __ENV : process.env;
    if (typeof envSource[varName] === "undefined") {
        if (defaultValue === undefined) {
            throw new Error(`Environment variable ${varName} is required. Please check the documentation.`);
        }
        return defaultValue;
    }
    return envSource[varName];
}
exports.getEnvVariable = getEnvVariable;
exports.defaultOptions = {
    projectId: getEnvVariable("PROJECT_ID", 1), // Default value can be provided
    host: getEnvVariable("MY_HOSTNAME"),
    runType: getEnvVariable("RUN_TYPE"),
    account: {
        email: getEnvVariable("ACCOUNT_EMAIL", "sample"),
        password: getEnvVariable("ACCOUNT_PASSWORD", "sample"),
        // Add other configurable options here
    },
    // Add more default configuration options here
};
