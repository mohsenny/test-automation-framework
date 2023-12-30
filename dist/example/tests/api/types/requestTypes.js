"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleVariables = exports.sampleQueries = void 0;
exports.sampleQueries = {
    getCountries: `
          query {
          countries {
              code
              name
          }
          }
      `,
    getCountry: `
          query getCountry($code: ID!) {
          country(code: $code) {
              code
              name
              native
              capital
              currency
          }
          }
      `,
    invalidQuery: `query { invalidField }`,
};
exports.sampleVariables = {
    countryVariables: { code: "BR" },
};
