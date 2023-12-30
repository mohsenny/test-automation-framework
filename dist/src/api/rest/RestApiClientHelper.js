"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiClientHelper = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../common/logger");
const validator_1 = require("../common/validator");
class RestApiClientHelper {
    constructor(baseURL) {
        this.client = axios_1.default.create({
            baseURL,
        });
    }
    // Set custom headers, useful for authentication tokens
    setHeaders(headers) {
        Object.assign(this.client.defaults.headers, headers);
    }
    // Send a REST API request and validate the response
    sendRequest(method, url, data, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.request({ method, url, data });
                if (schema && !(0, validator_1.validateResponse)(response.data, schema)) {
                    throw new Error("Response does not match the expected structure");
                }
                return response.data;
            }
            catch (error) {
                logger_1.logger.error({
                    message: "REST API Error",
                    error: error.toString(),
                });
                throw new Error(error.message || "Error in REST API request");
            }
        });
    }
}
exports.RestApiClientHelper = RestApiClientHelper;
