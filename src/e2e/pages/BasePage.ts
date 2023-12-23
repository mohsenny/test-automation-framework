import { Browser, Page } from "playwright";

export class BasePage {
  protected page: Page;
  protected URL: string;

  constructor(page: Page, URL: string) {
    this.page = page;
    this.URL = URL;
  }

  async navigateToPage(): Promise<void> {
    await this.page.goto(this.URL);
  }
}
