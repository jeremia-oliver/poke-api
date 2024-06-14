import { test, expect } from '@playwright/test';

// const URL = 'http://localhost:3000/'
const URL = 'https://poke-api-one-eta.vercel.app/'

test.describe('Test Poke API Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing all pokemon image to be visible', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByTestId("images").and(page.locator("img:visible"))).toHaveCount(1025,{ timeout: 150000 })
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
    await expect(page.getByTestId("images").and(page.locator("img:visible"))).toHaveCount(3,{ timeout: 150000 })
  });

});

test.describe('Test Filter Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Showing pokemon based on type filter', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select a type').click();
    await page.getByRole('option', { name: 'NORMAL' }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Displaying 131 Pokemon")).toBeVisible()
    await expect(page.getByTestId("images").and(page.locator("img:visible"))).toHaveCount(131,{ timeout: 150000 })
  });

  test('Showing pokemon based on abilty filter', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select an ability').click();
    await page.getByRole('option', { name: 'LIMBER', exact: true  }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Displaying 14 Pokemon")).toBeVisible()
    await expect(page.getByTestId("images").and(page.locator("img:visible"))).toHaveCount(14,{ timeout: 150000 })
  });

  test('Showing pokemon based on move filter', async ({ page }) => {
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.getByPlaceholder('Select a move').click();
    await page.getByRole('option', { name: 'KARATE CHOP', exact: true  }).click();
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Loading...')).toBeHidden({ timeout: 150000 })
    await expect(page.getByText("Displaying 11 Pokemon")).toBeVisible()
    await expect(page.getByTestId("images").and(page.locator("img:visible"))).toHaveCount(11,{ timeout: 150000 })
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
    await expect(page.locator("img:visible")).toHaveCount(0)
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
    await expect(page.locator("img:visible")).toHaveCount(0)
  });

});
