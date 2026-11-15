import { test, expect } from '@playwright/test';
import { AdminProductPage } from '../pages/AdminProductPage';

test.describe('Phân hệ 5: Quản trị Sản phẩm trên Web Admin (FR-15)', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3000/api';

  test('TC-ADMN-001: Admin tạo sản phẩm với giá bằng 0 ₫ (biên ngoài dưới BVA Min - 1)', async ({ request }) => {
    const { status, body } = await AdminProductPage.createProductViaApi(request, {
      name: 'Sản phẩm Test 0 Đồng',
      price: 0,
      category_id: 1,
      description: 'Mô tả test biên 0 đồng',
    }, API_URL);

    // Kỳ vọng: Hệ thống từ chối lưu sản phẩm giá 0 đồng (phải báo lỗi giá > 0)
    expect(status, 'Giá sản phẩm = 0 phải bị từ chối theo SRS FR-15').not.toBe(200);
  });

  test('TC-ADMN-002: Admin tạo sản phẩm với giá âm (-1 ₫) (BVA Min - 2)', async ({ request }) => {
    const { status, body } = await AdminProductPage.createProductViaApi(request, {
      name: 'Sản phẩm Test Giá Âm',
      price: -1,
      category_id: 1,
      description: 'Mô tả test giá âm',
    }, API_URL);

    // Kỳ vọng: Hệ thống từ chối lưu sản phẩm giá âm
    expect(status, 'Giá sản phẩm < 0 phải bị từ chối').not.toBe(200);
  });

  test('TC-ADMN-003: Admin tạo sản phẩm với giá 1 ₫ (biên trong nhỏ nhất BVA Min)', async ({ request }) => {
    const { status, body } = await AdminProductPage.createProductViaApi(request, {
      name: `Sticker EShop ${Date.now()}`,
      price: 1,
      category_id: 1,
      description: 'Mô tả sticker 1 đồng',
    }, API_URL);

    // Kỳ vọng: Chấp nhận giá trị biên nhỏ nhất 1 ₫
    expect(status).toBe(200);
    expect(body.id).toBeDefined();
  });

  test('TC-ADMN-004: Admin tạo sản phẩm với tên rỗng 0 ký tự (BVA Min - 1)', async ({ request }) => {
    const { status } = await AdminProductPage.createProductViaApi(request, {
      name: '',
      price: 100000,
      category_id: 1,
    }, API_URL);

    // Kỳ vọng: Từ chối lưu khi tên sản phẩm để trống
    expect(status, 'Tên sản phẩm rỗng phải bị từ chối').not.toBe(200);
  });

  test('TC-ADMN-005: Admin tạo sản phẩm với tên dài đúng 1 ký tự (BVA Min)', async ({ request }) => {
    const { status, body } = await AdminProductPage.createProductViaApi(request, {
      name: 'A',
      price: 100000,
      category_id: 1,
    }, API_URL);

    // Kỳ vọng: Chấp nhận tên 1 ký tự hợp lệ
    expect(status).toBe(200);
    expect(body.id).toBeDefined();
  });

  test('TC-ADMN-006: Admin tạo sản phẩm với tên dài đúng 255 ký tự (BVA Max)', async ({ request }) => {
    const valid255Name = 'A'.repeat(255);
    const { status, body } = await AdminProductPage.createProductViaApi(request, {
      name: valid255Name,
      price: 150000,
      category_id: 1,
    }, API_URL);

    // Kỳ vọng: Chấp nhận tên 255 ký tự đạt biên tối đa
    expect(status).toBe(200);
    expect(body.id).toBeDefined();
  });

  test('TC-ADMN-007: Admin tạo sản phẩm với tên dài 256 ký tự (vượt biên trên BVA Max + 1)', async ({ request }) => {
    const invalid256Name = 'A'.repeat(256);
    const { status } = await AdminProductPage.createProductViaApi(request, {
      name: invalid256Name,
      price: 150000,
      category_id: 1,
    }, API_URL);

    // Kỳ vọng: Từ chối lưu khi tên vượt quá 255 ký tự
    expect(status, 'Tên sản phẩm 256 ký tự phải bị từ chối').not.toBe(200);
  });
});
