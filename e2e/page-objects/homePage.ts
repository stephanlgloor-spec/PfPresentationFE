import { expect, type Locator, type Page } from '@playwright/test';
export class WidgetBase {
    readonly page: Page;
    protected helpButton: Locator = undefined as unknown as Locator;  // The Locator object representing the help button within the widget, initialized as undefined and cast to Locator type.
    readonly title: Locator;  //  The Locator object representing the title of the payment widget, filtered to match specific text related to payments or standing orders.
    protected widget: Locator;
    // constructor(page: Page, titleText: string | RegExp, helpButton: boolean = false) {
    //     this.page = page;

    //     // TODO: check language
    //     this.title = page.locator('[data-testid="widget-title"]'); // .filter({ hasText: titleText });
    //     if (helpButton) {
    //         this.helpButton = this.page.locator('[data-testid="widget-help-button"]').first();
    //     }
    // }
    constructor(page: Page, cv: string, titleText: string | RegExp, helpButton: boolean = false) {
        this.page = page;
        // locate the widget title by data-cy attribute, which is unique for each widget, and filter by the provided cv (component version) string
        this.widget = page.locator(`[data-cy="${cv}"]`);
        // TODO: check language
        this.title = this.widget.locator('[data-testid="widget-title"]'); // .filter({ hasText: titleText });
        if (helpButton) {
            this.helpButton = this.widget.locator('[data-testid="widget-help-button"]').first();
        }
    }
}
/**
 * Represents the payment widget on the landing page, providing access to various elements related to payments, such as buttons and input fields for IBAN, recipient name, and payment information.
 * "Zahlung / Dauerauftrag erfassen" is the German term for "record payment", which refers to the process of entering payment details into the payment widget.
 */
export class PaymentWidget extends WidgetBase {
    readonly page: Page;  // The Playwright Page object representing the current page.
    readonly transferButton: Locator; // The Locator object representing the transfer button within the payment widget, identified by a specific data-cy attribute.
    readonly qrInvoiceButton: Locator;
    readonly ibanInput: Locator;
    readonly recipientNameInput: Locator;
    readonly paymentInfoInput: Locator;

    constructor(page: Page) {
        super(page, "smartbar", /Zahlung|Dauerauftrag erfassen/i);
        this.page = page;
        this.transferButton = this.widget.locator('[data-cy="smart-bar-transfer"]');
        this.qrInvoiceButton = this.widget.locator('[data-cy="smart-bar-qr-invoice"]');
        this.ibanInput = this.widget.locator('[data-cy="smart-bar-input"]').filter({ hasText: /IBAN|Konto/i });
        this.recipientNameInput = this.widget.locator('[data-cy="smart-bar-input"]').filter({ hasText: /Name/i });
        this.paymentInfoInput = this.widget.locator('[data-cy="smart-bar-input"]').filter({ hasText: /Zahlungsinfo/i });
    }

    /**
     *  Verifies that the payment widget is visible on the landing page by checking for the presence of the title, transfer button, and QR invoice button elements.
     *  This method uses the Playwright expect function to assert that these elements are visible on the page.
     *  It is an asynchronous method that returns a Promise, allowing for proper handling of the verification process.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.transferButton).toBeVisible();
        await expect(this.qrInvoiceButton).toBeVisible();
    }
}

/**
 * Represents the eBill widget on the landing page, providing access to various elements related to eBills, such as the title, help button, list of eBills, and link to the eBill portal.
 * This class allows for interaction with the eBill widget and verification of its visibility on the landing this.widget.
 * "eBill" is a digital billing service that allows users to receive and manage their bills electronically, providing a convenient and secure way to handle billing information.
 */
export class EBillWidget extends WidgetBase {
    readonly list: Locator;  // The Locator object representing the list of eBills.
    readonly portalLink: Locator;  // The Locator object representing the link to the eBill portal.

    constructor(page: Page) {
        super(page, "ebill", /eBill|EBill/i);
        this.list = this.widget.locator('[data-cy="list-ebill"]');
        this.portalLink = this.widget.locator('[data-cy="portal-link"]');
    }

    /**
     * Verifies that the eBill widget is visible on the landing page by checking for the presence of the title and list elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.list).toBeVisible();
    }
}

/**
 *  Represents the analytics widget on the landing page, providing access to various elements related to analytics, such as the title, settings button, help button, chart, and link to the analytics overview.
 *  This class allows for interaction with the analytics widget and verification of its visibility on the landing page.
 *  "Analysen" is the German term for "analytics", which refers to the systematic computational analysis of data or statistics, often used to gain insights and make informed decisions.
 */
export class AnalyticsWidget extends WidgetBase {
    readonly settingsButton: Locator;
    readonly chart: Locator;
    readonly overviewLink: Locator;

    constructor(page: Page) {
        super(page, "financeCoachBalance", /Analysen/i);
        this.settingsButton = this.widget.locator('[data-testid="widget-settings-button"]').first();
        this.chart = this.widget.locator('[data-cy="widget-content"]').first();
        this.overviewLink = this.widget.locator('[data-testid="fa-balance-link-analysis-overview"]');
    }

