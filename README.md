# Test Automation Framework

This Test Automation Framework is a comprehensive solution for implementing automated tests across various domains, including end-to-end, API, and performance testing. It's designed to provide a standardized and scalable approach to testing in multiple projects.

### Installation

To install the framework in your project, use npm:

```bash
npm install test-automation-framework
```

### Usage

The framework is divided into modules, each targeting different testing needs:

---

## Module 1: End-to-End Testing with Playwright (`/e2e`)

This module leverages Playwright for end-to-end testing and implements the Page Object Model (POM) for maintainability and readability.

### Extending the BasePage

`BasePage` is the foundational class for creating page-specific classes. Extend `BasePage` for each page in your application with relevant selectors and methods.

**Example: SearchPage**

```typescript
import { Page } from 'playwright';
import { BasePage } from 'test-automation-framework';

export class SearchPage extends BasePage {
    private searchFieldSelector: string;
    
    constructor(page: Page) {
        super(page, '/search');
        this.searchFieldSelector = '#searchbox_input';
    }
    
    async search(searchKeyword: string): Promise<void> {
        await this.page.fill(this.searchFieldSelector, searchKeyword);
        await this.page.keyboard.press('Enter');
    }
}
```

**Example: ResultsPage**

```typescript
import { Page } from 'playwright';
import { BasePage } from 'test-automation-framework';

export class ResultsPage extends BasePage {
    private resultsSelector: string;
    
    constructor(page: Page) {
        super(page, '/results');
        this.resultsSelector = '#results';
    }
    
    getDuckBar(): Locator {
        return this.page.locator(this.duckBarSelector);
    }
}
```

### Using BasePageProvider

`BasePageProvider` manages multiple page objects, allowing easy access within test cases.

**Example Usage of `BasePageProvider`**

```typescript
import { Browser, Page } from 'playwright';
import { BasePageProvider } from 'test-automation-framework';
import { SearchPage } from './SearchPage';
import { ResultsPage } from './ResultsPage';

export class PageProvider extends BasePageProvider {
    constructor(browser: Browser, page: Page) {
        super(browser, page);
        this.registerPageObject('search', SearchPage);
        this.registerPageObject('results', ResultsPage);
    }

    getSearchPage(): SearchPage {
        return this.getPageObject<SearchPage>('search');
    }

    getResultsPage(): ResultsPage {
        return this.getPageObject<ResultsPage>('results');
    }
}
```

**Example Test Using `BasePageProvider`**

```typescript
import { test, expect } from '@playwright/test';
import { PageProvider } from '../src/pages/PageProvider';

test.describe('Search', () => {
    let provider: PageProvider;

    test.beforeEach(async ({ browser, page }) => {
        provider = new PageProvider(browser, page);
    });

    test('Should search for \'Potato\' and see relevant results', async () => {
        const searchPage = provider.getSearchPage();
        const resultsPage = provider.getResultsPage();

        await searchPage.navigateToPage();
        await searchPage.search('Potato');
        await expect(ResultsPage.getDuckBar()).toBeVisible()
    });
});
```

## Module 2: API Testing with GraphQL (`/api/graphql`)

This module provides the necessary tools for testing GraphQL APIs, including a GraphQL client helper for sending requests and handling responses.

First, create a `config.ts` for the API test configurations:

```typescript
import { PackageConfig } from 'your-package/config';

export const apiTestsConfig: ApiTestsConfig = {
    graphqlApiUrl: "https://countries.trevorblades.com/",
    // restApiUrl: "another URL for rest API testing?",
    // apiKey: "your-api-key",
};

```

Then, create a testData directory per test suit/scenario, containing the test data in a file within that directory:

```bash
tests/scneario-one/test-example.spec.ts
tests/scenario-one/testData/test-example.testdata.ts
```

`test-example.testdata.ts` would contain and export the needed test data for your tests:

```typescript
export const sampleQueries = {
    getCountries: `
        query {
        countries {
            code
            name
        }
        }
    `,
    getCountry: `
        query getCountry($code: ID!) {
        country(code: $code) {
            code
            name
            native
            capital
            currency
        }
        }
    `,
    invalidQuery: `query { invalidField }`,
};
  
export const sampleVariables = {
    countryVariables: { code: 'BR' },
};
  
```

