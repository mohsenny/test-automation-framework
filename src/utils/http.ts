import { bytes } from "k6";

export const defaultHeader = {
  "content-type": "application/json",
};

export function authHeader(token: string) {
  return {
    "content-type": "application/json",
    // 'authorization': `Bearer ${token}`
  };
}

// Utility function for error handling
export function handleResponseError(response: any): void {
  console.error(`Unexpected status: ${response.status}`);
  console.error(`Response body: ${response.body}`);
}

// Utility function for parsing JSON response
export function parseJsonResponse<T>(responseBody: string | bytes | null): T | null {
  if (typeof responseBody !== 'string') {
    console.error("Response body is not a string");
    return null;
  }

  try {
    return JSON.parse(responseBody) as T;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error parsing JSON: ${e.message}`);
    } else {
      console.error(`An unknown error occurred: ${e}`);
    }
    return null;
  }
}