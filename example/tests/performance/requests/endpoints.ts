import { customOptions } from "../config/customConfig";

export const list = {
  postmanEcho: {
    getPostmanEcho: `${customOptions.host}/get`,
    postPostmanEcho: `${customOptions.host}/post`,
  },
  jsonPlaceholderPosts: {
    getPosts: `${customOptions.host}/posts`,
    createPosts: `${customOptions.host}/posts`,
  },
};
