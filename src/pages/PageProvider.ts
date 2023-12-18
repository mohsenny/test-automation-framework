import { BasePageProvider } from './BasePageProvider';
import { ResultsPage } from './ResultsPage';
import { SearchPage } from './SearchPage';
import { Browser, Page } from 'playwright';

export class PageProvider extends BasePageProvider {
    constructor(browser: Browser, page: Page) {
        super(browser, page);
        this.registerPageObject('search', SearchPage);
        this.registerPageObject('results', ResultsPage);
    }

    getResultsPage() {
        return this.getPageObject<ResultsPage>('results');
    }

    getSearchPage() {
        return this.getPageObject<SearchPage>('search');
    }
}
