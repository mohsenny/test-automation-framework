"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonResponse = exports.handleResponseError = exports.authHeader = exports.defaultHeader = void 0;
exports.defaultHeader = {
    "content-type": "application/json",
};
function authHeader(token) {
    return {
        "content-type": "application/json",
        // 'authorization': `Bearer ${token}`
    };
}
exports.authHeader = authHeader;
// Utility function for error handling
function handleResponseError(response) {
    console.error(`Unexpected status: ${response.status}`);
    console.error(`Response body: ${response.body}`);
}
exports.handleResponseError = handleResponseError;
// Utility function for parsing JSON response
function parseJsonResponse(responseBody) {
    if (typeof responseBody !== 'string') {
        console.error("Response body is not a string");
        return null;
    }
    try {
        return JSON.parse(responseBody);
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(`Error parsing JSON: ${e.message}`);
        }
        else {
            console.error(`An unknown error occurred: ${e}`);
        }
        return null;
    }
}
exports.parseJsonResponse = parseJsonResponse;
