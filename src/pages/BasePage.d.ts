import { Browser, Page } from 'playwright';
export declare class BasePage {
    protected browser: Browser;
    protected page: Page;
    protected URL: string;
    constructor(browser: Browser, page: Page, URL: string);
    init(): Promise<Page>;
    navigateToPage(): Promise<void>;
    close(): Promise<void>;
}
