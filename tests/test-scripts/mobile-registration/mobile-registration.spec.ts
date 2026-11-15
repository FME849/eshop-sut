import { test, expect } from '@playwright/test';
import { MobileRegisterPage } from '../pages/MobileRegisterPage';

test.describe('Phân hệ 6: Đăng ký Tài khoản trên Mobile App (FR-01 Mobile / FR-20)', () => {
  let mobilePage: MobileRegisterPage;

  test.beforeEach(async ({ page }) => {
    mobilePage = new MobileRegisterPage(page);
    await mobilePage.goto();
  });

  test('TC-MOB-001: Đăng ký tài khoản trên Mobile với mật khẩu 8 ký tự đủ điều kiện (BVA Min)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `mob_${timestamp}@mobiletest.com`;

    await mobilePage.fillForm({
      name: 'Trần Thị Mai',
      email: testEmail,
      password: 'Password1!',
    });
    await mobilePage.submit();

    // Kỳ vọng: Đăng ký thành công và chuyển hướng đến trang Login
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
  });

  test('TC-MOB-002: Đăng ký trên Mobile với mật khẩu 7 ký tự (cận dưới ngoài BVA Min - 1)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `tuan_${timestamp}@test.com`;

    await mobilePage.fillForm({
      name: 'Nguyễn Văn Tuấn',
      email: testEmail,
      password: 'Passw1!',
    });
    await mobilePage.submit();

    // Kỳ vọng: Hệ thống chặn gửi request và hiển thị thông báo lỗi mật khẩu tối thiểu 8 ký tự
    const error = await page.locator('.bg-red-100, [role="alert"]').textContent();
    expect(error).toMatch(/mật khẩu.*tối thiểu.*8/i);
    expect(page.url()).toContain('/register');
  });

  test('TC-MOB-003: Đăng ký trên Mobile với mật khẩu thiếu ký tự đặc biệt (EP IEC-CHAR-04)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `hung_${timestamp}@test.com`;

    await mobilePage.fillForm({
      name: 'Phạm Văn Hùng',
      email: testEmail,
      password: 'Password123',
    });
    await mobilePage.submit();

    // Kỳ vọng: Báo lỗi yêu cầu có ký tự đặc biệt
    const error = await page.locator('.bg-red-100, [role="alert"]').textContent();
    expect(error).toMatch(/ký tự đặc biệt/i);
    expect(page.url()).toContain('/register');
  });

  test('TC-MOB-004: Kiểm tra sự hiện diện của trường Xác nhận mật khẩu trên Mobile (GUI / EP)', async ({ page }) => {
    // Kỳ vọng: Màn hình Đăng ký Mobile phải có trường Xác nhận mật khẩu theo SRS FR-01
    const isPresent = await mobilePage.isConfirmPasswordVisible();
    expect(isPresent, 'Màn hình Đăng ký trên mobile phải có trường Xác nhận mật khẩu').toBe(true);
  });

  test('TC-MOB-005: Kiểm tra màu sắc nút Đăng Ký trên Mobile theo quy chuẩn GUI (FR-21.2)', async ({ page }) => {
    // Quy chuẩn FR-21.2: Nút hành động chính/tích cực (Đăng ký) bắt buộc phải là màu Xanh dương (Blue)
    // Không được là màu Đỏ (Red)
    const buttonBg = await mobilePage.getButtonColor();
    
    // rgb(59, 130, 246) là màu xanh blue-500, trong khi rgb(239, 68, 68) là đỏ red-500
    // Ta kiểm tra xem nút có màu đỏ hay không (nếu đỏ là vi phạm quy chuẩn)
    const isRed = buttonBg.includes('rgb(239, 68, 68)') || buttonBg.includes('rgb(220, 38, 38)') || buttonBg.includes('red');
    expect(isRed, 'Nút Đăng ký không được dùng màu Đỏ theo quy chuẩn FR-21.2').toBe(false);
  });
});
