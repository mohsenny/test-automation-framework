"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const RestApiClientHelper_1 = require("../../../../../src/api/rest/RestApiClientHelper");
const example_config_1 = require("../../config/example.config");
const responseTypes_1 = require("../../types/responseTypes");
const endpoints_1 = require("../../endpoints/endpoints");
describe("REST API Posts Tests", () => {
    const restApiUrl = example_config_1.apiTestsConfig.restApiUrl;
    if (!restApiUrl) {
        throw new Error("REST API URL is not defined in the configuration.");
    }
    const client = new RestApiClientHelper_1.RestApiClientHelper(restApiUrl);
    it("should fetch posts correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield client.sendRequest('get', '/posts', undefined, responseTypes_1.postsResponseSchema);
        (0, chai_1.expect)(posts).to.be.an('array');
        (0, chai_1.expect)(posts.length).to.be.greaterThan(0);
    }));
    it("should fetch a specific post", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield client.sendRequest('get', '/posts/1', undefined, responseTypes_1.postResponseSchema);
        (0, chai_1.expect)(post).to.be.an('object');
        (0, chai_1.expect)(post).to.have.property('id', 1);
    }));
    it("should handle invalid endpoint correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.sendRequest('get', endpoints_1.postEndpoints.invalidEndpoint);
            throw new Error("Expected an error but none was thrown");
        }
        catch (error) {
            (0, chai_1.expect)(error).to.be.an.instanceOf(Error);
        }
    }));
});
