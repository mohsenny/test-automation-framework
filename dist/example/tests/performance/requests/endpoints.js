"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const customConfig_js_1 = require("../config/customConfig.js");
exports.list = {
    postmanEcho: {
        getPostmanEcho: `${customConfig_js_1.customOptions.host}/get`,
        postPostmanEcho: `${customConfig_js_1.customOptions.host}/post`,
    },
    jsonPlaceholderPosts: {
        getPosts: `${customConfig_js_1.customOptions.host}/posts`,
        createPosts: `${customConfig_js_1.customOptions.host}/posts`,
    },
};
