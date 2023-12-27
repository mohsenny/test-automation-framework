# Test Automation Framework

This Test Automation Framework is a comprehensive solution for implementing automated tests across various domains, including end-to-end, API, and performance testing. It's designed to provide a standardized and scalable approach to testing in multiple projects.

## Installation

To install the framework in your project, use npm:

```bash
npm install test-automation-framework
```

## Usage

The framework is divided into modules, each targeting different testing needs:

### End-to-End Testing with Playwright (`/e2e`)

This module leverages Playwright for end-to-end testing and implements the Page Object Model (POM) for maintainability and readability.

#### Extending the BasePage

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

#### Using BasePageProvider

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

### API Testing with GraphQL (`/api-graphql`)

This module provides the necessary tools for testing GraphQL APIs, including a GraphQL client helper for sending requests and handling responses.

First, create a `config.ts` for the API test configurations:

```typescript
import { PackageConfig } from 'your-package/config';

export const config: PackageConfig = {
  apiUrl: 'https://example.com/graphql',
  apiKey: 'your-api-key',
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
    }`,
    getCountry: `
        query getCountry($code: ID!) {
        country(code: $code) {
            code
            name
            native
            capital
            currency
        }
    }`,
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
The structure of your tests would look like below:


Certainly! Here's how you can incorporate code snippets into your README for the performance testing section:

---

### Performance Testing with k6 (`/performance`)

Our framework integrates performance testing using k6, a powerful tool for load testing. Due to k6's limitations in importing npm modules, this module relies on direct imports of raw files from this repository in the consumer's k6 scripts.

#### Configuring Performance Tests

A `config/configure.js` file is provided to manage environment variables essential for running the tests. This file contains common mandatory environment variables applicable across different projects. Additional project-specific environment variables can be added on the consumer side as needed.

#### Writing Performance Tests

All performance tests should be written in JavaScript, as k6 does not smoothly support TypeScript. This ensures compatibility with k6's runtime environment and its import mechanism.

#### How to Use

Import the necessary scripts directly from the raw GitHub content in your k6 test scripts. This allows you to leverage the latest updates and functionalities of the performance testing module without npm module dependencies.

#### Configuration (`/config`)

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

#### Endpoints (`/requests`)

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

#### Scenarios (`/scenarios`)

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

#### Setup Scripts (`/setup`)

Use `ci.sh`, `local.ps1`, and `local.sh` for setting up test environments and execution.

#### Types (`/types`)

Define types for requests and responses in TypeScript for better code structure and understanding.

### Future Modules

- **REST API Testing (`/api-rest`):** Upcoming module for REST API testing.

### Contributing

Contributions to this framework are welcome! If you'd like to contribute, please submit a pull request or open an issue for discussion.
