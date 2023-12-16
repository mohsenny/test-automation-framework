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

Example:

```typescript
import { Browser, Page } from 'playwright';
import { BasePage } from 'playwright-ts';

export class SearchPage extends BasePage {
    searchFieldSelector: string;
    
    constructor(browser: Browser, page: Page) {
        super(browser, page, '/search');
        this.searchFieldSelector = '#searchbox_input';
    }
    
    async search(searchKeyword: string): Promise<void> {
        await this.page.fill(this.searchFieldSelector, searchKeyword);
        await this.page.keyboard.press('Enter');
    }
}
```

### Using PageProvider

`PageProvider` is a utility class designed to simplify the management and usage of multiple page objects in your tests. It centralizes the creation and initialization of page objects, allowing you to access them easily within your test cases.

To use `PageProvider`, first create and initialize it in your test setup, then use its methods to get instances of your page objects.

Example `PageProvider`:

```typescript
import { Browser, Page } from 'playwright';
import { SearchPage } from './SearchPage';

export class PageProvider {
    private browser: Browser;
    private page: Page;

    constructor(browser: Browser, page: Page) {
        this.browser = browser;
        this.page = page;
    }

    getSearchPage(): SearchPage {
        return new SearchPage(this.browser, this.page);
    }
}
```

Example Test Using `PageProvider`:

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

        await searchPage.init();

        await searchPage.navigateToPage();
        await searchPage.search('Potato');
    });
});
```

### Contributing

Contributions are welcome! If you would like to contribute, please submit a pull request or open an issue for discussion.
