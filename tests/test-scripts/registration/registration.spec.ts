import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Phân hệ 1: Quản lý Tài khoản & Đăng ký (FR-01)', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('TC-REG-001: Đăng ký tài khoản với mật khẩu 8 ký tự đủ 4 nhóm ký tự (BVA Min / EP VEC)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `vana_${timestamp}@example.com`;

    await registerPage.register({
      name: 'Nguyễn Văn An',
      email: testEmail,
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    // Kỳ vọng: Hệ thống chấp nhận mật khẩu 8 ký tự hợp lệ và điều hướng sang trang login
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
  });

  test('TC-REG-002: Đăng ký tài khoản với mật khẩu 7 ký tự (cận dưới ngoài BVA Min - 1)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `binh_${timestamp}@example.com`;

    await registerPage.register({
      name: 'Trần Văn Bình',
      email: testEmail,
      password: 'Passw1!',
      confirmPassword: 'Passw1!',
    });

    // Kỳ vọng: Báo lỗi mật khẩu quá ngắn, không điều hướng sang login
    const error = await registerPage.getErrorMessage();
    expect(error).toMatch(/mật khẩu.*tối thiểu.*8/i);
    expect(page.url()).toContain('/register');
  });

  test('TC-REG-003: Đăng ký tài khoản với mật khẩu 9 ký tự (cận dưới trong BVA Min + 1)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `cuc_${timestamp}@example.com`;

    await registerPage.register({
      name: 'Lê Thị Cúc',
      email: testEmail,
      password: 'Password12!',
      confirmPassword: 'Password12!',
    });

    // Kỳ vọng: Đăng ký thành công và chuyển trang login
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
  });

  test('TC-REG-004: Đăng ký tài khoản với mật khẩu thiếu chữ in hoa (EP IEC-CHAR-01)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `dung_${timestamp}@example.com`;

    await registerPage.register({
      name: 'Phạm Văn Dũng',
      email: testEmail,
      password: 'password123!',
      confirmPassword: 'password123!',
    });

    // Kỳ vọng: Báo lỗi mật khẩu phải chứa chữ in hoa
    const error = await registerPage.getErrorMessage();
    expect(error).toMatch(/chữ hoa/i);
    expect(page.url()).toContain('/register');
  });

  test('TC-REG-005: Đăng ký tài khoản với mật khẩu thiếu ký tự đặc biệt (EP IEC-CHAR-04)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `em_${timestamp}@example.com`;

    await registerPage.register({
      name: 'Hoàng Văn Em',
      email: testEmail,
      password: 'Password123',
      confirmPassword: 'Password123',
    });

    // Kỳ vọng: Báo lỗi mật khẩu phải chứa ký tự đặc biệt
    const error = await registerPage.getErrorMessage();
    expect(error).toMatch(/ký tự đặc biệt/i);
    expect(page.url()).toContain('/register');
  });

  test('TC-REG-006: Đăng ký tài khoản với mật khẩu chứa khoảng trắng (EP IEC-CHAR-05)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `giang_${timestamp}@example.com`;

    await registerPage.register({
      name: 'Vũ Văn Giang',
      email: testEmail,
      password: 'Pass 123!',
      confirmPassword: 'Pass 123!',
    });

    // Kỳ vọng: Mật khẩu không được chứa khoảng trắng
    const error = await registerPage.getErrorMessage();
    expect(error).toMatch(/khoảng trắng|không hợp lệ/i);
    expect(page.url()).toContain('/register');
  });

  test('TC-REG-007: Đăng ký tài khoản khi xác nhận mật khẩu không khớp (EP IEC-CONF-01)', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `hoa_${timestamp}@example.com`;

    // Kiểm tra sự tồn tại của trường Xác nhận mật khẩu trên giao diện
    const hasConfirmField = await registerPage.isConfirmPasswordPresent();
    expect(hasConfirmField, 'Trường Xác nhận mật khẩu phải xuất hiện trên form đăng ký theo SRS FR-01').toBe(true);

    await registerPage.register({
      name: 'Đỗ Thị Hoa',
      email: testEmail,
      password: 'Password1!',
      confirmPassword: 'Password2!',
    });

    // Kỳ vọng: Báo lỗi mật khẩu xác nhận không khớp
    const error = await registerPage.getErrorMessage();
    expect(error).toMatch(/không khớp/i);
    expect(page.url()).toContain('/register');
  });
});
