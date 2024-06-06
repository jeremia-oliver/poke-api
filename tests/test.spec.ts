import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/'
// const URL = 'https://poke-api-one-eta.vercel.app/'

test.describe('Test Poke API Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing all pokemon image to be visible', async ({ page }) => {
    const loader = await page.getByText('Loading...').isVisible();
    if(!loader){
      let images = page.locator("img")
      await expect(images).toHaveCount(1025)
      for (const image of await images.all()) {
        await expect(image).toBeVisible();
      }
    }
  });
});

test.describe('Test Search Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing pokemon based on search value', async ({ page }) => {
    test.setTimeout(120000)
    const loader = await page.getByText('Loading...').isVisible();
    if(!loader){
      let searchInput = await page.getByPlaceholder("Search by name").fill('saur')
      let images = page.locator("img")
      for (const image of await images.all()) {
        await expect(image).toBeVisible();
      }
    }
  });

  test('Showing not found if no pokemon match search value', async ({ page }) => {
    test.setTimeout(120000)
    const loader = await page.getByText('Loading...').isVisible();
    if(!loader){
      let searchInput = await page.getByPlaceholder("Search by name").fill('notmatch')
      let images = page.locator("img")
      await expect(page.getByText("Pokemon Not Found")).toBeVisible()
      for (const image of await images.all()) {
        await expect(image).toBeHidden();
      }
    }
  });

});
