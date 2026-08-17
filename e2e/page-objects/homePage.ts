import { expect, type Locator, type Page } from '@playwright/test';
import { Language, WIDGET_TITLES } from './types';

/**
 * Base class representing the widget with help button title and content.
 * The content is queried by the subclass which is derived from this base class and one of the widgets on the landing page.
 */
class WidgetBase {
    readonly page: Page;  // The Playwright Page object representing the current page.
    protected widget: Locator;
    readonly title: Locator;  //  The Locator object representing the title of the payment widget, filtered to match specific text related to payments or standing orders.
    protected titleKey: string; // Reference to the widget title translation key
    protected helpButton: Locator = undefined as unknown as Locator;  // The locator object representing the help button within the widget, initialized as undefined and cast to Locator type.
   
    constructor(page: Page, cv: string, titleKey: string, helpButton: boolean = false) {
        this.page = page;
        // locate the widget title by data-cy attribute, which is unique for each widget, and filter by the provided cv (component version) string
        this.widget = page.locator(`[data-cy="${cv}"]`);
        this.titleKey = titleKey;
        this.title = this.widget.locator('[data-testid="widget-title"]');
        if (helpButton) {
            this.helpButton = this.widget.locator('[data-testid="widget-help-button"]').first();
        }
    }

    /**
     * Verifies that the widget title matches the expected translation for the given language.
     * @param language The language to verify against
     */
    async verifyTitle(language: Language) {
        const expectedTitle = WIDGET_TITLES[this.titleKey]?.[language];
        if (!expectedTitle) {
            throw new Error(`No translation found for widget key "${this.titleKey}" in language "${language}"`);
        }
        await expect(this.title).toContainText(expectedTitle);
    }

    /**
     * Default empty implementation for content verification.
     * Override this method in child classes to verify widget-specific content.
     */
    async verifyContent(language: Language) {
        // Override in child classes
    }
}
/**
 * Represents the payment widget on the landing page, providing access to various elements related to payments, 
 * such as buttons and input fields for IBAN, recipient name, and payment information.
 * "Zahlung / Dauerauftrag erfassen" is the German term for "record payment", 
 * which refers to the process of entering payment details into the payment widget.
 */
export class PaymentWidget extends WidgetBase {
    readonly page: Page;  // The Playwright Page object representing the current page.
    readonly transferButton: Locator; // The Locator object representing the transfer button within the payment widget, identified by a specific data-cy attribute.
    readonly qrInvoiceButton: Locator;
    readonly ibanInput: Locator;
    readonly recipientNameInput: Locator;
    readonly paymentInfoInput: Locator;

    constructor(page: Page) {
        super(page, "smartbar", "PAYMENT");
        this.page = page;
        this.transferButton = this.widget.locator('[data-cy="smart-bar-transfer"]');
        this.qrInvoiceButton = this.widget.locator('[data-cy="smart-bar-qr-invoice"]');
        this.ibanInput = this.widget.locator('[data-cy="smart-bar-input"]').filter({ hasText: /IBAN|Konto/i });
        this.recipientNameInput = this.widget.locator('[data-cy="smart-bar-input"]').filter({ hasText: /Name/i });
        this.paymentInfoInput = this.widget.locator('[data-cy="smart-bar-input"]').filter({ hasText: /Zahlungsinfo/i });
    }

    /**
     *  Verifies that the payment widget is visible on the landing page by checking for the visibility of the title, 
     *  transfer button, and QR invoice button elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.transferButton).toBeVisible();
        await expect(this.qrInvoiceButton).toBeVisible();
    }

    /**
     *  Verifies that the payment widget is available on the landing page by checking for the presence of the title, 
     *  transfer button, and QR invoice button elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        await expect(this.transferButton).toBeAttached();
        await expect(this.qrInvoiceButton).toBeAttached();
    }
    /**
     * Verifies the content of the payment widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}

/**
 * Represents the eBill widget on the landing page, providing access to various elements related to eBills, such as the title, help button, list of eBills, and link to the eBill portal.
 * This class allows for interaction with the eBill widget and verification of its visibility on the landing this.widget.
 * "eBill" is a digital billing service.
 */
export class EBillWidget extends WidgetBase {
    readonly list: Locator;  // The Locator object representing the list of eBills.
    readonly portalLink: Locator;  // The Locator object representing the link to the eBill portal.

