import { APIRequestContext, Locator, Page } from '@playwright/test';

export class AdminProductPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly productsTab: Locator;
  readonly productNameInput: Locator;
  readonly productPriceInput: Locator;
  readonly categorySelect: Locator;
  readonly submitProductButton: Locator;
  readonly productRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: 'Đăng nhập' });
    this.productsTab = page.locator('li:has-text("Sản phẩm")');
    this.productNameInput = page.locator('input[placeholder="Tên sản phẩm"]');
    this.productPriceInput = page.locator('input[placeholder="Giá tiền"]');
    this.categorySelect = page.locator('select');
    this.submitProductButton = page.locator('form button[type="submit"]');
    this.productRows = page.locator('table tbody tr');
  }

  async goto(adminUrl = 'http://localhost:5174') {
    await this.page.goto(adminUrl);
  }

  async login(email = 'admin@eshop.com', password = 'Admin123!') {
    if (await this.emailInput.isVisible()) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async openProductsTab() {
    await this.productsTab.waitFor({ state: 'visible', timeout: 5000 });
    await this.productsTab.click();
    await this.productNameInput.waitFor({ state: 'visible', timeout: 5000 });
  }

  async fillProductForm(data: { name: string; price: number | string; category_id?: number }) {
    await this.productNameInput.fill(data.name);
    await this.productPriceInput.fill(String(data.price));
    if (data.category_id && await this.categorySelect.isVisible()) {
      await this.categorySelect.selectOption(String(data.category_id));
    }
  }

  async submitProduct() {
    await this.submitProductButton.click();
  }

  // API Direct Helper for Admin Products CRUD
  static async createProductViaApi(
    request: APIRequestContext,
    payload: {
      name: string;
      price: number | string;
      description?: string;
      imageUrl?: string;
      category_id?: number;
    },
    apiUrl = 'http://localhost:3000/api',
    token?: string
  ) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await request.post(`${apiUrl}/products`, {
      data: payload,
      headers,
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
