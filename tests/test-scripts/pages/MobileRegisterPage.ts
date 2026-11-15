import { Locator, Page } from '@playwright/test';

export class MobileRegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input').nth(0);
    this.emailInput = page.locator('input').nth(1);
    this.passwordInput = page.locator('input[type="password"]');
    this.confirmPasswordInput = page.locator('input[placeholder*="Xác nhận"], input[name="confirmPassword"]');
    this.submitButton = page.locator('button[type="submit"], [role="button"]:has-text("Đăng Ký")');
    this.errorBox = page.locator('.bg-red-100, [role="alert"], text=/Mật khẩu quá yếu/i');
  }

  async setupMobileViewport() {
    await this.page.setViewportSize({ width: 390, height: 844 });
  }

  async goto() {
    await this.setupMobileViewport();
    await this.page.goto('/register');
  }

  async fillForm(data: { name?: string; email?: string; password?: string }) {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.password !== undefined) await this.passwordInput.fill(data.password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async getButtonColor(): Promise<string> {
    return await this.submitButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
  }

  async isConfirmPasswordVisible(): Promise<boolean> {
    return await this.confirmPasswordInput.isVisible();
  }
}
