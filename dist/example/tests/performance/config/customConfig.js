"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customOptions = void 0;
const configure_js_1 = require("../../../../src/perfomrance/config/configure.js"); // Import from the package
exports.customOptions = Object.assign(Object.assign({}, configure_js_1.defaultOptions), { host: (0, configure_js_1.getEnvVariable)("MY_HOSTNAME"), runType: (0, configure_js_1.getEnvVariable)("RUN_TYPE"), account: Object.assign(Object.assign({}, configure_js_1.defaultOptions.account), { email: "custom@example.com" }) });
