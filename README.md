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
│   config.ts
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

### Future Modules

- **REST API Testing (`/api-rest`):** Upcoming module for REST API testing.
- **Performance Testing (`/performance`):** Planned module for performance testing.

### Contributing

Contributions to this framework are welcome! If you'd like to contribute, please submit a pull request or open an issue for discussion.