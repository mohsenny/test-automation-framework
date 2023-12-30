export type Country = {
  code: string;
  name: string;
};

export type CountryData = {
  country: Country;
};

export type CountriesData = {
  countries: Country[];
};

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

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
  countryVariables: { code: "BR" },
};
