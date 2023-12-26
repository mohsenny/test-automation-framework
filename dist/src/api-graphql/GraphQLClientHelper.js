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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClientHelper = void 0;
const graphql_request_1 = require("graphql-request");
const logger_1 = require("../utils/logger");
const validator_1 = require("../utils/validator");
class GraphQLClientHelper {
    constructor(endpoint) {
        this.client = new graphql_request_1.GraphQLClient(endpoint);
    }
    // Set custom headers, useful for authentication tokens
    setHeaders(headers) {
        this.client.setHeaders(headers);
    }
    // Send a GraphQL query or mutation, and validates the response against the schema
    sendQuery(query, variables, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.request(query, variables);
            const start = performance.now();
            try {
                const response = yield this.client.request(query, variables);
                const end = performance.now();
                const duration = end - start;
                // Log request details and performance metrics
                logger_1.logger.info({
                    message: "GraphQL Request",
                    query,
                    variables,
                    duration,
                });
                if (schema && !(0, validator_1.validateResponse)(response, schema)) {
                    console.error("Failed validation response:", response);
                    throw new Error("Response does not match the expected structure");
                }
                return response;
            }
            catch (error) {
                if (error instanceof graphql_request_1.ClientError) {
                    logger_1.logger.error({
                        message: "GraphQL Error",
                        error: error.toString(),
                    });
                    throw new Error("GraphQL request failed: " + error.toString());
                }
                throw error;
            }
        });
    }
}
exports.GraphQLClientHelper = GraphQLClientHelper;
