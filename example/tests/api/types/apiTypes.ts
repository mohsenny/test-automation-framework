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

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}