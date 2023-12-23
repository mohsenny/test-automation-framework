// In your test file

import { expect } from "chai";
import { GraphQLClientHelper } from "../../../../src/api-graphql/GraphQLClientHelper";
import { CountryData, CountriesData } from "../types/graphqlTypes";
import {
  sampleQueries,
  sampleVariables,
} from "./testData/GraphQLTestExample.testdata";
import { graphqlTestsConfig } from "../../../../src/api-graphql/config/example.config";
import {
  countriesResponseSchema,
  countryResponseSchema,
} from "../types/schemas";

describe("GraphQL Country API Tests", () => {
  const client = new GraphQLClientHelper(graphqlTestsConfig.apiUrl);

  before(() => {
    client.setHeaders({
      Authorization: `Bearer ${graphqlTestsConfig.apiKey}`,
    });
  });

  it("should fetch countries data correctly", async () => {
    const data = await client.sendQuery<CountriesData>(
      sampleQueries.getCountries,
      undefined,
      countriesResponseSchema,
    );
    expect(data.countries).to.be.an("array");
    expect(data.countries.length).to.be.greaterThan(0);
  });

  it("should fetch a specific country", async () => {
    const data = await client.sendQuery<CountryData>(
      sampleQueries.getCountry,
      sampleVariables.countryVariables,
      countryResponseSchema,
    );
    expect(data.country).to.be.an("object");
    expect(data.country.name).to.equal("Brazil");
  });

  it("should handle errors gracefully", async () => {
    try {
      await client.sendQuery(sampleQueries.invalidQuery, undefined, null); // No schema needed for invalid queries
      throw new Error("Expected an error but none was thrown");
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      // Check for a part of the error message that is consistent across all GraphQL errors
      expect((error as Error).message).to.include("Cannot query field");
    }
  });
});
