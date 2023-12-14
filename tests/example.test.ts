import { test, expect } from '@playwright/test';
import { SearchPage } from '../src/pages/SearchPage';

test.describe('Search', () => {
    test('Should search for \'Potato\' and see relevant results', async ({}) => {
        const searchPage = new SearchPage();
        await searchPage.init();

        await searchPage.navigateToPage();
        await searchPage.search('Potato');

        await searchPage.close();
    });
});
