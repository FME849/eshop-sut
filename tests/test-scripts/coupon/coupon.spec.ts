import { test, expect } from '@playwright/test';
import { CouponPage } from '../pages/CouponPage';

test.describe('Phân hệ 3: Giỏ hàng & Áp dụng Mã giảm giá (FR-09)', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3000/api';

  test('TC-COUP-001: Áp dụng mã SAVE10 với tổng đơn 299.999 ₫ (cận dưới ngoài BVA Min - 1)', async ({ request }) => {
    const { status, body } = await CouponPage.applyCouponViaApi(request, {
      code: 'SAVE10',
      total_amount: 299999,
      user_id: 2,
    }, API_URL);

    // Kỳ vọng: Hệ thống từ chối do chưa đạt min_order_amount = 300.000 ₫ (HTTP 400)
    expect(status).toBe(400);
    expect(body.error).toMatch(/tối thiểu|chưa đạt/i);
  });

  test('TC-COUP-002: Áp dụng mã SAVE10 với tổng đơn đúng 300.000 ₫ (biên chuẩn BVA Min)', async ({ request }) => {
    const { status, body } = await CouponPage.applyCouponViaApi(request, {
      code: 'SAVE10',
      total_amount: 300000,
      user_id: 2,
    }, API_URL);

    // Kỳ vọng: Đạt đúng biên 300.000 ₫ phải được chấp nhận (HTTP 200)
    expect(status, 'Tại đúng biên 300.000 ₫, hệ thống phải chấp nhận mã SAVE10 theo điều kiện >= min_order_amount').toBe(200);
    expect(body.discount_amount).toBe(30000); // 10% của 300.000
    expect(body.final_amount).toBe(270000);
  });

  test('TC-COUP-003: Áp dụng mã SAVE10 với tổng đơn 300.001 ₫ (cận dưới trong BVA Min + 1)', async ({ request }) => {
    const { status, body } = await CouponPage.applyCouponViaApi(request, {
      code: 'SAVE10',
      total_amount: 300001,
      user_id: 2,
    }, API_URL);

    // Kỳ vọng: Chấp nhận mã và chiết khấu 10%
    expect(status).toBe(200);
    expect(body.discount_amount).toBe(30000);
    expect(body.final_amount).toBe(270001);
  });

  test('TC-COUP-004: Áp dụng mã SAVE10 lần đầu tiên khi chưa từng dùng (BVA Max - 1 / EP VEC)', async ({ request }) => {
    // User ID 9999 là user chưa từng sử dụng mã SAVE10
    const { status, body } = await CouponPage.applyCouponViaApi(request, {
      code: 'SAVE10',
      total_amount: 400000,
      user_id: 9999,
    }, API_URL);

    // Kỳ vọng: Áp dụng mã thành công
    expect(status).toBe(200);
    expect(body.discount_amount).toBe(40000);
    expect(body.final_amount).toBe(360000);
  });

  test('TC-COUP-005: Áp dụng mã SAVE10 lần thứ 2 vượt giới hạn 1 lần/user (BVA Max / EP IEC)', async ({ request }) => {
    // Giả lập ghi nhận lượt sử dụng đầu tiên
    await request.post(`${API_URL}/coupon-usage`, {
      data: { coupon_id: 1, user_id: 2 },
    }).catch(() => {});

    // Thử áp dụng lại lần thứ 2
    const { status, body } = await CouponPage.applyCouponViaApi(request, {
      code: 'SAVE10',
      total_amount: 400000,
      user_id: 2,
    }, API_URL);

    // Kỳ vọng: Báo lỗi đã hết lượt dùng
    expect(status).toBe(400);
    expect(body.error).toMatch(/hết lượt|sử dụng mã này/i);
  });

  test('TC-COUP-006: Áp dụng mã giảm giá đã hết hạn sử dụng (EP IEC-CODE-02)', async ({ request }) => {
    const { status, body } = await CouponPage.applyCouponViaApi(request, {
      code: 'EXPIRED',
      total_amount: 500000,
      user_id: 2,
    }, API_URL);

    // Kỳ vọng: Bị từ chối do hết hạn sử dụng
    expect(status).toBe(400);
    expect(body.error).toMatch(/hết hạn/i);
  });
});
