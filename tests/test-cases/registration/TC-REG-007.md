# TC-REG-007: Đăng ký tài khoản khi xác nhận mật khẩu không khớp

## Requirement ID
FR-01-REG-007

## Module / Test type / Technique
Registration / Functional Testing / Equivalence Partitioning (IEC-CONF-01)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Đỗ Thị Hoa` |
| Email | `dohoa@example.com` |
| Mật khẩu | `Password1!` |
| Xác nhận mật khẩu | `Password2!` (không khớp) |

## Test steps
1. Nhập Họ Tên: "Đỗ Thị Hoa".
2. Nhập Email: "dohoa@example.com".
3. Nhập Mật khẩu: "Password1!".
4. Nhập Xác nhận mật khẩu: "Password2!".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống từ chối gửi yêu cầu đăng ký.
- Báo lỗi: Mật khẩu xác nhận không khớp với mật khẩu đã nhập.

## Status / Related bugs
Fail / [BUG-REG-002](../../bugs/registration/BUG-REG-002.md)
