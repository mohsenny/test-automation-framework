"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSlackReport = exports.sendSlackStartedMessage = void 0;
const http_1 = __importDefault(require("k6/http"));
const configure_1 = require("../perfomrance/config/configure");
const sendSlackStartedMessage = (testName) => {
    http_1.default.post("https://hooks.slack.com/workflows/xxxx", JSON.stringify({
        host: configure_1.defaultOptions.host,
        testName: testName,
    }), {
        headers: { "Content-Type": "application/json" },
    });
};
exports.sendSlackStartedMessage = sendSlackStartedMessage;
const sendSlackReport = (data, testName) => {
    const maxThroughput = `${data.metrics.http_reqs.values["count"].toFixed(2)} rps`;
    const avgResponseTime = `${data.metrics.http_req_duration.values["avg"].toFixed(2)} ms`;
    const ninetyFifthResponseTime = `${data.metrics.http_req_duration.values["p(95)"].toFixed(2)} ms`;
    // const vus = `${data.metrics.vus.values['value']}`;
    http_1.default.post("https://hooks.slack.com/workflows/xxxx", JSON.stringify({
        host: configure_1.defaultOptions.host,
        testName: testName,
        maxThroughput: maxThroughput,
        avgResponseTime: avgResponseTime,
        ninetyFifthResponseTime: ninetyFifthResponseTime,
        // vus: vus,
    }), {
        headers: { "Content-Type": "application/json" },
    });
};
exports.sendSlackReport = sendSlackReport;
