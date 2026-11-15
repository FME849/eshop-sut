# Title: [BUG][Registration] Biểu thức chính quy (Regex) kiểm tra độ mạnh mật khẩu sai lệch tiêu chuẩn

## Found by Test Case
TC-REG-001, TC-REG-003, TC-REG-006, TC-MOB-001

## Requirement liên quan
FR-01 (User Registration)

## Severity / Priority
Critical / P1

## Environment
- Browser: Chromium 124.0 (Headless & Headed)
- OS: macOS
- URL: http://localhost:5173/register
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Truy cập trang Đăng ký tài khoản: `http://localhost:5173/register`.
2. Nhập Họ Tên: "Nguyễn Văn An".
3. Nhập Email: "vana_test@example.com".
4. Nhập Mật khẩu: "Password1!" (độ dài 8 ký tự, có đủ 1 hoa, thường, 1 số, 1 ký tự đặc biệt theo đúng SRS).
5. Nhấn nút "Đăng Ký".

## Expected result
- Mật khẩu được chấp nhận là hợp lệ.
- Hệ thống gửi request đăng ký thành công đến API và chuyển hướng người dùng sang trang Đăng nhập (`/login`).

## Actual result
- Hệ thống chặn lại và báo lỗi màu đỏ: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- Ngược lại, nếu nhập mật khẩu chứa khoảng trắng như "Pass 123 ", hệ thống lại chấp nhận (vi phạm nghiêm trọng quy chuẩn bảo mật).

## Evidence
- Assertion failure từ Playwright log:
  ```text
  Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
  Expected pattern: /.*login/
  Received string:  "http://localhost:5173/register"
  ```
- Đoạn mã nguồn gây lỗi tại `frontend-web/src/pages/Register.jsx:15`:
  ```javascript
  const flawedStrongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/;
  ```
  Biểu thức dùng `(?=.*\s)` bắt buộc phải có khoảng trắng và không cho phép ký tự đặc biệt ngoài `\s`.
