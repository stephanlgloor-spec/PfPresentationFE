import { expect, type Locator, type Page } from '@playwright/test';
import { PaymentWidget, EBillWidget, AnalyticsWidget, AssetsWidget, CreditCardWidget2, CreditCardWidget1, CreditCardWidgetBusiness, QuickLinksWidget, MovementOverviewWidget, FileUploadWidget, SearchWidget, EpoOverview, EditPaymentWidget, EnquiryWidget } from './homePage';
import { LAPTOP, Viewport } from './types';

/**
 * The LandingPage class represents the landing page of the application. It provides access to various widgets and navigation elements on the page, allowing for interaction and verification of their visibility and functionality.
 * This page is the landing page of the application, which contains various widgets and navigation elements.
 * It provides methods to interact with the page and verify its state, such as checking if the page has loaded and if specific widgets are visible.
 */
export class LandingPage {
  
  readonly page: Page;  // The Playwright Page object representing the current page.
  readonly platformSwitchLinks: PlatformswitchLinks;  // The PlatformswitchLinks object representing the platform switch links on the landing page.
  readonly nav: NavigationBar;  //  The NavigationBar object representing the navigation bar on the landing page.
  readonly paymentWidget: PaymentWidget;  // The PaymentWidget object representing the payment widget on the landing page.
  readonly ebillWidget: EBillWidget;  //  The EBillWidget object representing the eBill widget on the landing page.
  readonly analyticsWidget: AnalyticsWidget;  //    The AnalyticsWidget object representing the analytics widget on the landing page.
  readonly assetsWidget: AssetsWidget;  // The AssetsWidget object representing the assets widget on the landing page.  
  readonly creditCardWidget1: CreditCardWidget1;  //  The CreditCardWidget object representing the credit card widget on the landing page.
  readonly creditCardWidgetBusiness: CreditCardWidgetBusiness;  //  The CreditCardWidget object representing the credit card widget on the landing page.      
  readonly creditCardWidget: CreditCardWidget2;  //  The CreditCardWidget object representing the credit card widget on the landing page.
  readonly movementOverview: MovementOverviewWidget;  // The MovementOverviewWidget object representing the movement overview widget on the landing page.
  readonly fileUploadWidget: FileUploadWidget;    // The FileUploadWidget object representing the file upload widget on the landing page.
  readonly searchWidget: SearchWidget;  // The SearchWidget object representing the search widget on the landing page.
  readonly enquiryWidget: EnquiryWidget;  // The EnquiryWidget object representing the enquiry widget on the landing page.
  readonly editPaymentWidget: EditPaymentWidget;  // The EditPaymentWidget object representing the edit payment widget on the landing page.
  readonly epoOverview: EpoOverview;  // The EpoOverview object representing the EPO overview widget on the landing page.

  /**
   * Initializes a new instance of the LandingPage class with the specified Playwright Page object.
   * @param page The Playwright Page object representing the current page.
   */
  constructor(page: Page) {
    this.page = page;
    this.platformSwitchLinks = new PlatformswitchLinks(page);
    this.nav = new NavigationBar(page);
    this.paymentWidget = new PaymentWidget(page);
    this.ebillWidget = new EBillWidget(page);
    this.analyticsWidget = new AnalyticsWidget(page);
    this.assetsWidget = new AssetsWidget(page);
    this.creditCardWidget = new CreditCardWidget2(page);
    this.creditCardWidget1 = new CreditCardWidget1(page);
    this.creditCardWidgetBusiness = new CreditCardWidgetBusiness(page);
    this.movementOverview = new MovementOverviewWidget(page);
    this.fileUploadWidget = new FileUploadWidget(page);
    this.searchWidget = new SearchWidget(page);
    this.enquiryWidget = new EnquiryWidget(page);
    this.editPaymentWidget = new EditPaymentWidget(page);
    this.epoOverview = new EpoOverview(page);
  }

