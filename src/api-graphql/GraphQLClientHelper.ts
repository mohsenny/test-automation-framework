import { GraphQLClient, ClientError } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/src/types';
import { logger } from '../utils/logger'
 
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
    const start = performance.now();
    try {
      const response = await this.client.request<T>(query, variables);
      const end = performance.now();
      const duration = end - start;    
      // Log request details and performance metrics
      logger.info({
        message: 'GraphQL Request',
        query,
        variables,
        duration,
      });
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        // Custom error handling & log errors
        logger.error({
          message: 'GraphQL Error',
          error: error.toString(),
        });
        throw new Error("GraphQL request failed");
      }
      throw error;
    }
  }
}
