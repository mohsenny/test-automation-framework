import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';
export declare class ResultsPage extends BasePage {
    duckBarSelector: string;
    constructor(page: Page);
    getDuckBar(): Locator;
}
