import { Browser, Page } from "playwright";
export declare class BasePageProvider {
    private browser;
    private page;
    private pageObjects;
    constructor(browser: Browser, page: Page);
    registerPageObject(key: string, pageObjectClass: any): void;
    getPageObject<T>(key: string): T;
}
