import { expect } from 'chai';
import { GraphQLClientHelper } from '../../../src/api-graphql/GraphQLClientHelper';
import { CountriesData, CountryData } from '../../../src/types/graphqlTypes';
import { sampleQueries, sampleVariables } from './testData/GraphQLTestExample.testdata';
import { graphqlTestsConfig } from '../../../src/api-graphql/config/example.config'; // Point this yo your own local config

describe('GraphQL Country API Tests', () => {
  const client = new GraphQLClientHelper(graphqlTestsConfig.apiUrl);

  before(() => {
    client.setHeaders({ Authorization: `Bearer ${graphqlTestsConfig.apiKey}` });
  });

  it('should fetch countries data correctly', async () => {
    const data = await client.sendQuery<CountriesData>(sampleQueries.getCountries);
    expect(data.countries).to.be.an('array');
    expect(data.countries.length).to.be.greaterThan(0);
  });

  it('should fetch a specific country', async () => {
    const data: CountryData = await client.sendQuery(
      sampleQueries.getCountry,
      sampleVariables.countryVariables
    );
    expect(data.country).to.be.an('object');
    expect(data.country.name).to.equal('Brazil');
  });

  it('should handle errors gracefully', async () => {
    try {
      await client.sendQuery(sampleQueries.invalidQuery);
      throw new Error('Expected an error but none was thrown');
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect((error as Error).message).to.include('GraphQL request failed');
    }
  });
});