You would also need a `types` directory that contains both the types needs by your tests, as well as the schema to compare and assert the API responses against.
As a result, the structure of your tests would look like below:

```text
├───config.ts
│
├───example.spec
│   │   GraphQLCountryTest.spec.ts
│   │
│   └───testData
│           GraphQLTestExample.testdata.ts
│
└───types
        graphqlTypes.ts
        schemas.ts
```

Finally, end this is how your test would look like:


```typescript
import { expect } from 'chai';
import { GraphQLClientHelper } from 'test-automation-framework';
import { sampleQueries, sampleVariables } from './testData/GraphQLTestExample.testdata';
import { graphqlTestsConfig } from '../config';
import { CountriesData, CountryData } from '../types/graphqlTypes';
import {
    countriesResponseSchema,
    countryResponseSchema,
  } from '../types/schemas';

describe('GraphQL Country API Tests', () => {
  const client = new GraphQLClientHelper(graphqlTestsConfig.apiUrl);

  before(() => {
    client.setHeaders({ Authorization: `Bearer ${graphqlTestsConfig.apiKey}` });
  });

  it("should fetch countries data correctly", async () => {
    const data = await client.sendQuery<CountriesData>(
      sampleQueries.getCountries,
      undefined,
      countriesResponseSchema,
    );
    expect(data.countries).to.be.an("array");
    expect(data.countries.length).to.be.greaterThan(0);
  });

  it("should fetch a specific country", async () => {
    const data = await client.sendQuery<CountryData>(
      sampleQueries.getCountry,
      sampleVariables.countryVariables,
      countryResponseSchema,
    );
    expect(data.country).to.be.an("object");
    expect(data.country.name).to.equal("Brazil");
  });

  it("should handle errors gracefully", async () => {
    try {
      await client.sendQuery(sampleQueries.invalidQuery, undefined, null); // No schema needed for invalid queries
      throw new Error("Expected an error but none was thrown");
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect((error as Error).message).to.include("Cannot query field");
    }
  });
});
```

## Modules 3: REST API Testing (`/api/rest`)

This module provides tools and setups for testing REST APIs using JSONPlaceholder as an example. It includes a REST API client helper for sending requests and handling responses.

### Configuration

Create an `example.config.ts` file in the `api/config` directory for REST API test configurations:

```typescript
import { ApiTestsConfig } from "../../../../src/api/config/types";

export const apiTestsConfig: ApiTestsConfig = {
    restApiUrl: "https://countries.trevorblades.com/",
    // graphqlApiUrl: "another URL for graphql API testing?",
    // apiKey: "your-api-key",
};
```

### Defining Endpoints

Define your API endpoints in the `api/endpoints` directory:

```typescript
// example/tests/api/endpoints/endpoints.ts
export const postEndpoints = {
    getPosts: '/posts',
    getPost: '/posts/1', // Endpoint to fetch a specific post
    invalidEndpoint: '/invalidEndpoint', // Example of an invalid endpoint
};
```

### Writing Tests

Write your REST API tests in the `api/rest` directory. Here's an example of how to structure and write a REST API test:

```typescript
// example/tests/api/rest/posts.spec.ts
import { expect } from 'chai';
import { RestApiClientHelper } from 'test-automation-framework';
import { postEndpoints } from '../endpoints/endpoints';
import { apiTestsConfig } from '../config';
import { Post, postsResponseSchema } from '../types/requestTypes';
import { postResponseSchema } from '../types/responseTypes';

describe("REST API Posts Tests", () => {
    const client = new RestApiClientHelper(apiTestsConfig.restApiUrl);

    it("should fetch posts correctly", async () => {
        const posts: Post[] = await client.sendRequest('get', postEndpoints.getPosts, undefined, postsResponseSchema);
        expect(posts).to.be.an('array');
        expect(posts.length).to.be.greaterThan(0);
    });

    // Additional test cases...
});
```

### Directory Structure for REST API Tests

The structure for REST API tests is organized as follows:

```text
├───api
│   ├───config
│   │   │   example.config.ts
│   │   │
│   ├───endpoints
│   │   │   endpoints.ts
│   │   
│   ├───rest
│   │   └───posts.spec
│   │       │   posts.spec.ts
│   │       
│   └───types
│       │   requestTypes.ts
│       │   responseTypes.ts
```


