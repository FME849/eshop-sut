# TC-REG-005: Đăng ký tài khoản với mật khẩu thiếu ký tự đặc biệt

## Requirement ID
FR-01-REG-005

## Module / Test type / Technique
Registration / Functional Testing / Equivalence Partitioning (IEC-CHAR-04)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Hoàng Văn Em` |
| Email | `hoangem@example.com` |
| Mật khẩu | `Password123` (thiếu ký tự đặc biệt) |
| Xác nhận mật khẩu | `Password123` |

## Test steps
1. Nhập Họ Tên: "Hoàng Văn Em".
2. Nhập Email: "hoangem@example.com".
3. Nhập Mật khẩu: "Password123".
4. Nhập Xác nhận mật khẩu: "Password123".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống từ chối đăng ký.
- Hiển thị thông báo lỗi yêu cầu mật khẩu phải chứa ít nhất 1 ký tự đặc biệt trong tập [@, $, !, %, *, ?, &].

## Status / Related bugs
Pass / None
