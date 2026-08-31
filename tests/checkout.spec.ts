import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../data/testdata.json';

test.describe('Checkout Tests', () => {

    // Security guard: to block ad networks before any test loads a page
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

    test('Complete end-to-end checkout flow [E2E]', async ({ page }) => {
        // Arrange - create all Page Objects for this journey
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Step 1: Login
        await page.goto('/login');
        await loginPage.login(testData.validUser.email, testData.validUser.password);
        await expect(homePage.isLoggedIn()).toBeVisible();
        // Step 2: Add product to cart
        await page.goto('/products');
        await productsPage.addFirstProductToCart();
        await expect(productsPage.addedToCartPopup).toBeVisible();
        // Step 3: Go to cart
        await productsPage.viewCartLink.click();
        await expect(page).toHaveURL(/view_cart/);
        // await page.pause();
        // Step 4: Proceed to checkout
        await cartPage.proceedToCheckout();
        await page.waitForURL('**/checkout');
        // Step 5: Verify address details are visible
        await expect(checkoutPage.addressDetails).toBeVisible();
        // Step 6: Place order
        await checkoutPage.placeOrder();
        // Step 7: Fill payment details and pay and confirm order
        await checkoutPage.fillPaymentDetails({
            cardName: testData.validUser.nameOnCard,
            cardNumber: testData.validUser.cardNumberIs,
            cvc: testData.validUser.cvc,
            expM: testData.validUser.expiryMonth,
            expY: testData.validUser.expiryYear
        });
        // Step 8: Verify order placed
        await expect(checkoutPage.getOrderPlacedMessage()).toBeVisible();
    });

});