    constructor(page: Page) {
        super(page, "ebill", "EBILL");
        this.list = this.widget.locator('[data-cy="list-ebill"]');
        this.portalLink = this.widget.locator('[data-cy="portal-link"]');
    }

    /**
     * Verifies that the eBill widget is visible on the landing page by checking for the visibility of the title and list elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.list).toBeVisible();
    }
    
    /**
     * Verifies that the eBill widget is available on the landing page by checking for the presence of the title and list elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        await expect(this.list).toBeAttached();
    }
    /**
     * Verifies the content of the eBill widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}

/**
 *  Represents the analytics widget on the landing page, providing access to various elements related to analytics, 
 *  such as the title, settings button, help button, chart, and link to the analytics overview.
 *  This class allows for interaction with the analytics widget and verification of its visibility on the landing page.
 *  "Analysen" is the German term for "analytics"
 */
export class AnalyticsWidget extends WidgetBase {
    readonly settingsButton: Locator;
    readonly chart: Locator;
    readonly overviewLink: Locator;

    constructor(page: Page) {
        super(page, "financeCoachBalance", "ANALYTICS");
        this.settingsButton = this.widget.locator('[data-testid="widget-settings-button"]').first();
        this.chart = this.widget.locator('[data-cy="widget-content"]').first();
        this.overviewLink = this.widget.locator('[data-testid="fa-balance-link-analysis-overview"]');
    }

    /**
     * Verifies that the analytics widget is visible on the landing page by checking for the visibility of 
     * the title and chart elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.chart).toBeVisible();
    }
    /**
     * Verifies that the analytics widget is attached on the landing page by checking for the presence of
     *  the title and chart elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        await expect(this.chart).toBeAttached();
    }

    /**
     * Verifies the content of the analytics widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}

/**
 * Represents the assets widget on the landing page, providing access to various elements related to assets, such as the title, help button, details button, and rows of asset information.
 * This class allows for interaction with the assets widget and verification of its visibility on the landing page.
 * "Vermögensübersicht" is the German term for "asset overview", which refers to a summary of an individual's or organization's financial assets and holdings.
 */
export class AssetsWidget extends WidgetBase {
    readonly detailsButton: Locator;
    readonly rows: Locator;

    constructor(page: Page) {
        super(page, "balanceSheet", "ASSETS");
        this.helpButton = this.widget.locator('[data-testid="widget-help-button"]').nth(1);    // why nth first ? 
        this.detailsButton = this.widget.locator('[data-cy="show-details-button"]');
        this.rows = this.widget.locator('[data-testid="description-cell"]');
    }

    /**
     * Verifies that the assets widget is visible on the landing page by checking for the visibility of the title 
     * and rows elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        const count = await this.rows.count();
        await expect(count).toBeGreaterThan(0);
    }
    /**
     * Verifies that the assets widget is attached on the landing page by checking for the presence of the title and row elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        const count = await this.rows.count();
        await expect(count).toBeGreaterThan(0)
    }

    /**
     * Verifies the content of the assets widget table for the given language.
     * Checks that all expected account labels are visible with their corresponding values.
     */
    async verifyContent(language: Language) {
        const { ASSET_TABLE_LABELS } = await import('./types');
        
        // Verify each expected row label exists
        const expectedLabels = [
            ASSET_TABLE_LABELS.PAYMENT_ACCOUNTS[language],
            ASSET_TABLE_LABELS.SAVINGS_ACCOUNTS[language],
            ASSET_TABLE_LABELS.INVESTED_ASSETS[language],
            ASSET_TABLE_LABELS.PENSION_SAVINGS[language],
            ASSET_TABLE_LABELS.OTHER_BANK_ACCOUNTS[language],
            ASSET_TABLE_LABELS.TOTAL[language],
        ];

        for (const label of expectedLabels) {
            // Use getByText for more reliable text matching across languages
            const labelLocator = this.widget.getByText(label);
            await expect(labelLocator).toBeVisible();
        }
    }
}

/**
 * Represents the credit card widget on the landing page, providing access to various elements related to credit cards, such as the title, help button, amount, currency, and details button.
 * This class allows for interaction with the credit card widget and verification of its visibility on the landing this.widget.
 * "Kreditkarte" is the German term for "credit card", which refers to a payment card that allows users to borrow funds from a financial institution to make purchases or withdraw cash.
 */
class CreditCardWidget extends WidgetBase {
    readonly amount: Locator;
    readonly currency: Locator;
    readonly detailsButton: Locator;

