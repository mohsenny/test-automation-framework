// src/graphql/GraphQLClientHelper.ts
import { GraphQLClient } from 'graphql-request';

export class GraphQLClientHelper {
  static createClient(endpoint: string): GraphQLClient {
    return new GraphQLClient(endpoint);
  }
}
