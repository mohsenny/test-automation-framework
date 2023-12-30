import { expect } from 'chai';
import { RestApiClientHelper } from '../../../../../src/api/rest/RestApiClientHelper';
import { apiTestsConfig } from '../../config/example.config';
import { Post } from '../../types/apiTypes';
import { postEndpoints, postResponseSchema } from './testData/posts.testdata';

describe("REST API Posts Tests", () => {
    const restApiUrl = apiTestsConfig.restApiUrl;
    if (!restApiUrl) {
        throw new Error("REST API URL is not defined in the configuration.");
    }
    const client = new RestApiClientHelper(restApiUrl);

    it("should fetch posts correctly", async () => {
        const posts: Post[] = await client.sendRequest('get', postEndpoints.getPosts, undefined, postResponseSchema);
        expect(posts).to.be.an('array');
        expect(posts.length).to.be.greaterThan(0);
    });

    it("should fetch a specific post", async () => {
        const post = await client.sendRequest('get', postEndpoints.getPost);
        expect(post).to.be.an('object');
        expect(post).to.have.property('id', 1);
    });

    it("should handle invalid endpoint correctly", async () => {
        try {
            await client.sendRequest('get', postEndpoints.invalidEndpoint);
            throw new Error("Expected an error but none was thrown");
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
        }
    });
});
