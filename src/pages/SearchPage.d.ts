import { BasePage } from './BasePage';
import { Page } from 'playwright';
export declare class LoginPage extends BasePage {
    searchFieldSelector: string;
    constructor(page: Page);
    search(searchKeyword: string): Promise<void>;
}
