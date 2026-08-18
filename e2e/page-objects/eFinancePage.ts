import { Page, Locator } from "@playwright/test";

/**
 *  eFinance page object model class. This class represents the eFinance page and provides 
 *  methods to interact with its elements.
 */
export default class EFinancePage {
    readonly page: Page;
    readonly menuItems: Locator;

    constructor(page: Page) {    
        this.page = page;               
        this.menuItems = page.getByTestId('desktop-navbar-item');
    }
    /**
     * Verifies that the navigation bar menu items are visible by checking that there is at least one menu item present on the Merchant Portal page.
     */
    async expectMenuItemsVisible() {
        const countEfinance = await this.menuItems.count();
        expect(countEfinance).toBeGreaterThan(0);
    }
}