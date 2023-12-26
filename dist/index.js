"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.parseJsonResponse = exports.handleResponseError = exports.defaultHeader = exports.getEnvVariable = exports.defaultOptions = exports.GraphQLClientHelper = exports.BasePageProvider = exports.BasePage = void 0;
// BasePage for e2e tests Page Object Model approach
var BasePage_js_1 = require("./src/e2e/pages/BasePage.js");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return BasePage_js_1.BasePage; } });
// BasePageProvider for e2e tests Page Object Model approach to return all page objects
var BasePageProvider_js_1 = require("./src/e2e/pages/BasePageProvider.js");
Object.defineProperty(exports, "BasePageProvider", { enumerable: true, get: function () { return BasePageProvider_js_1.BasePageProvider; } });
// A GraphQL client helper for GraphQL API testse
var GraphQLClientHelper_js_1 = require("./src/api-graphql/GraphQLClientHelper.js");
Object.defineProperty(exports, "GraphQLClientHelper", { enumerable: true, get: function () { return GraphQLClientHelper_js_1.GraphQLClientHelper; } });
// Default configuration for running Performance tests
var configure_js_1 = require("./src/perfomrance/config/configure.js");
Object.defineProperty(exports, "defaultOptions", { enumerable: true, get: function () { return configure_js_1.defaultOptions; } });
Object.defineProperty(exports, "getEnvVariable", { enumerable: true, get: function () { return configure_js_1.getEnvVariable; } });
// Certain utility function related to http requests 
var http_js_1 = require("./src/utils/http.js");
Object.defineProperty(exports, "defaultHeader", { enumerable: true, get: function () { return http_js_1.defaultHeader; } });
Object.defineProperty(exports, "handleResponseError", { enumerable: true, get: function () { return http_js_1.handleResponseError; } });
Object.defineProperty(exports, "parseJsonResponse", { enumerable: true, get: function () { return http_js_1.parseJsonResponse; } });
// Universal logger
var logger_js_1 = require("./src/utils/logger.js");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_js_1.logger; } });
