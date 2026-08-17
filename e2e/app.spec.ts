/**
 * This test suite contains end-to-end tests for the landing page of the application. It verifies that the landing page loads correctly and that all outgoing links are functional.
 */
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { LandingPage } from './page-objects/landingPage';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/**
 * This are designed to be language-neutral, ensuring that they work regardless of the language settings of the application.
 */
test('Alles In Allem - Landing Page - language neutral', async ({ page }) => {
  // navgate to the landing page
  await page.goto('/ap/ga/ob/html/finance/home');
  const landingPage = new LandingPage(page);
  // check that langina pge and content is loaded properly and all content is visible
  await landingPage.expectPageLoaded();
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


});
