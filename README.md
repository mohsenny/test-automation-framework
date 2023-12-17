# Playwright Test Automation Framework

This Playwright Test Automation Framework provides a standardized setup for implementing automated tests in multiple projects using Playwright. It offers a structured approach with a Page Object Model (POM) at its core, allowing for easy maintenance and readability of tests.

## Installation

To install the framework in your project, use npm:

```bash
npm install playwright-ts
```

## Usage

### Extending the BasePage

The `BasePage` class is the foundation for creating page-specific classes. Extend `BasePage` for each page in your application, defining the selectors and methods relevant to that page.

#### Example: SearchPage

```typescript
import { Page } from 'playwright';
import { BasePage } from 'playwright-ts';

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

#### Example: ResultsPage

```typescript
import { Page } from 'playwright';
import { BasePage } from 'playwright-ts';

export class ResultsPage extends BasePage {
    private resultsSelector: string;
    
    constructor(page: Page) {
        super(page, '/results');
        this.resultsSelector = '#results';
    }
    
    async shouldSeeDuckBar(): Promise<boolean> {
        return await this.page.isVisible(this.resultsSelector);
    }
}
```

### Using BasePageProvider

`BasePageProvider` is a utility class designed to simplify the management and usage of multiple page objects in your tests. It centralizes the creation and initialization of page objects, allowing you to access them easily within your test cases.

#### Example `BasePageProvider`:

```typescript
import { Browser, Page } from 'playwright';
import { BasePageProvider } from 'playwright-ts';
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

#### Example Test Using `BasePageProvider`:

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
        const resultsVisible = await resultsPage.shouldSeeDuckBar();

        expect(resultsVisible).toBeTruthy();
    });
});
```

### Contributing

Contributions are welcome! If you would like to contribute, please submit a pull request or open an issue for discussion.
