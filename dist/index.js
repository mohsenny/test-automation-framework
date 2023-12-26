"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClientHelper = exports.BasePageProvider = exports.BasePage = void 0;
// BasePage for e2e tests Page Object Model approach
var BasePage_js_1 = require("./src/e2e/pages/BasePage.js");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return BasePage_js_1.BasePage; } });
// BasePageProvider for e2e tests Page Object Model approach to return all page objects
var BasePageProvider_js_1 = require("./src/e2e/pages/BasePageProvider.js");
Object.defineProperty(exports, "BasePageProvider", { enumerable: true, get: function () { return BasePageProvider_js_1.BasePageProvider; } });
// A GraphQL client helper for GraphQL API testse
var GraphQLClientHelper_js_1 = require("./src/api-graphql/GraphQLClientHelper.js");
Object.defineProperty(exports, "GraphQLClientHelper", { enumerable: true, get: function () { return GraphQLClientHelper_js_1.GraphQLClientHelper; } });
