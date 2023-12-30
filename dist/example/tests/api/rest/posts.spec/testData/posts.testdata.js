"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResponseSchema = exports.postEndpoints = void 0;
exports.postEndpoints = {
    getPosts: '/posts',
    getPost: '/posts/1', // Example endpoint to fetch a specific post
    invalidEndpoint: '/invalidEndpoint', // Example of an invalid endpoint
};
exports.postResponseSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            userId: { type: "number" },
            id: { type: "number" },
            title: { type: "string" },
            body: { type: "string" },
        },
        required: ["userId", "id", "title", "body"],
    },
};
