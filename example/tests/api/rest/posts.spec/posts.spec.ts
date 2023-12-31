import { expect } from 'chai';
import { RestApiClientHelper } from '../../../../../src/api/rest/RestApiClientHelper';
import { apiTestsConfig } from '../../config/example.config';
import { Post } from '../../types/requestTypes';
import { postResponseSchema, postsResponseSchema } from '../../types/responseTypes';
import { postEndpoints } from '../../endpoints/endpoints'

describe("REST API Posts Tests", () => {
    const restApiUrl = apiTestsConfig.restApiUrl;
    if (!restApiUrl) {
        throw new Error("REST API URL is not defined in the configuration.");
    }
    const client = new RestApiClientHelper(restApiUrl);

    it("should fetch posts correctly", async () => {
        const posts: Post[] = await client.sendRequest('get', '/posts', undefined, postsResponseSchema);
        expect(posts).to.be.an('array');
        expect(posts.length).to.be.greaterThan(0);
    });

    it("should fetch a specific post", async () => {
        const post = await client.sendRequest('get', '/posts/1', undefined, postResponseSchema);
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
