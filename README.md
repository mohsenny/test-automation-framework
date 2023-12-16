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

export class LoginPage extends BasePage {
    searchFieldSelector: string;
    
    constructor(browser: Browser, page: Page) {
        super(browser, page, '/login');
        this.searchFieldSelector = '#searchbox_input';
    }
    
    async search(searchKeyword: string): Promise<void> {
        await this.page.fill(this.searchFieldSelector, searchKeyword);
        await this.page.keyboard.press('Enter');
    }
}

```

### Writing Tests

Write your tests using Playwright Test in the `tests` directory. Use the page objects you've created for interaction with the web pages.

Example Test:

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

## Contributing

Contributions are welcome! If you would like to contribute, please submit a pull request or open an issue for discussion.
