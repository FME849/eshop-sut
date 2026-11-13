# TC-REG-001: Đăng ký tài khoản với mật khẩu 8 ký tự đủ 4 nhóm ký tự

## Requirement ID
FR-01-REG-001

## Module / Test type / Technique
Registration / Functional Testing / Boundary Value Analysis (BVA Min), Equivalence Partitioning (VEC)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).
- Email `nguyenvanan@example.com` chưa từng đăng ký trong hệ thống.

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Nguyễn Văn An` |
| Email | `nguyenvanan@example.com` |
| Mật khẩu | `Password1!` (8 ký tự: 1 hoa, 7 thường, 1 số, 1 ký tự đặc biệt) |
| Xác nhận mật khẩu | `Password1!` |

## Test steps
1. Nhập trường Họ Tên: "Nguyễn Văn An".
2. Nhập trường Email: "nguyenvanan@example.com".
3. Nhập trường Mật khẩu: "Password1!".
4. Nhập trường Xác nhận mật khẩu: "Password1!".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống chấp nhận thông tin đăng ký hợp lệ.
- Hiển thị thông báo đăng ký thành công.
- Tự động điều hướng người dùng tới trang Đăng nhập (`/login`).

## Status / Related bugs
Not Run / None
