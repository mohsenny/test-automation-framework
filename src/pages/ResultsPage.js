"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsPage = void 0;
const BasePage_1 = require("./BasePage");
class ResultsPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page, 'http://www.duckduckgo.com');
        this.duckBarSelector = '#duckbar_static';
    }
    getDuckBar() {
        return this.page.locator(this.duckBarSelector);
    }
}
exports.ResultsPage = ResultsPage;
