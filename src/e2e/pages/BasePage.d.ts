import { Page } from 'playwright';
export declare class BasePage {
    protected page: Page;
    protected URL: string;
    constructor(page: Page, URL: string);
    navigateToPage(): Promise<void>;
}
