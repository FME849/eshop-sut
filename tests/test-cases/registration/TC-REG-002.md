# TC-REG-002: Đăng ký tài khoản với mật khẩu 7 ký tự (cận dưới ngoài)

## Requirement ID
FR-01-REG-002

## Module / Test type / Technique
Registration / Functional Testing / Boundary Value Analysis (BVA Min - 1)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).
- Email chưa tồn tại trong hệ thống.

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Trần Văn Bình` |
| Email | `tranvanbinh@example.com` |
| Mật khẩu | `Passw1!` (7 ký tự) |
| Xác nhận mật khẩu | `Passw1!` |

## Test steps
1. Nhập Họ Tên: "Trần Văn Bình".
2. Nhập Email: "tranvanbinh@example.com".
3. Nhập Mật khẩu: "Passw1!".
4. Nhập Xác nhận mật khẩu: "Passw1!".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống từ chối đăng ký và không gửi dữ liệu tạo tài khoản lên server.
- Hiển thị thông báo lỗi rõ ràng: "Mật khẩu phải có độ dài tối thiểu 8 ký tự".
- Người dùng vẫn ở lại trang Đăng ký.

## Status / Related bugs
Not Run / None
