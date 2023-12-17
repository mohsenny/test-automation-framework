import { BasePage } from './BasePage';
import { Page } from 'playwright';

export class LoginPage extends BasePage {
    searchFieldSelector: string;
    
    constructor(page: Page) {
        super(page, 'http://example.com/login');
        this.searchFieldSelector = '#searchbox_input';
    }
    
    async search(searchKeyword: string): Promise<void> {
        await this.page.fill(this.searchFieldSelector, searchKeyword);
        await this.page.keyboard.press('Enter');
    }
}
