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
class GraphQLClientHelper {
    constructor(endpoint) {
        this.client = new graphql_request_1.GraphQLClient(endpoint);
    }
    // Set custom headers, useful for authentication tokens
    setHeaders(headers) {
        this.client.setHeaders(headers);
    }
    // Send a GraphQL query or mutation
    sendQuery(query, variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.request(query, variables); // Specify the expected response type
            }
            catch (error) {
                if (error instanceof graphql_request_1.ClientError) {
                    // Custom error handling: log details and rethrow
                    console.error("GraphQL Error:", error.response.errors);
                    console.error("Query:", error.request.query);
                    throw new Error("GraphQL request failed");
                }
                throw error;
            }
        });
    }
}
exports.GraphQLClientHelper = GraphQLClientHelper;