## Modules 4: Performance Testing with k6 (`/performance`)

Our framework integrates performance testing using k6, a powerful tool for load testing. Due to k6's limitations in importing npm modules, this module relies on direct imports of raw files from this repository in the consumer's k6 scripts.

### IMPORTANT DISCLAIMER: K6 Limitations
In the realm of performance testing with k6, there are specific limitations that we need to acknowledge and work around. Firstly, k6 is designed to execute JavaScript (.js) files exclusively. This inherent design choice means that TypeScript files are not directly supported. As a consequence of this limitation, our performance testing scripts are written directly in JavaScript rather than TypeScript. This approach allows us to leverage the full capabilities of k6 without the complexities introduced by a transpilation step from TypeScript to JavaScript.

Furthermore, k6 intentionally restricts the import of Node.js modules. This design decision is primarily to prevent complications with the internal memory usage of the Virtual Users (VUs) that k6 generates during tests. Such restrictions ensure that the performance tests are lean and more closely simulate real-world user interaction scenarios. Due to this limitation, any necessary modules or libraries that are not natively supported by k6 must be imported via HTTP(S) from external sources, such as GitHub's raw content. This method of importing ensures that the necessary functionalities are accessible without the need for npm publishing of performance modules, which in our case would be redundant and inefficient.

For instance, in our consumer-side performance tests (located at tests/performance/requests/jsonPlaceholder.js), we import modules like defaultHeader, handleResponseError, and parseJsonResponse directly from the hosted JavaScript files on GitHub:

```javascript
import { defaultHeader, handleResponseError, parseJsonResponse } from 'https://raw.githubusercontent.com/mohsenny/test-automation-framework/main/dist/src/perfomrance/index.js';

export const getPosts = () => {
    // Test implementation
};
```

### Configuring Performance Tests

A `config/configure.js` file is provided to manage environment variables essential for running the tests. This file contains common mandatory environment variables applicable across different projects. Additional project-specific environment variables can be added on the consumer side as needed.

### Writing Performance Tests

All performance tests should be written in JavaScript, as k6 does not smoothly support TypeScript. This ensures compatibility with k6's runtime environment and its import mechanism.

### How to Use

Import the necessary scripts directly from the raw GitHub content in your k6 test scripts. This allows you to leverage the latest updates and functionalities of the performance testing module without npm module dependencies.

### Configuration (`/config`)

Define load stages in `load.ts`:

```javascript
// config/load.ts
export const loads = {
  // Define your load configurations here
  performance: {
    jsonPlaceholder: {
      getPosts: [{ target: 5, duration: "20s" }],
      // Additional scenarios
    },
  },
  // Other environments like 'sanity'
};

// Function to retrieve the appropriate load configuration
export function get(env) { /* ... */ }
```

Customize environment-specific settings in `customConfig.ts`:

```javascript
// config/customConfig.ts
export const customOptions = {
  // Define your custom options here
  host: getEnvVariable("MY_HOSTNAME"),
  // ...
};
```

### Endpoints (`/requests`)

Define API endpoints:

```javascript
// requests/endpoints.ts
export const list = {
  jsonPlaceholderPosts: {
    getPosts: `${customOptions.host}/posts`,
    // Additional endpoints
  },
};
```

Implement request functions:

```javascript
// requests/jsonPlaceholder.ts
export const getPosts = () => {
  // Function to fetch posts
};

export const createPost = (payload) => {
  // Function to create a post
};
```

### Scenarios (`/scenarios`)

Write test scenarios using the defined requests and configurations:

```javascript
// scenarios/example.spec/jsonPlaceholder.ts
import { sleep, group } from "k6";
import * as jsonPlaceholderRequests from "../../requests/jsonPlaceholder.js";

export default function () {
  group("Get all Posts", () => {
    jsonPlaceholderRequests.getPosts();
    sleep(1);
  });

  // Additional test groups
};
```

### Setup Scripts (`/setup`)

Use `ci.sh`, `local.ps1`, and `local.sh` for setting up test environments and execution.

### Types (`/types`)

Define types for requests and responses in TypeScript for better code structure and understanding.

### Contributing

Contributions to this framework are welcome! If you'd like to contribute, please submit a pull request or open an issue for discussion.