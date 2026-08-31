import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {

    test('placeholder - API tests will be written in Phase 4', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/productsList');
        expect(response.status()).toBe(200);
    });

});