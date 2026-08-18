/**
 * This test suite contains end-to-end tests for the landing page of the application. It verifies that the landing page loads correctly and that all outgoing links are functional.
 */
import { expect, test } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { LandingPage } from './page-objects/landingPage';
import { Language, LAPTOP, MOBILE } from './page-objects/types';
import MepoPage from './page-objects/MepoPage';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/**
 * This test is designed to be language-neutral, ensuring that they work regardless of the language settings of the application.
 */
  test('Alles In Allem - Landing Page - language neutral - two different viewports', async ({ page }) => {
  // FIXME  two view ports visible
  for (const viewport of [LAPTOP, MOBILE]) {
    console.log(`test for viewport size = ${viewport.height} , ${viewport.width}`);
    // change viewport
    await page.setViewportSize(viewport);
    // navigate to the landing page
    await page.goto('/ap/ga/ob/html/finance/home');
    const landingPage = new LandingPage(page);
    // check that landing page and content is loaded properly and all content is visible
    await landingPage.expectPageLoaded(viewport);
  }
});

/**
 * Test with text in specific language for language setting German
 */
test('Check all texts in German', async ({ page }) => {
  // sufficient to check the visibility
  await page.setViewportSize({ width: 1960, height: 1440 });
  // navigate to the page
  await page.goto('/ap/ga/ob/html/finance/home');
  const landingPage = new LandingPage(page);
  
  // Verify widget titles in German
  await landingPage.paymentWidget.verifyTitle(Language.DE);
  await landingPage.ebillWidget.verifyTitle(Language.DE);
  await landingPage.analyticsWidget.verifyTitle(Language.DE);
  await landingPage.assetsWidget.verifyTitle(Language.DE);
  await landingPage.creditCardWidget.verifyTitle(Language.DE);
  await landingPage.creditCardWidget1.verifyTitle(Language.DE);
  await landingPage.creditCardWidgetBusiness.verifyTitle(Language.DE);
  await landingPage.movementOverview.verifyTitle(Language.DE);
  await landingPage.fileUploadWidget.verifyTitle(Language.DE);
  await landingPage.epoOverview.verifyTitle(Language.DE);
  // TODO quick links widget Edit, Search and Enquiry
  
  // Verify widget-specific content in German
  await landingPage.paymentWidget.verifyContent(Language.DE);
  await landingPage.ebillWidget.verifyContent(Language.DE);
  await landingPage.analyticsWidget.verifyContent(Language.DE);
  await landingPage.assetsWidget.verifyContent(Language.DE);
  await landingPage.creditCardWidget.verifyContent(Language.DE);
  await landingPage.creditCardWidget1.verifyContent(Language.DE);
  await landingPage.creditCardWidgetBusiness.verifyContent(Language.DE);
  await landingPage.movementOverview.verifyContent(Language.DE);
  await landingPage.fileUploadWidget.verifyContent(Language.DE);
  await landingPage.epoOverview.verifyContent(Language.DE);
  // TODO quick links widget Edit, Search and Enquiry
});

test('Check all texts in French', async ({ page }) => {
  // navigate to the page post finance Francais
  await page.goto('/fr');
  // navigate to the page for the demo
  await page.goto('/ap/ga/ob/html/finance/home');
  const landingPage = new LandingPage(page);
  
  // Verify widget titles in French
  await landingPage.paymentWidget.verifyTitle(Language.FR);
  await landingPage.ebillWidget.verifyTitle(Language.FR);
  await landingPage.analyticsWidget.verifyTitle(Language.FR);
  await landingPage.assetsWidget.verifyTitle(Language.FR);
  await landingPage.creditCardWidget.verifyTitle(Language.FR);
  await landingPage.creditCardWidget1.verifyTitle(Language.FR);
  await landingPage.creditCardWidgetBusiness.verifyTitle(Language.FR);
  await landingPage.movementOverview.verifyTitle(Language.FR);
  await landingPage.fileUploadWidget.verifyTitle(Language.FR);
  await landingPage.epoOverview.verifyTitle(Language.FR);
  // TODO quick links widget Edit, Search and Enquiry
  
  // Verify widget-specific content in French
  await landingPage.paymentWidget.verifyContent(Language.FR);
  await landingPage.ebillWidget.verifyContent(Language.FR);
  await landingPage.analyticsWidget.verifyContent(Language.FR);
  await landingPage.assetsWidget.verifyContent(Language.FR);
  await landingPage.creditCardWidget.verifyContent(Language.FR);
  await landingPage.creditCardWidget1.verifyContent(Language.FR);
  await landingPage.creditCardWidgetBusiness.verifyContent(Language.FR);
  await landingPage.movementOverview.verifyContent(Language.FR);
  await landingPage.fileUploadWidget.verifyContent(Language.FR);
  await landingPage.epoOverview.verifyContent(Language.FR);
  // TODO quick links widget Edit, Search and Enquiry
});

