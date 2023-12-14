import { Browser, chromium, Page } from 'playwright';
import config from '../config/playwright.config';

export class BasePage {
    browser!: Browser;
    page!: Page;
    URL: string;

    constructor(URL: string) {
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
