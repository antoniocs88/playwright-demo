import { test, expect } from '@playwright/test';

test.describe('The Internet Herokuapp Test Suite', () => {
  test('Test 1: Navegación Inicial y validación', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('The Internet');
    await expect(page.locator('h1')).toHaveText('Welcome to the-internet');
  });

  test('Test 2: Checkboxes', async ({ page }) => {
    await page.goto('/checkboxes');
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);

    // checkbox 2 viene marcado por defecto, pero checkbox 1 no
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();

    await checkbox1.check();
    await checkbox2.uncheck();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('Test 3: Dropdown Lists', async ({ page }) => {
    await page.goto('/dropdown');
    const dropdown = page.locator('#dropdown');
    
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');

    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
  });

  test('Test 4: Inputs numéricos', async ({ page }) => {
    await page.goto('/inputs');
    const input = page.locator('input[type="number"]');
    
    await input.fill('12345');
    await expect(input).toHaveValue('12345');
    
    await input.press('ArrowUp');
    await expect(input).toHaveValue('12346');
  });

  test('Test 5: Hovers', async ({ page }) => {
    await page.goto('/hovers');
    const figure = page.locator('.figure').first();
    const caption = figure.locator('.figcaption');

    await expect(caption).not.toBeVisible();
    await figure.hover();
    await expect(caption).toBeVisible();
    await expect(caption.locator('h5')).toHaveText('name: user1');
  });

  test('Test 6: JavaScript Alerts', async ({ page }) => {
    await page.goto('/javascript_alerts');
    
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    
    await page.locator('button[onclick="jsAlert()"]').click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('Test 7: Multipe Windows', async ({ page, context }) => {
    await page.goto('/windows');
    
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a[href="/windows/new"]').click()
    ]);
    
    await expect(newPage.locator('h3')).toHaveText('New Window');
    await expect(newPage).toHaveTitle('New Window');
  });

  test('Test 8: Dynamic Loading (Wait for elements)', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
    await page.locator('button').click();
    
    // El elemento '#finish' tarda un poco en aparecer
    const finishText = page.locator('#finish h4');
    await expect(finishText).toBeVisible({ timeout: 10000 });
    await expect(finishText).toHaveText('Hello World!');
  });

  test('Test 9: Form Authentication (Login)', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    await expect(page.locator('.icon-signout')).toBeVisible();
  });

  test('Test 10: Drag and Drop', async ({ page }) => {
    await page.goto('/drag_and_drop');
    
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    
    await expect(columnA.locator('header')).toHaveText('A');
    await expect(columnB.locator('header')).toHaveText('B');

    await columnA.dragTo(columnB);

    await expect(columnA.locator('header')).toHaveText('B');
    await expect(columnB.locator('header')).toHaveText('A');
  });
});

