import { GraphQLClient, ClientError } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/src/types";
import { logger } from "../common/logger";
import { validateResponse } from "../common/validator";

export class GraphQLClientHelper {
  private client: GraphQLClient;

  constructor(endpoint: string) {
    this.client = new GraphQLClient(endpoint);
  }

  // Set custom headers, useful for authentication tokens
  setHeaders(headers: GraphQLClientRequestHeaders) {
    this.client.setHeaders(headers);
  }

  // Send a GraphQL query or mutation, and validates the response against the schema
  async sendQuery<T>(query: string, variables?: any, schema?: any): Promise<T> {
    const start = performance.now();
    try {
      const response = await this.client.request<T>(query, variables);
      const end = performance.now();
      const duration = end - start;
      // Log request details and performance metrics
      logger.info({
        message: "GraphQL Request",
        query,
        variables,
        duration,
      });
      if (schema && !validateResponse(response, schema)) {
        console.error("Failed validation response:", response);
        throw new Error("Response does not match the expected structure");
      }
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        logger.error({
          message: "GraphQL Error",
          error: error.toString(),
        });
        throw new Error("GraphQL request failed: " + error.toString());
      }
      throw error;
    }
  }
}