    constructor(page: Page, cv: string = "credit-card-widget") {
        super(page, cv, "CREDIT_CARD");
        this.helpButton = page.locator('[data-testid="widget-help-button"]').nth(2);        // why nth second ?
        this.amount = this.widget.locator('[data-cy-fpui-amount]');
        this.currency = this.widget.locator('[data-cy-fpa-currency="CHF"]');
        this.detailsButton = this.widget.locator('[data-cy="show-details-button"]').first();
    }

    /**
     * Verifies that the credit card widget is visible on the landing page by checking for the visibility of the title and amount elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        const count = await this.amount.count();
        await expect(count).toBeGreaterThan(0);
    }
     /**
     * Verifies that the credit card widget is attached on the landing page by checking 
     * for the presence of the title and amount elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        const count = await this.amount.count();
        await expect(count).toBeGreaterThan(0);
    }

    /**
     * Verifies the content of the credit card widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}

/**
 * Business Credit Card
 */
export class CreditCardWidgetBusiness extends CreditCardWidget {
    constructor(page: Page) {
        super(page, "credit-card-0000000000000020_22_0");
        // TODO check for Business title
    }
}

/**
 * First Credit Card on the page
 */
export class CreditCardWidget1 extends CreditCardWidget {
    constructor(page: Page) {
        super(page, "credit-card-0000000000000000_22_0");
    }
}

/**
 * sEcond Credit Card on the page
 */
export class CreditCardWidget2 extends CreditCardWidget {
    constructor(page: Page) {
        super(page, "credit-card-0000000000000010_22_0");
    }
}

/**
 * Represents the quick links widget on the landing page, providing access to various quick links for navigation within the application.
 * This class allows for interaction with the quick links widget and verification of its visibility on the landing page.
 */
class QuickLinksWidget extends WidgetBase {
    readonly page: Page;
    readonly container: Locator;
    readonly linkByText: (text: string) => Locator;

    constructor(page: Page, cv: string, titleKey: string = "QUICK_LINKS") {
        super(page, cv, titleKey);
        this.page = page;
        this.container = page.locator(`[data-cy="${cv}"]`);
        // containing links with text, e.g. "Zahlungen" or "Kontoüberträge"
        this.linkByText = (text: string) => this.container.locator('a', { hasText: text });
    }

    /**
     *  Verifies that the quick links widget is visible on the landing page by checking for the presence of the container element.
     */
    async expectVisible() {
        await expect(this.container).toBeVisible();
    }

    /**
     *  Verifies that the quick links widget is attached on the landing page by checking for the presence of the container element.
     */
    async expectAvailable() {
        await expect(this.container).toBeAttached();
    }

    /**
     * Check for if link is visible in the quick links widget by checking for the presence of a link with the specified text.
     * @param text the text of the quick link 
     */
    async expectContainsLinkVisible(text: string) {
        await expect(this.linkByText(text)).toBeVisible();
    }

    /**
     * Check for if link is  available in the quick links widget by checking for the presence of a link with the specified text.
     * @param text the text of the quick link 
     */
    async expectContainsLink(text: string) {
        await expect(this.linkByText(text)).toBeAttached();
    }

