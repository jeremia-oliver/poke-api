import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/'
//const URL = 'https://poke-api-one-eta.vercel.app/'

test.describe('Test Poke API Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing all pokemon image to be visible', async ({ page }) => {
    test.setTimeout(150000)
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    let images = page.locator("img")
    await expect(images).toHaveCount(1025)
    for (const image of await images.all()) {
      await expect(image).toBeVisible();
    }
  });
});

test.describe('Test Search Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing pokemon based on search value', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await page.getByPlaceholder("Search by name").fill('saur')
    await expect(page.getByText('saur')).toHaveCount(3)
  });

});

test.describe('Test Filter Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing pokemon based on type filter', async ({ page }) => {
    test.setTimeout(150000)
    await expect(page.getByText('Loading...')).toBeHidden()
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select a type').click();
    await page.getByRole('option', { name: 'NORMAL' }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Displaying 131 Pokemon")).toBeVisible()
  });

  test('Showing pokemon based on abilty filter', async ({ page }) => {
    test.setTimeout(150000)
    await expect(page.getByText('Loading...')).toBeHidden()
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select an ability').click();
    await page.getByRole('option', { name: 'LIMBER', exact: true  }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Displaying 14 Pokemon")).toBeVisible()
  });

  test('Showing pokemon based on move filter', async ({ page }) => {
    test.setTimeout(150000)
    await expect(page.getByText('Loading...')).toBeHidden()
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select a move').click();
    await page.getByRole('option', { name: 'KARATE CHOP', exact: true  }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Displaying 11 Pokemon")).toBeVisible()
  });

});

test.describe('Test Failed Search and Filter Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });
  
  test('Showing not found if no pokemon match search value', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await page.getByPlaceholder("Search by name").fill('notmatch')
    await expect(page.getByText('notmatch')).toHaveCount(0)
    await expect(page.getByText("Pokemon Not Found")).toHaveCount(1)
  });
  
  test('Showing not found if no pokemon match filter value', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select a type').click();
    await page.getByRole('option', { name: 'GROUND' }).click();
    await page.getByPlaceholder('Select an ability').click();
    await page.getByRole('option', { name: 'STENCH', exact: true  }).click();
    await page.getByPlaceholder('Select a move').click();
    await page.getByRole('option', { name: 'FLY', exact: true  }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Pokemon Not Found")).toHaveCount(1)
  });

});
