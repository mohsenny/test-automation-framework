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
const RestApiClientHelper_1 = require("../../../../src/api/rest/RestApiClientHelper");
const example_config_1 = require("./example.config");
describe("REST API Posts Tests", () => {
    const restApiUrl = example_config_1.apiTestsConfig.restApiUrl;
    if (!restApiUrl) {
        throw new Error("REST API URL is not defined in the configuration.");
    }
    const client = new RestApiClientHelper_1.RestApiClientHelper(restApiUrl);
    it("should fetch posts correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield client.sendRequest('get', '/posts'); // Assuming PostType is defined
        (0, chai_1.expect)(posts).to.be.an('array');
        (0, chai_1.expect)(posts.length).to.be.greaterThan(0);
    }));
    // Add more tests as needed
});
