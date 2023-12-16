import { BasePage } from './BasePage';
import { Browser, Page } from 'playwright';
export declare class LoginPage extends BasePage {
    searchFieldSelector: string;
    constructor(browser: Browser, page: Page);
    search(searchKeyword: string): Promise<void>;
}
