# TC-MOB-001: Đăng ký tài khoản trên Mobile với mật khẩu 8 ký tự đủ điều kiện

## Requirement ID
FR-01-MOB-001

## Module / Test type / Technique
Mobile Registration / Functional Testing / Boundary Value Analysis (BVA Min), Equivalence Partitioning (VEC)

## Preconditions
- Mở ứng dụng Mobile EShop (React Native / Expo).
- Đang ở màn hình Đăng Ký Tài Khoản (`view === 'register'`).
- Email chưa tồn tại trong hệ thống.

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Trần Thị Mai` |
| Email | `tranmai@mobiletest.com` |
| Mật khẩu | `Password1!` (8 ký tự) |

## Test steps
1. Nhập Họ Tên: "Trần Thị Mai".
2. Nhập Email: "tranmai@mobiletest.com".
3. Nhập Mật khẩu: "Password1!".
4. Chạm vào nút "Đăng Ký".

## Expected result
- Ứng dụng gửi request đăng ký thành công đến API.
- Hiển thị Alert thông báo: "Đăng ký tài khoản thành công.".
- Chuyển hướng về màn hình Đăng nhập (`view === 'login'`).

## Status / Related bugs
Not Run / None
