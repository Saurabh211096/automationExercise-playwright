import { Page, Locator } from '@playwright/test';

export class SignupPage {
    readonly page: Page;

    // Step 1 of journey signup box
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    // Step 2 of journey - account details form page
    readonly passwordInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileInput: Locator;
    readonly createAccountButton: Locator;

    // Step 3 of journey - success page
    readonly accountCreatedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = this.page.locator('input[data-qa="signup-name"]');
        this.emailInput = this.page.locator('input[data-qa="signup-email"]');
        this.signupButton = this.page.locator('button[data-qa="signup-button"]');

        this.passwordInput = this.page.locator('input[data-qa="password"]');
        this.firstNameInput = this.page.locator('input[data-qa="first_name"]');
        this.lastNameInput = this.page.locator('input[data-qa="last_name"]');
        this.addressInput = this.page.locator('input[data-qa="address"]');
        this.countryDropdown = this.page.locator('select[data-qa="country"]');
        this.stateInput = this.page.locator('input[data-qa="state"]');
        this.cityInput = this.page.locator('input[data-qa="city"]');
        this.zipcodeInput = this.page.locator('input[data-qa="zipcode"]');
        this.mobileInput = this.page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = this.page.locator('button[data-qa="create-account"]');
        this.accountCreatedMessage = this.page.locator('[data-qa="account-created"]');
    }
    // Step 1 action
    async signup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    // Step 2 action
    async completeRegistration(details: {
        password: string;
        firstName: string;
        lastName: string;
        address: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobileNumber: string;
    }): Promise<void> {
        await this.passwordInput.fill(details.password);
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.addressInput.fill(details.address);
        await this.countryDropdown.selectOption(details.country);
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipcodeInput.fill(details.zipcode);
        await this.mobileInput.fill(details.mobileNumber);
        await this.createAccountButton.click();
    }

    // Step 3 - getter to read the success message
    getAccountCreatedMessage(): Locator {
        return this.accountCreatedMessage;
    }
}

