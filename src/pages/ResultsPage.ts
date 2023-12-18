import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export class ResultsPage extends BasePage {
    duckBarSelector: string;
    
    constructor(page: Page) {
        super(page, 'http://www.duckduckgo.com');
        this.duckBarSelector = '#duckbar_static';
    }
    
    getDuckBar(): Locator {
        return this.page.locator(this.duckBarSelector);
    }
}

