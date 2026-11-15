# Title: [BUG][Registration] Khuyết thiếu trường Xác nhận mật khẩu (Confirm Password) trên form đăng ký

## Found by Test Case
TC-REG-007, TC-MOB-004

## Requirement liên quan
FR-01 (User Registration)

## Severity / Priority
Major / P2

## Environment
- Browser: Chromium 124.0 (Desktop & Mobile Emulation)
- OS: macOS
- URL: http://localhost:5173/register
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Truy cập trang Đăng ký tài khoản: `http://localhost:5173/register`.
2. Quan sát các trường nhập liệu hiển thị trên form.

## Expected result
- Form phải có trường "Xác nhận mật khẩu" đi kèm kiểm tra tính trùng khớp với trường "Mật khẩu" trước khi cho phép đăng ký theo đúng đặc tả SRS FR-01.

## Actual result
- Form chỉ có 3 trường: "Họ Tên", "Email", "Mật khẩu".
- Hoàn toàn không có trường "Xác nhận mật khẩu".

## Evidence
- Assertion failure từ Playwright log:
  ```text
  Error: Trường Xác nhận mật khẩu phải xuất hiện trên form đăng ký theo SRS FR-01
  Expected: true
  Received: false
  ```
- File `frontend-web/src/pages/Register.jsx` chỉ render 3 ô `<input>`:
  ```jsx
  <input value={name} ... />
  <input value={email} ... />
  <input value={password} ... />
  ```
