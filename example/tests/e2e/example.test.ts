import { test, expect } from "@playwright/test";
import { PageProvider } from "../../../src/e2e/pages/PageProvider";

test.describe("Search", () => {
  let provider: PageProvider;

  test.beforeEach(async ({ browser, page }) => {
    provider = new PageProvider(browser, page);
  });

  test("Should search for 'Potato' and see relevant results", async () => {
    const searchPage = provider.getSearchPage();
    const ResultsPage = provider.getResultsPage();

    await searchPage.navigateToPage();
    await searchPage.search("Potato");
    await expect(ResultsPage.getDuckBar()).toBeVisible();
  });
});
