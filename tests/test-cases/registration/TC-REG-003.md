# TC-REG-003: Đăng ký tài khoản với mật khẩu 9 ký tự (cận dưới trong)

## Requirement ID
FR-01-REG-003

## Module / Test type / Technique
Registration / Functional Testing / Boundary Value Analysis (BVA Min + 1)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).
- Email chưa tồn tại trong hệ thống.

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Lê Thị Cúc` |
| Email | `lethicuc@example.com` |
| Mật khẩu | `Password12!` (9 ký tự) |
| Xác nhận mật khẩu | `Password12!` |

## Test steps
1. Nhập Họ Tên: "Lê Thị Cúc".
2. Nhập Email: "lethicuc@example.com".
3. Nhập Mật khẩu: "Password12!".
4. Nhập Xác nhận mật khẩu: "Password12!".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống chấp nhận mật khẩu 9 ký tự hợp lệ.
- Đăng ký thành công và điều hướng sang trang Đăng nhập.

## Status / Related bugs
Not Run / None
