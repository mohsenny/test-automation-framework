// tests/GraphQLTestExample.ts
import { expect } from 'chai';
import { GraphQLClientHelper } from '../../src/api-graphql/GraphQLClientHelper';
import { CountriesData } from '../../src/types/graphqlTypes';

describe('GraphQL API Tests', () => {
  const client = GraphQLClientHelper.createClient('https://countries.trevorblades.com/');

  it('should fetch countries data correctly', async () => {
    const query = `
      query {
        countries {
          code
          name
        }
      }
    `;
    const data = await client.request<CountriesData>(query);
    expect(data.countries).to.be.an('array');
    // Additional assertions as needed
  });

});
