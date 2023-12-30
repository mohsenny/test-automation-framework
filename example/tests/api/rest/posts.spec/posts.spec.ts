import { expect } from 'chai';
import { RestApiClientHelper } from '../../../../../src/api/rest/RestApiClientHelper';
import { apiTestsConfig } from '../example.config';
import { PostType } from '../../types/apiTypes';

describe("REST API Posts Tests", () => {
    const restApiUrl = apiTestsConfig.restApiUrl;
    if (!restApiUrl) {
        throw new Error("REST API URL is not defined in the configuration.");
    }
    const client = new RestApiClientHelper(restApiUrl);

    it("should fetch posts correctly", async () => {
        const posts: PostType[] = await client.sendRequest('get', '/posts'); // Assuming PostType is defined
        expect(posts).to.be.an('array');
        expect(posts.length).to.be.greaterThan(0);
    });

    // Add more tests as needed
});
