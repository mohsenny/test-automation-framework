"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePageProvider = void 0;
class BasePageProvider {
    constructor(browser, page) {
        this.pageObjects = new Map();
        this.browser = browser;
        this.page = page;
    }
    registerPageObject(key, pageObjectClass) {
        this.pageObjects.set(key, pageObjectClass);
    }
    getPageObject(key) {
        const PageClass = this.pageObjects.get(key);
        if (!PageClass) {
            throw new Error(`Page object for key "${key}" not registered.`);
        }
        return new PageClass(this.page);
    }
}
exports.BasePageProvider = BasePageProvider;