  /**
   * Navigates to the landing page by going to the root URL ('/').
   * This method uses the Playwright Page object to perform the navigation.
   * It is an asynchronous method that returns a Promise, allowing for proper handling of the navigation process.
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Verifies that the landing page has loaded by checking for the presence of specific elements on the page.
   * This method uses the Playwright expect function to assert that the navigation bar and widget titles are present on the page.
   * It is an asynchronous method that returns a Promise, allowing for proper handling of the verification process.
   */
  async expectPageLoaded(viewport: Viewport = LAPTOP) {
    // first menu item is visible 
    if (viewport.width <= 768) {
      // mobile viewport
      await this.page.getByTestId("burgerMenu-button").first().waitFor({ state: 'visible' });
      const widgetTitles = await this.page.getByTestId("widget-title").count();
      expect(widgetTitles).toBeGreaterThan(0);
    } else {
      // laptop viewport
      await this.page.getByTestId("desktop-navbar-item").first().waitFor({ state: 'visible' });
      // check for all menu items 
      const count = await this.page.getByTestId("desktop-navbar-item").count();
      await expect(count).toBeGreaterThan(0);
      const widgetTitles = await this.page.getByTestId("widget-title").count();
      expect(widgetTitles).toBeGreaterThan(0);
      await this.platformSwitchLinks.expectPlatformLinksAvailable();
      await this.nav.expectMenuAvailable();
    }
    // check if widgets are on the page and attached in the DOM
    await this.paymentWidget.expectAvailable();
    await this.ebillWidget.expectAvailable();
    await this.analyticsWidget.expectAvailable();
    await this.assetsWidget.expectAvailable();
    await this.creditCardWidget.expectAvailable();
    await this.creditCardWidget1.expectAvailable();
    await this.creditCardWidgetBusiness.expectAvailable();
    await this.movementOverview.expectAvailable();
    await this.fileUploadWidget.expectAvailable(); 
    await this.searchWidget.expectAvailable();
    await this.enquiryWidget.expectAvailable();
    await this.editPaymentWidget.expectAvailable();
    await this.epoOverview.expectAvailable();

  }
}

/**
 * The menu items available in the navigation bar of the landing page. Each item corresponds to a specific section or feature of the application, allowing users to navigate to different parts of the application from the landing page.
 */
export enum MenuItem {
  Home = "Home",
  Assets = "Assets",
  Payments = "Payments",
  Epo = "Epo",
  Documents = "Documents",
  Insurances = "Insurances",
  Offers = "Offers",
}

/**
 * Represents the navigation bar widget on the landing page.
 */
export class NavigationBar {
  readonly page: Page;
  readonly menuItems: Locator;
  readonly searchButton: Locator;
  readonly newsButton: Locator;
  readonly settingsButton: Locator;
  readonly logoutButton: Locator;
  readonly hamburgerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuItems = page.getByTestId("desktop-navbar-item");
    this.searchButton = page.locator('[data-cy="Search"]');
    this.newsButton = page.locator('[data-cy="NewsAndNotifications"]');
    this.settingsButton = page.locator('[data-cy="SettingsAndProfile"]');
    this.logoutButton = page.locator('[data-cy="Logout"]');
    this.hamburgerButton = page.locator('[data-cy="hamburger-menu"]');
  }

  /**
   * Clicks on a menu item in the navigation bar.
   * @param name the menu item to click
   */
  async clickMenuItem(name: MenuItem) {
    this.page.getByTestId(name.toString()).click();
  }

  /**
   * Verifies that the navigation bar menu is available by checking that there is at least one menu item present.
   */
  async expectMenuAvailable() {
    const count = await this.menuItems.count();
    expect(count).toBeGreaterThan(0);
  }
}


/**
 * Represents the platform switch links on the top of landing page, allowing users to navigate between different platforms within the application.
 * This class provides methods to interact with the platform switch links and verify their visibility on the landing page.
 */
export class PlatformswitchLinks {
  readonly page: Page;
  readonly platformEfinanceLink: Locator;
  readonly platformMepoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.platformEfinanceLink = page.getByTestId('PlatformEfinance');
    this.platformMepoLink = page.getByTestId('PlatformMepo');

  }

  public async clickPlatformEfinanceLink() {
    await this.platformEfinanceLink.isVisible();
    await this.platformEfinanceLink.click();
  }

  public async clickPlatformMepoLink() {
    await this.platformMepoLink.isVisible();
    await this.platformMepoLink.click();
  }

  /**
   * Verifies that the platform switch links are available by checking that there is at least one link for each platform present on the landing page.
   */
  async expectPlatformLinksAvailable() {
    const countEfinance = await this.platformEfinanceLink.count();
    expect(countEfinance).toBeGreaterThan(0);
    const countMepo = await this.platformMepoLink.count();
    expect(countMepo).toBeGreaterThan(0);
  }
}


export default LandingPage;
