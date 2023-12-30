"use strict";
// GRAPHQL API Types and Schemas
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResponseSchema = exports.postsResponseSchema = exports.countryResponseSchema = exports.countriesResponseSchema = void 0;
exports.countriesResponseSchema = {
    type: "object",
    properties: {
        countries: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    code: { type: "string" },
                    name: { type: "string" },
                },
                required: ["code", "name"],
            },
        },
    },
    required: ["countries"],
};
exports.countryResponseSchema = {
    type: "object",
    properties: {
        country: {
            type: "object",
            properties: {
                name: { type: "string" },
            },
            required: ["name"],
        },
    },
    required: ["country"],
};
// REST API Types and Schemas
exports.postsResponseSchema = {
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
// Single Post Response Schema
exports.postResponseSchema = {
    type: "object",
    properties: {
        userId: { type: "number" },
        id: { type: "number" },
        title: { type: "string" },
        body: { type: "string" },
    },
    required: ["userId", "id", "title", "body"],
};
