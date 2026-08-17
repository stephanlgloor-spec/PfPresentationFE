import { Page, Locator } from "@playwright/test";

/**
 *  Merchant Portal page object model class. This class represents the Merchant Portal page and provides 
 *  methods to interact with its elements.
 *  It encapsulates the locators and actions related to the Merchant Portal page, allowing for easy 
 *  interaction and verification of its elements.
 */
export default class EFinancePage {
    readonly page: Page;
    readonly menuItems: Locator;

    constructor(page: Page) {    
        this.page = page;               
        this.menuItems = page.locator('[data-testid="desktop-navbar-item"]');
    }
    /**
     * Verifies that the navigation bar menu items are visible by checking that there is at least one menu item present on the Merchant Portal page.
     */
    async expectMenuItemsVisible() {
        const countEfinance = await this.menuItems.count();
        expect(countEfinance).toBeGreaterThan(0);
    }
}