    /**
     * Verifies that the analytics widget is visible on the landing page by checking for the presence of the title and chart elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.chart).toBeVisible();
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
        super(page, "balanceSheet", /Vermögensübersicht/i);
        this.helpButton = this.widget.locator('[data-testid="widget-help-button"]').nth(1);    // why nth first ? 
        this.detailsButton = this.widget.locator('[data-cy="show-details-button"]');
        this.rows = this.widget.locator('[data-testid="description-cell"]');
    }

    /**
     * Verifies that the assets widget is visible on the landing page by checking for the presence of the title and rows elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        const count = await this.rows.count();
        await expect(count).toBeGreaterThan(0);
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
        super(page, cv, /Kreditkarte/i);
        this.helpButton = page.locator('[data-testid="widget-help-button"]').nth(2);        // why nth second ?
        this.amount = this.widget.locator('[data-cy-fpui-amount]');
        this.currency = this.widget.locator('[data-cy-fpa-currency="CHF"]');
        this.detailsButton = this.widget.locator('[data-cy="show-details-button"]').first();
    }

    /**
     * Verifies that the credit card widget is visible on the landing page by checking for the presence of the title and amount elements.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        const count = await this.amount.count();
        await expect(count).toBeGreaterThan(0);
    }
}


export class CreditCardWidgetBusiness extends CreditCardWidget {
    // check for data-cy="credit-card-0000000000000020_22_0"
    constructor(page: Page) {
        super(page, "credit-card-0000000000000020_22_0");
    }
}

export class CreditCardWidget1 extends CreditCardWidget {
    // check for data-cy="credit-card-0000000000000000_22_0"
    constructor(page: Page) {
        super(page, "credit-card-0000000000000000_22_0");
    }
}
export class CreditCardWidget2 extends CreditCardWidget {
    // check for data-cy="credit-card-0000000000000010_22_0"
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

    constructor(page: Page, cv: string, titleText: string | RegExp = /Quicklinks/i) {
        super(page, cv, titleText);
        this.page = page;
        this.container = page.locator(`[data-cy="${cv}"]`);
        // containing links with text, e.g. "Zahlungen" or "Kontoüberträge"
        this.linkByText = (text: string) => this.container.locator('a', { hasText: text });
    }


    /**
     *  Verifies that the quick links widget is visible on the landing page by checking for the presence of the container element.
     *  This method uses the Playwright expect function to assert that the container element is visible on the page.
     *  It is an asynchronous method that returns a Promise, allowing for proper handling of the verification process.
     */
    async expectVisible() {
        await expect(this.container).toBeVisible();
    }

    /**
     * Check for if inks is availabl e in the quick links widget by checking for the presence of a link with the specified text.
     * @param text the text üf the quick link 
     */
    async expectContainsLink(text: string) {
        await expect(this.linkByText(text)).toBeVisible();
    }
}
export class EditPaymentWidget extends QuickLinksWidget {
    constructor(page: Page) {
        super(page, "editPayment", "Zahlungen suchen");
    }
}

export class SearchWidget extends QuickLinksWidget {
    constructor(page: Page) {
        super(page, "search", "EZAG / CH-DD suchen ");
    }
}
export class EnquiryWidget extends QuickLinksWidget {
    constructor(page: Page) {
        super(page, "enquiry", "Nachforschungen");
    }
}


/**
 * Represents the movement overview widget on the landing page, providing access to various elements related to movements, such as the title, settings button, help button, balance table, and links to all movements and all orders.
 * This class allows for interaction with the movement overview widget and verification of its visibility on the landing this.widget.
 * "Bewegungsübersicht"
 */
export class MovementOverviewWidget extends WidgetBase {
    // readonly title: Locator;
    readonly settingsButton: Locator;
    readonly helpButton: Locator;
    readonly balanceTable: Locator;
    readonly allMovementsLink: Locator;
    readonly allOrdersLink: Locator;

    constructor(page: Page) {
        super(page, "movements", /Bewegungsübersicht/i);
        // this.title = this.widget.locator('[data-cv="widget-title"]'); // TODO check the language .filter({ hasText: /Bewegungsübersicht/i });
        this.settingsButton = this.widget.locator('[data-testid="widget-settings-button"]').nth(1);
        this.helpButton = this.widget.locator('[data-testid="widget-help-button"]').nth(3);
        this.balanceTable = this.widget.locator('[data-testid="lastMovements-table"]');
        this.allMovementsLink = this.widget.locator('[data-testid="interactiveLink-AllMovements"]');
        this.allOrdersLink = this.widget.locator('[data-testid="interactiveLink-AllOrders"]');
    }

    /**
     *  Verifies that the movement overview widget is visible on the landing page by checking for the presence of the title and balance table elements.
     *  This method uses the Playwright expect function to assert that these elements are visible on the page.
     *  It is an asynchronous method that returns a Promise, allowing for proper handling of the verification process.
     */
    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.balanceTable).toBeVisible();
    }
}
/**
 * Overview EZAG widget on the landing page, providing access to various elements related to EZAG (Elektronische Zahlungsaufträge), such as the title and balance table.
 * "Übersicht EZAG"
 */
export class EpoOverview extends WidgetBase {
    readonly page: Page;
    constructor(page: Page) {
        super(page, "epoOverview", /Übersicht EZAG/i);
        this.page = page;
    }
    /**
 *  Verifies that the movement overview widget is visible on the landing page by checking for the presence of the title and balance table elements.
 *  This method uses the Playwright expect function to assert that these elements are visible on the page.
 *  It is an asynchronous method that returns a Promise, allowing for proper handling of the verification process.
 */
    async expectVisible() {
        await expect(this.title).toBeVisible();
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
        super(page, "epoUpload", /EZAG übermitteln/i);      
        this.uploader = this.widget.locator('[data-testid="fileUploader-content"]');
    }

    async expectVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.uploader).toBeVisible();
    }
}