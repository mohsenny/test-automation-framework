import { BasePage } from "./BasePage";
import { Page } from "playwright";

export class SearchPage extends BasePage {
  searchFieldSelector: string;

  constructor(page: Page) {
    super(page, "http://www.duckduckgo.com");
    this.searchFieldSelector = "#searchbox_input";
  }

  async search(searchKeyword: string): Promise<void> {
    await this.page.fill(this.searchFieldSelector, searchKeyword);
    await this.page.keyboard.press("Enter");
  }
}
