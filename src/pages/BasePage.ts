import { Browser, chromium, Page } from 'playwright';
import config from '../config/playwright.config';

export class BasePage {
    protected browser: Browser;
    protected page: Page;
    protected URL: string;

    constructor(browser: Browser, page: Page, URL: string) {
        this.browser = browser;
        this.page = page;
        this.URL = URL;
    }

    async init(): Promise<Page> {
        this.browser = await chromium.launch(config);
        this.page = await this.browser.newPage();
        return this.page;
    }

    async navigateToPage(): Promise<void> {
        await this.page.goto(this.URL);
    }

    async close(): Promise<void> {
        await this.browser.close();
    }
}
