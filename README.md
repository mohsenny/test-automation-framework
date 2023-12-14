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
import { BasePage } from 'playwright-ts/pages/BasePage';

export class LoginPage extends BasePage {
  usernameSelector: string = '#username';
  passwordSelector: string = '#password';
  submitButtonSelector: string = '#submit';

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameSelector, username);
    await this.page.fill(this.passwordSelector, password);
    await this.page.click(this.submitButtonSelector);
  }
}
```

### Writing Tests

Write your tests using Playwright Test in the `tests` directory. Use the page objects you've created for interaction with the web pages.

Example Test:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Authentication', () => {
  test('Should log in with correct credentials', async () => {
    const loginPage = new LoginPage();
    await loginPage.init();

    await loginPage.login('username', 'password');
    // Add assertions to verify successful login

    await loginPage.close();
  });
});
```

## Contributing

Contributions are welcome! If you would like to contribute, please submit a pull request or open an issue for discussion.
