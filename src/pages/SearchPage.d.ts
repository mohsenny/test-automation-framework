import { BasePage } from './BasePage';
export declare class SearchPage extends BasePage {
    searchFieldSelector: string;
    constructor();
    search(searchKeyword: string): Promise<void>;
}
