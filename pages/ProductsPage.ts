import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    // Search
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;
    // Product list - add to cart and view product
    readonly addToCartButtons: Locator;
    readonly viewProductLinks: Locator;
    // 'Added to cart' confirmation popup
    readonly addedToCartPopup: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;
    // Product detail page
    readonly productTitle: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;

        // Search
        this.searchInput = this.page.getByPlaceholder('Search Product');
        this.searchButton = this.page.locator('button[id="submit_search"]');
        this.productCards = this.page.locator('.single-products');
        // Product list
        this.addToCartButtons = this.page.locator('a.add-to-cart');
        this.viewProductLinks = this.page.getByRole('link', { name: 'View Product' });
        // Popup
        this.addedToCartPopup = this.page.locator('.modal-dialog.modal-confirm');
        this.viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
        // Product details
        this.productTitle = this.page.locator('.product-information h2');
        this.productPrice = this.page.locator('.product-information span span');
    }

    // Actions
    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
    async addFirstProductToCart(): Promise<void> {
        await this.addToCartButtons.first().click();
    }
    async viewFirstProduct(): Promise<void> {
        await this.viewProductLinks.first().click();
    }
}