import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {

    test('placeholder - performance tests will be written in Phase 4.5', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

});