    /**
     * Verifies the content of the quick links widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}

export class EditPaymentWidget extends QuickLinksWidget {
    constructor(page: Page) {
        super(page, "editPayment", "EDIT_PAYMENT");
    }
    // TODO check All Links "Zahlungen", "Kontoüberträge"
}
export class SearchWidget extends QuickLinksWidget {
    constructor(page: Page) {
        super(page, "search", "SEARCH");
    }
    // TODO check All Links "Zahlungsauftrag EZAG", "Einzelauftrag EZAG"
}
export class EnquiryWidget extends QuickLinksWidget {
    constructor(page: Page) {
        super(page, "enquiry", "ENQUIRY");
    }
    // TODO check All Links "Übersicht", "Einzelsuche", "Sammelsuche"
}


/**
 * Represents the movement overview widget on the landing page, providing access to various elements related to movements, 
 * such as the title, settings button, help button, balance table, and links to all movements and all orders.
 * This class allows for interaction with the movement overview widget and verification of its visibility on the landing this.widget.
 * "Bewegungsübersicht"
 */
export class MovementOverviewWidget extends WidgetBase {
    readonly settingsButton: Locator;
    readonly balanceTable: Locator;
    readonly allMovementsLink: Locator;
    readonly allOrdersLink: Locator;

    constructor(page: Page) {
        super(page, "movements", "MOVEMENTS");
        this.settingsButton = this.widget.locator('[data-testid="widget-settings-button"]').nth(1);
        this.helpButton = this.widget.locator('[data-testid="widget-help-button"]').nth(3); // TODO why 3rd
        this.balanceTable = this.widget.locator('[data-testid="lastMovements-table"]');
        this.allMovementsLink = this.widget.locator('[data-testid="interactiveLink-AllMovements"]');
        this.allOrdersLink = this.widget.locator('[data-testid="interactiveLink-AllOrders"]');
    }

    /**
     *  Verifies that the movement overview widget is visible on the landing page by checking for the visibility of the title and balance table elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.balanceTable).toBeVisible();
    }

     /**
     *  Verifies that the movement overview widget is attached on the landing page by checking for the 
     *  presence of the title and balance table elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        await expect(this.balanceTable).toBeAttached();
    }

    /**
     * Verifies the content of the movement overview widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}
/**
 * Overview EZAG widget on the landing page, providing access to various elements related to EZAG (Elektronische Zahlungsaufträge).
 * "Übersicht EZAG"
 */
export class EpoOverview extends WidgetBase {
    readonly page: Page;
    constructor(page: Page) {
        super(page, "epoOverview", "EPO_OVERVIEW");
        this.page = page;
    }
    /**
     *  Verifies that the movement overview widget is visible on the landing page by checking for the visibility of the title.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
    }

    /**
     *  Verifies that the movement overview widget is attached on the landing page by checking for the presence of the title in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
    }
       

    /**
     * Verifies the content of the EPO overview widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}
/**
 * Represents the file upload widget on the landing page, providing access to various elements related to file uploads, such as the title and uploader area.
 * This class allows for interaction with the file upload widget and verification of its visibility on the landing page. 
 * "EZAG übermitteln" is the German term for "Submit EZAG", which refers to the process of submitting files or documents related to EZAG (Elektronische Zahlungsaufträge) through the file upload widget.
 */
export class FileUploadWidget extends WidgetBase {
    readonly uploader: Locator;

    constructor(page: Page) {
        super(page, "epoUpload", "FILE_UPLOAD");      
        this.uploader = this.widget.locator('[data-testid="fileUploader-content"]');
    }

    /**
     *  Verifies that the FileUploadWidget widget is visible on the landing page by checking for the visibility of the title and uploader button.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.uploader).toBeVisible();
    }

    /**
     *  Verifies that the FileUploadWidget widget is attached on the landing page by checking for the presence of the title and uploader button elements in the DOM.
     */
    async expectAvailable() {
        await expect(this.title).toBeAttached();
        await expect(this.uploader).toBeAttached();
    }
    /**
     * Verifies the content of the file upload widget.
     */
    async verifyContent(language: Language) {
        // Override in child classes if needed
    }
}