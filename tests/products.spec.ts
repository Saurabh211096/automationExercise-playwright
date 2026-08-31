import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import testdata from '../data/testdata.json';

test.describe('Products Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.route('**/*', async (route) => {
            const url = route.request().url();
            if (
                url.includes('googlesyndication.com') ||
                url.includes('doubleclick.net') ||
                url.includes('google-analytics.com') ||
                url.includes('propellerads') ||
                url.includes('propellerclick') ||
                url.includes('adsterra')
            ) {
                await route.abort();
            } else {
                await route.continue();
            }
        });
    });

    test('Search for a product by name should show matching results [Functional]', async ({ page }) => {
        // Arrange
        const productsPage = new ProductsPage(page);
        // Act
        await page.goto('/products');
        await productsPage.searchProduct(testdata.searchProduct);
        // Assert - at least one product card appears
        await expect(productsPage.productCards.first()).toBeVisible();
    });
    test('Adding a product to cart should show it in the cart [Functional]', async ({ page }) => {
        // Arrange
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        // Act - add the first product to cart
        await page.goto('/products');
        await productsPage.addFirstProductToCart();
        // Assert - confirmation popup appears
        await expect(productsPage.addedToCartPopup).toBeVisible();
        // Act - go to the cart
        await productsPage.viewCartLink.click();
        // Assert - we're on the cart page and the item is there
        await expect(page).toHaveURL(/view_cart/);
        await expect(cartPage.cartItems.first()).toBeVisible();
    });
    test('View product detail should show title and price [Smoke]', async ({ page }) => {
        // Arrange
        const productsPage = new ProductsPage(page);
        // Act - open the first product's detail page
        await page.goto('/products');
        // // Close ad overlay if present (non-blocking)
        // const adCloseButton = page.locator('.fc-cta-consent, .ad-close-button, [aria-label="Close ad"]');
        // if (await adCloseButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        //     await adCloseButton.click();
        // }
        await productsPage.viewFirstProduct();
        // Assert - title and price are visible
        await expect(productsPage.productTitle).toBeVisible();
        await expect(productsPage.productPrice).toBeVisible();
    });

});