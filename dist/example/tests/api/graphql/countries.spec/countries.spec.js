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
const GraphQLClientHelper_1 = require("../../../../../src/api/graphql/GraphQLClientHelper");
const countries_testdata_1 = require("./testData/countries.testdata");
const example_config_1 = require("../example.config");
const apiTypes_1 = require("../../types/apiTypes");
describe("GraphQL Country API Tests", () => {
    const graphqlApiUrl = example_config_1.graphqlTestsConfig.graphqlApiUrl;
    if (!graphqlApiUrl) {
        throw new Error("GraphQL API URL is not defined in the configuration.");
    }
    const client = new GraphQLClientHelper_1.GraphQLClientHelper(graphqlApiUrl);
    before(() => {
        client.setHeaders({
            Authorization: `Bearer ${example_config_1.graphqlTestsConfig.apiKey}`,
        });
    });
    it("should fetch countries data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield client.sendQuery(countries_testdata_1.sampleQueries.getCountries, undefined, apiTypes_1.countriesResponseSchema);
        (0, chai_1.expect)(data.countries).to.be.an("array");
        (0, chai_1.expect)(data.countries.length).to.be.greaterThan(0);
    }));
    it("should fetch a specific country", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield client.sendQuery(countries_testdata_1.sampleQueries.getCountry, countries_testdata_1.sampleVariables.countryVariables, apiTypes_1.countryResponseSchema);
        (0, chai_1.expect)(data.country).to.be.an("object");
        (0, chai_1.expect)(data.country.name).to.equal("Brazil");
    }));
    it("should handle errors gracefully", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.sendQuery(countries_testdata_1.sampleQueries.invalidQuery, undefined, null); // No schema needed for invalid queries
            throw new Error("Expected an error but none was thrown");
        }
        catch (error) {
            (0, chai_1.expect)(error).to.be.an.instanceOf(Error);
            // Check for a part of the error message that is consistent across all GraphQL errors
            (0, chai_1.expect)(error.message).to.include("Cannot query field");
        }
    }));
});
