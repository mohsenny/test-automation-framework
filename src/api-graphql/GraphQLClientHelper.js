"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClientHelper = void 0;
// src/graphql/GraphQLClientHelper.ts
const graphql_request_1 = require("graphql-request");
class GraphQLClientHelper {
    static createClient(endpoint) {
        return new graphql_request_1.GraphQLClient(endpoint);
    }
}
exports.GraphQLClientHelper = GraphQLClientHelper;
