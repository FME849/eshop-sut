import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' });
    this.nameInput = page.locator('input').nth(0);
    this.emailInput = page.locator('input').nth(1);
    this.passwordInput = page.locator('input[type="password"]');
    this.confirmPasswordInput = page.locator('input[placeholder*="Xác nhận"], input[name="confirmPassword"], input[type="password"]').nth(1);
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.bg-red-100, [role="alert"]');
    this.loginLink = page.getByRole('link', { name: 'Đăng nhập' });
  }

  async goto() {
    await this.page.goto('/register');
    await this.heading.waitFor({ state: 'visible', timeout: 10000 });
  }

  async fillRegistrationForm(data: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }) {
    if (data.name !== undefined) {
      await this.nameInput.fill(data.name);
    }
    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
    }
    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
    }
    if (data.confirmPassword !== undefined && await this.confirmPasswordInput.isVisible()) {
      await this.confirmPasswordInput.fill(data.confirmPassword);
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async register(data: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }) {
    await this.fillRegistrationForm(data);
    await this.submit();
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
      return (await this.errorMessage.textContent())?.trim() || '';
    } catch {
      return '';
    }
  }

  async isConfirmPasswordPresent(): Promise<boolean> {
    return await this.confirmPasswordInput.isVisible();
  }

  async getSubmitButtonBackgroundColor(): Promise<string> {
    return await this.submitButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
  }
}
