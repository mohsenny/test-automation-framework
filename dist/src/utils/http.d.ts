import { bytes } from "k6";
export declare const defaultHeader: {
    "content-type": string;
};
export declare function authHeader(token: string): {
    "content-type": string;
};
export declare function handleResponseError(response: any): void;
export declare function parseJsonResponse<T>(responseBody: string | bytes | null): T | null;
