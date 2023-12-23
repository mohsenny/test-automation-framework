import { BasePageProvider } from "./BasePageProvider";
import { ResultsPage } from "./ResultsPage";
import { SearchPage } from "./SearchPage";
import { Browser, Page } from "playwright";
export declare class PageProvider extends BasePageProvider {
  constructor(browser: Browser, page: Page);
  getResultsPage(): ResultsPage;
  getSearchPage(): SearchPage;
}
