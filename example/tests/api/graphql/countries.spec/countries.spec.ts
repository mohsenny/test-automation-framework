import { expect } from "chai";
import { GraphQLClientHelper } from "../../../../../src/api/graphql/GraphQLClientHelper";
import { CountryData, CountriesData } from "../../types/requestTypes";
import { sampleQueries, sampleVariables } from "../../types/requestTypes";
import { apiTestsConfig } from "../../config/example.config";
import {
  countriesResponseSchema,
  countryResponseSchema,
} from "../../types/responseTypes";

describe("GraphQL Country API Tests", () => {  
  const graphqlApiUrl = apiTestsConfig.graphqlApiUrl;
  if (!graphqlApiUrl) {
    throw new Error("GraphQL API URL is not defined in the configuration.");
  }
  const client = new GraphQLClientHelper(graphqlApiUrl);

  before(() => {
    client.setHeaders({
      Authorization: `Bearer ${apiTestsConfig.apiKey}`,
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
