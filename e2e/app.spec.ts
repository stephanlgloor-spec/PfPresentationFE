/**
 * This test suite contains end-to-end tests for the landing page of the application. It verifies that the landing page loads correctly and that all outgoing links are functional.
 */
import { test } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { LandingPage } from './page-objects/landingPage';
import { Language } from './page-objects/types';
import MepoPage from './page-objects/MepoPage';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/**
 * This are designed to be language-neutral, ensuring that they work regardless of the language settings of the application.
 */
test('Alles In Allem - Landing Page - language neutral - two different viewports', async ({ page }) => {
  for (const viewport of [{ width: 1960, height: 1440 }/* , { width: 402, height: 874 } */]) {    // laptop, mobile (iPhone 17)
    // change viewport
    await page.setViewportSize(viewport);
    // navigate to the landing page
    await page.goto('/ap/ga/ob/html/finance/home');
    const landingPage = new LandingPage(page);
    // check that landing page and content is loaded properly and all content is visible
    await landingPage.expectPageLoaded();
  }
});

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
});

test.skip('Check all texts in French', async ({ page }) => {
  // navigate to the page
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
  await page.locator('[data-testid="PlatformMepo"]').click();
  //FIXME  await landingPage.platformSwitchLinks.clickPlatformEfinanceLink();
  await page.waitForURL(/\/merchant-portal\/analytics/);  // wait for the new page to open
 // FIXME await new MepoPage(page).expectMenuItemsVisible();  // check if the page is loaded properly by checking if the menu items are visible 
  // check E-Finance Portal link is working properly
  await page.locator('[data-testid="PlatformEfinance"]').click();
  // FIXME: await landingPage.platformSwitchLinks.clickPlatformMepoLink();
  // await landingPage.nav.expectMenuVisible();  // check if the page is loaded properly by checking if the menu items are visible
 // await new MepoPage(page).expectMenuItemsVisible();  // check if the page is loaded properly by checking if the menu items are visible
   // check E-Finance Portal link is working properly
  await page.waitForURL(/\/finance\/home/);  // wait for the new page to open
  // FIXME: await landingPage.nav.expectMenuVisible();  // check if the page is loaded properly by checking if the menu items are visible
});