/**
 * This test verifies all links working properly on the landing page. It navigates to the landing page, 
 * checks that the page has loaded, and then verifies that all outgoing links are functional.
 */
test('Check all outgoing links', async ({ page }) => {
  // navigate to the page
  await page.goto('/ap/ga/ob/html/finance/home');
  const landingPage = new LandingPage(page);
  // check page is loaded properly and all content is visible
  await landingPage.expectPageLoaded();
  // check outgoing links are working properly
  // only some of the links are tested ... because is demo mode and some links are not working properly  
  // check Merchant Portal link is working properly
  await page.getByTestId("PlatformMepo").click();
  //FIXME  await landingPage.platformSwitchLinks.clickPlatformEfinanceLink();
  await page.waitForURL(/\/merchant-portal\/analytics/);  // wait for the new page to open
 // FIXME await new MepoPage(page).expectMenuItemsVisible();  // check if the page is loaded properly by checking if the menu items are visible 
  // check E-Finance Portal link is working properly
  await page.getByTestId("PlatformEfinance").click();
  // FIXME: await landingPage.platformSwitchLinks.clickPlatformMepoLink();

  // await landingPage.nav.expectMenuVisible();  // check if the page is loaded properly by checking if the menu items are visible
 // await new MepoPage(page).expectMenuItemsVisible();  // check if the page is loaded properly by checking if the menu items are visible
   // check E-Finance Portal link is working properly
  await page.waitForURL(/\/finance\/home/);  // wait for the new page to open
  // FIXME: await landingPage.nav.expectMenuVisible();  // check if the page is loaded properly by checking if the menu items are visible
});


/**
 * Check all possible movements and if correct displays the last movements
 */
test('check all movements ', async ({ page }) => {
  // TODO
  // test the dropdown for movements and also check if REST API was called for endpoints 
});


/**
 * Activate multi-banking for assets (Demo Version does not allow this!).
 * This uses getByText to find the elements and click on them. It is a more robust way to find elements than using locators.
 */
test('activate multi-banking', async ({ page }) => {
  // navigate to the page in German language
  await page.goto('/ap/ga/ob/html/finance/home');

  // select the assets widget and click on the "show details" button to navigate to the assets overview page
  const assetsWidget = page.locator('[data-cy="balanceSheet"]');
  await expect(assetsWidget).toBeVisible();
  await assetsWidget.locator('[data-cy="show-details-button"]').click();

  // wait for the assets overview page to load
  await expect(page.locator('#page-title')).toContainText('Vermögensübersicht');

  // select the multi-banking card and click on the "add third-party bank" button to navigate to the multi-banking activation page
  const multiBankingCard = page.getByText('Multibanking', { exact: true });
  await expect(multiBankingCard).toBeVisible();
  await page.getByText('Drittbank hinzufügen', { exact: true }).click();
  await expect(page.locator('#page-title')).toContainText('Multibanking aktivieren');

  // Click on Dropdown and select the bank "ZKAPB" from the list. Then click on the "Weiter" button to proceed to the next step.
  const bankSelect = page.getByTestId('selectedBank-select-multiple');
  await expect(bankSelect).toBeVisible();
  await bankSelect.click();
  await page.getByText('ZKAPB', { exact: false }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();

  // Check the step indicator if second step is active and click on the "Weiterleitung zur Drittbank" button to proceed to the next step.
  await expect(page.getByTestId('stepIndicatorStep-label').nth(1)).toContainText('Übersicht');
  await page.getByRole('button', { name: 'Weiterleitung zur Drittbank' }).click();

  // Validation: As Accepting is  a required field, check if the error message is displayed and then check the checkbox to accept the T&C.
  // Then click  again on  the "Weiterleitung zur Drittbank" button.
  const requiredError = page
    .locator('[data-testid="tncAccepted-checkbox-form-row"]')
    .locator('[data-testid="error-messages"]')
    .locator('[data-testid="required-error"]');
  await expect(requiredError).toContainText('Dies ist ein Pflichtfeld.'); // check validation text

  // Check the checkbox to accept the T&C and click on the "Weiterleitung zur Drittbank" button again.
  const checkboxRow = page.locator('[data-testid="tncAccepted-checkbox-form-row"]');
  await checkboxRow.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Weiterleitung zur Drittbank' }).click();

  // Validation: Check if the notification message is displayed and contains the expected text.
  await expect(page.getByTestId('notification-content-translate-html')).toContainText(
    'In der Demoversion wird diese Funktion nicht unterstützt'
  );
});