import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import testdata from '../data/testdata.json';

test.describe('Authentication Tests', () => {

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

    test('Login with valid credentials should show logged-in indicator [Smoke]', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await page.goto('/login');
        await loginPage.login(testdata.validUser.email, testdata.validUser.password);
        
        await expect(homePage.isLoggedIn()).toBeVisible();
        await expect(page).toHaveURL('https://automationexercise.com/');
    });

    test('Login with invalid password should show error message [Functional]', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/login');
        await loginPage.login(testdata.invalidUser.email, testdata.invalidUser.password);

        await expect(loginPage.getErrorMessage()).toBeVisible();
    });

    test('Logout should return to the login page [Functional]', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        
        // Login first then assert
        await page.goto('/login');
        await loginPage.login(testdata.validUser.email, testdata.validUser.password);
        await expect(homePage.isLoggedIn()).toBeVisible();

        // Logout now then assert
        await homePage.logout();
        await page.waitForURL('**/login');
        await expect(loginPage.emailInput).toBeVisible();
    });

    test('Register a new user successfully [Functional]', async ({ page }) => {
        const signupPage = new SignupPage(page);

        // Generate unique email every run - Date.now()
        const uniqueEmail = `auto${Date.now()}@test.com`;

        // Full registration journey
        await page.goto('/login');
        await signupPage.signup(testdata.newUser.name, uniqueEmail);
        await signupPage.completeRegistration(testdata.newUser);

        await expect(signupPage.getAccountCreatedMessage()).toBeVisible();
    });

});