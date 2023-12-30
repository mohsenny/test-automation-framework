// GRAPHQL API Types and Schemas

export const countriesResponseSchema = {
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

export const countryResponseSchema = {
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
export const postsResponseSchema = {
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
export const postResponseSchema = {
  type: "object",
  properties: {
    userId: { type: "number" },
    id: { type: "number" },
    title: { type: "string" },
    body: { type: "string" },
  },
  required: ["userId", "id", "title", "body"],
};