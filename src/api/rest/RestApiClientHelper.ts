import axios, { AxiosInstance } from 'axios';
import { logger } from '../common/logger';
import { validateResponse } from '../common/validator';

export class RestApiClientHelper {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
        });
    }

    // Set custom headers, useful for authentication tokens
    setHeaders(headers: Record<string, string>) {
        Object.assign(this.client.defaults.headers, headers);
    }

    // Send a REST API request and validate the response
    async sendRequest<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any, schema?: any): Promise<T> {
        try {
            const response = await this.client.request<T>({ method, url, data });
            if (schema && !validateResponse(response.data, schema)) {
                throw new Error("Response does not match the expected structure");
            }
            return response.data;
        } catch (error: any) {
            logger.error({
                message: "REST API Error",
                error: error.toString(),
            });
            throw new Error(error.message || "Error in REST API request");
        }
    }
}
