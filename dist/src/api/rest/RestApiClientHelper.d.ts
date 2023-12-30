export declare class RestApiClientHelper {
    private client;
    constructor(baseURL: string);
    setHeaders(headers: Record<string, string>): void;
    sendRequest<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any, schema?: any): Promise<T>;
}
