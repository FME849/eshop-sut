import { APIRequestContext, Locator, Page } from '@playwright/test';

export class CouponPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly editableTotalInput: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly couponErrorMessage: Locator;
  readonly couponSuccessBox: Locator;
  readonly totalPaymentText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' });
    this.editableTotalInput = page.locator('input[type="number"]');
    this.couponInput = page.locator('input[placeholder*="Nhập mã giảm giá"]');
    this.applyCouponButton = page.getByRole('button', { name: 'Áp dụng' });
    this.couponErrorMessage = page.locator('p.text-red-600');
    this.couponSuccessBox = page.locator('.text-green-700');
    this.totalPaymentText = page.locator('span:has-text("Tổng thanh toán")');
  }

  async gotoCheckout() {
    await this.page.goto('/checkout');
  }

  async setTotalAmount(amount: number) {
    await this.editableTotalInput.fill(String(amount));
  }

  async applyCoupon(code: string) {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.couponErrorMessage.waitFor({ state: 'visible', timeout: 3000 });
      return (await this.couponErrorMessage.textContent())?.trim() || '';
    } catch {
      return '';
    }
  }

  async getSuccessMessage(): Promise<string> {
    try {
      await this.couponSuccessBox.waitFor({ state: 'visible', timeout: 3000 });
      return (await this.couponSuccessBox.textContent())?.trim() || '';
    } catch {
      return '';
    }
  }

  // API Direct Helper for exact boundary & status verification
  static async applyCouponViaApi(
    request: APIRequestContext,
    payload: {
      code: string;
      total_amount: number;
      user_id?: number | null;
    },
    apiUrl = 'http://localhost:3000/api'
  ) {
    const response = await request.post(`${apiUrl}/apply-coupon`, {
      data: payload,
    });
    const status = response.status();
    let body: any = {};
    try {
      body = await response.json();
    } catch {
      body = { text: await response.text() };
    }
    return { status, body, ok: response.ok() };
  }
}
