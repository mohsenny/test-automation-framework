"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const PageProvider_1 = require("../../../src/e2e/pages/PageProvider");
test_1.test.describe("Search", () => {
    let provider;
    test_1.test.beforeEach(({ browser, page }) => __awaiter(void 0, void 0, void 0, function* () {
        provider = new PageProvider_1.PageProvider(browser, page);
    }));
    (0, test_1.test)("Should search for 'Potato' and see relevant results", () => __awaiter(void 0, void 0, void 0, function* () {
        const searchPage = provider.getSearchPage();
        const ResultsPage = provider.getResultsPage();
        yield searchPage.navigateToPage();
        yield searchPage.search("Potato");
        yield (0, test_1.expect)(ResultsPage.getDuckBar()).toBeVisible();
    }));
});
