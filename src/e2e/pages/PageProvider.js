"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageProvider = void 0;
const BasePageProvider_1 = require("./BasePageProvider");
const ResultsPage_1 = require("./ResultsPage");
const SearchPage_1 = require("./SearchPage");
class PageProvider extends BasePageProvider_1.BasePageProvider {
    constructor(browser, page) {
        super(browser, page);
        this.registerPageObject('search', SearchPage_1.SearchPage);
        this.registerPageObject('results', ResultsPage_1.ResultsPage);
    }
    getResultsPage() {
        return this.getPageObject('results');
    }
    getSearchPage() {
        return this.getPageObject('search');
    }
}
exports.PageProvider = PageProvider;
