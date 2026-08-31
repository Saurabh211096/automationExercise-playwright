import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly logoutLink: Locator;
    readonly loggedinIndicator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = this.page.getByRole('link', { name: 'Home' });
        this.productsLink = this.page.getByRole('link', { name: 'Products' });
        this.cartLink = this.page.getByRole('link', { name: 'Cart' });
        this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
        this.loggedinIndicator = this.page.locator('a', { hasText: 'Logged in as'});
    }

    // Action
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    // Getter
    isLoggedIn(): Locator {
        return this.loggedinIndicator;
    }
}