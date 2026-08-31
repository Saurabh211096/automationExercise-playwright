import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly addressDetails: Locator;
    readonly placeOrderButton: Locator;

    // payment page locators
    readonly cardNameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expMonth: Locator;
    readonly expYear: Locator;
    readonly payAndConfirmButton: Locator;

    readonly orderPlacedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addressDetails = this.page.locator('div[data-qa="checkout-info"]');
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });

        this.cardNameInput = this.page.locator('input[data-qa="name-on-card"]');
        this.cardNumberInput = this.page.locator('input[data-qa="card-number"]');
        this.cvcInput = this.page.locator('input[data-qa="cvc"]');
        this.expMonth = this.page.locator('input[data-qa="expiry-month"]');
        this.expYear = this.page.locator('input[data-qa="expiry-year"]');
        this.payAndConfirmButton = this.page.locator('button[data-qa="pay-button"]');

        this.orderPlacedMessage = this.page.locator('[data-qa="order-placed"]');
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }

    async fillyPaymentDetails(cardName: string, cardNumber: string, cvc: string
        , expM: string, expY: string): Promise<void> {
        await this.cardNameInput.fill(cardName);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcInput.fill(cvc);
        await this.expMonth.fill(expM);
        await this.expYear.fill(expY);
        await this.payAndConfirmButton.click();
    }

    async fillPaymentDetails(details: {
        cardName: string;
        cardNumber: string;
        cvc: string;
        expM: string;
        expY: string;
    }): Promise<void> {
        await this.cardNameInput.fill(details.cardName);
        await this.cardNumberInput.fill(details.cardNumber);
        await this.cvcInput.fill(details.cvc);
        await this.expMonth.fill(details.expM);
        await this.expYear.fill(details.expY);
        await this.payAndConfirmButton.click();
    }

    getOrderPlacedMessage(): Locator {
        return this.orderPlacedMessage;
    }
}