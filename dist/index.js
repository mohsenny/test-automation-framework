"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.parseJsonResponse = exports.handleResponseError = exports.defaultHeader = exports.getEnvVariable = exports.defaultOptions = exports.GraphQLClientHelper = exports.BasePageProvider = exports.BasePage = void 0;
// BasePage for e2e tests Page Object Model approach
var BasePage_1 = require("./src/e2e/pages/BasePage");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return BasePage_1.BasePage; } });
// BasePageProvider for e2e tests Page Object Model approach to return all page objects
var BasePageProvider_1 = require("./src/e2e/pages/BasePageProvider");
Object.defineProperty(exports, "BasePageProvider", { enumerable: true, get: function () { return BasePageProvider_1.BasePageProvider; } });
// A GraphQL client helper for GraphQL API testse
var GraphQLClientHelper_1 = require("./src/api-graphql/GraphQLClientHelper");
Object.defineProperty(exports, "GraphQLClientHelper", { enumerable: true, get: function () { return GraphQLClientHelper_1.GraphQLClientHelper; } });
// Default configuration for running Performance tests
var configure_1 = require("./src/perfomrance/config/configure");
Object.defineProperty(exports, "defaultOptions", { enumerable: true, get: function () { return configure_1.defaultOptions; } });
Object.defineProperty(exports, "getEnvVariable", { enumerable: true, get: function () { return configure_1.getEnvVariable; } });
// Certain utility function related to http requests 
var http_1 = require("./src/utils/http");
Object.defineProperty(exports, "defaultHeader", { enumerable: true, get: function () { return http_1.defaultHeader; } });
Object.defineProperty(exports, "handleResponseError", { enumerable: true, get: function () { return http_1.handleResponseError; } });
Object.defineProperty(exports, "parseJsonResponse", { enumerable: true, get: function () { return http_1.parseJsonResponse; } });
// Universal logger
var logger_1 = require("./src/utils/logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.logger; } });
