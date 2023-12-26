import { defaultHeader, handleResponseError, parseJsonResponse } from "../../../../src/utils/http.js";
import { list as endpoints } from "./endpoints.js";
import http from "k6/http";
// import { logger } from '../logger.js';

export const getPosts = () => {
  const response = http.get(
    endpoints.jsonPlaceholderPosts.getPosts,
    {
      headers: defaultHeader,
    }
  );
  if (response.status !== 200) {
    // errorLogger('Logging in', response);
  }
};

export const createPost = (
  payload: JSONPlaceholderCreatePostPayload,
): JSONPlaceholderCreatePostResponse | null => {
  if (payload === null) {
    console.error("Payload is null");
    return null;
  }

  const response = http.post(
    endpoints.jsonPlaceholderPosts.createPosts,
    JSON.stringify(payload),
    { headers: defaultHeader },
  );

  if (response.status !== 201) {
    handleResponseError(response);
    return null;
  }

  return parseJsonResponse<JSONPlaceholderCreatePostResponse>(response.body);
};
