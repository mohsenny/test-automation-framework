"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonResponse = exports.handleResponseError = exports.defaultHeader = exports.getEnvVariable = exports.defaultOptions = void 0;
// Default configuration for running Performance tests
var configure_js_1 = require("../../src/perfomrance/config/configure.js");
Object.defineProperty(exports, "defaultOptions", { enumerable: true, get: function () { return configure_js_1.defaultOptions; } });
Object.defineProperty(exports, "getEnvVariable", { enumerable: true, get: function () { return configure_js_1.getEnvVariable; } });
// Certain utility function related to http requests 
var http_js_1 = require("../../src/utils/http.js");
Object.defineProperty(exports, "defaultHeader", { enumerable: true, get: function () { return http_js_1.defaultHeader; } });
Object.defineProperty(exports, "handleResponseError", { enumerable: true, get: function () { return http_js_1.handleResponseError; } });
Object.defineProperty(exports, "parseJsonResponse", { enumerable: true, get: function () { return http_js_1.parseJsonResponse; } });
