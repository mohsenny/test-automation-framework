import { Browser, Page } from 'playwright';
export declare class BasePage {
    browser: Browser;
    page: Page;
    URL: string;
    constructor(URL: string);
    init(): Promise<Page>;
    navigateToPage(): Promise<void>;
    close(): Promise<void>;
}
