"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getPosts = void 0;
const http_js_1 = require("../../../../src/utils/http.js");
const endpoints_js_1 = require("./endpoints.js");
const http_1 = __importDefault(require("k6/http"));
// import { logger } from '../logger.js';
const getPosts = () => {
    const response = http_1.default.get(endpoints_js_1.list.jsonPlaceholderPosts.getPosts, {
        headers: http_js_1.defaultHeader,
    });
    if (response.status !== 200) {
        // errorLogger('Logging in', response);
    }
};
exports.getPosts = getPosts;
const createPost = (payload) => {
    if (payload === null) {
        console.error("Payload is null");
        return null;
    }
    const response = http_1.default.post(endpoints_js_1.list.jsonPlaceholderPosts.createPosts, JSON.stringify(payload), { headers: http_js_1.defaultHeader });
    if (response.status !== 201) {
        (0, http_js_1.handleResponseError)(response);
        return null;
    }
    return (0, http_js_1.parseJsonResponse)(response.body);
};
exports.createPost = createPost;
