# Playwright Test Automation Framework

This Playwright Test Automation Framework provides a standardized setup for implementing automated tests in multiple projects using Playwright. It offers a structured approach with a Page Object Model (POM) at its core, allowing for easy maintenance and readability of tests.

## Project Structure

```
├───dist (Compiled TypeScript files)
│   ├───src
│   │   ├───config (Playwright configuration files)
│   │   ├───pages (Base and extended page classes)
│   │   └───utils (Utility functions)
├───src
│   ├───config (Playwright configuration source files)
│   ├───pages (Source for BasePage and other page classes)
│   └───utils (Utility functions source)
├───test-results (Generated test results)
└───tests (Test case files)
```

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
import { BasePage } from 'playwright-ts';

export class SearchPage extends BasePage {
    searchFieldSelector: string;

    constructor() {
        super('/search');
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
import { SearchPage } from '../src/pages/SearchPage';

test.describe('Search', () => {
    test('Should search for \'Potato\' and see relevant results', async ({}) => {
        const searchPage = new SearchPage();
        await searchPage.init();

        await searchPage.navigateToPage();
        await searchPage.search('Potato');

        await searchPage.close();
    });
});

```

## Contributing

Contributions are welcome! If you would like to contribute, please submit a pull request or open an issue for discussion.
