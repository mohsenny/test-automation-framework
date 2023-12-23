"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryResponseSchema = exports.countriesResponseSchema = void 0;
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
        // Add other expected properties of a country here...
      },
      required: ["name"], // Include all required properties
    },
  },
  required: ["country"],
};
