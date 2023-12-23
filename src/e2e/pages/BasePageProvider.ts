import { Browser, Page } from "playwright";

export class BasePageProvider {
  private browser: Browser;
  private page: Page;
  private pageObjects = new Map<string, any>();

  constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  registerPageObject(key: string, pageObjectClass: any): void {
    this.pageObjects.set(key, pageObjectClass);
  }

  getPageObject<T>(key: string): T {
    const PageClass = this.pageObjects.get(key);
    if (!PageClass) {
      throw new Error(`Page object for key "${key}" not registered.`);
    }
    return new PageClass(this.page) as T;
  }
}
