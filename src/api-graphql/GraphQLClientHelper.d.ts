import { GraphQLClientRequestHeaders } from "graphql-request/src/types";
export declare class GraphQLClientHelper {
  private client;
  constructor(endpoint: string);
  setHeaders(headers: GraphQLClientRequestHeaders): void;
  sendQuery<T>(query: string, variables?: any, schema?: any): Promise<T>;
}
