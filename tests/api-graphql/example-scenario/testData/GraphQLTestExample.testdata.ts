export const sampleQueries = {
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
  
export const sampleVariables = {
    countryVariables: { code: 'BR' },
};
  