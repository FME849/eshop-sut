# TC-MOB-002: Đăng ký trên Mobile với mật khẩu 7 ký tự (cận dưới ngoài)

## Requirement ID
FR-01-MOB-002

## Module / Test type / Technique
Mobile Registration / Functional Testing / Boundary Value Analysis (BVA Min - 1)

## Preconditions
- Mở ứng dụng Mobile EShop.
- Đang ở màn hình Đăng Ký Tài Khoản.

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Nguyễn Văn Tuấn` |
| Email | `tuanmobile@test.com` |
| Mật khẩu | `Passw1!` (7 ký tự) |

## Test steps
1. Nhập Họ Tên: "Nguyễn Văn Tuấn".
2. Nhập Email: "tuanmobile@test.com".
3. Nhập Mật khẩu: "Passw1!".
4. Chạm vào nút "Đăng Ký".

## Expected result
- Ứng dụng chặn tại client, không gọi API đăng ký.
- Hiển thị văn bản thông báo lỗi màu đỏ (`errorBoxText`) phía trên form: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- Người dùng vẫn ở lại màn hình Đăng ký.

## Status / Related bugs
Pass / None
