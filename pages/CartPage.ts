import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = this.page.locator('#cart_info_table tbody tr');
        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
    }
}