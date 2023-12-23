import { GraphQLClient, ClientError } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/src/types';

export class GraphQLClientHelper {
  private client: GraphQLClient;

  constructor(endpoint: string) {
    this.client = new GraphQLClient(endpoint);
  }

  // Set custom headers, useful for authentication tokens
  setHeaders(headers: GraphQLClientRequestHeaders) {
    this.client.setHeaders(headers);
  }

  // Send a GraphQL query or mutation
  async sendQuery<T>(query: string, variables?: any): Promise<T> {
    try {
      return await this.client.request<T>(query, variables); // Specify the expected response type
    } catch (error) {
      if (error instanceof ClientError) {
        // Custom error handling: log details and rethrow
        console.error("GraphQL Error:", error.response.errors);
        console.error("Query:", error.request.query);
        throw new Error("GraphQL request failed");
      }
      throw error;
    }
  }
}
