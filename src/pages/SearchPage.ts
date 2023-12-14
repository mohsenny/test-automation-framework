import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
    searchFieldSelector: string;

    constructor() {
        super('http://www.duckduckgo.com');
        this.searchFieldSelector = '#searchbox_input';
    }

    async search(searchKeyword: string): Promise<void> {
        await this.page.fill(this.searchFieldSelector, searchKeyword);
        await this.page.keyboard.press('Enter');
    }
}
