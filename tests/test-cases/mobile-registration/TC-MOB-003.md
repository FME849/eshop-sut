# TC-MOB-003: Đăng ký trên Mobile với mật khẩu thiếu ký tự đặc biệt

## Requirement ID
FR-01-MOB-003

## Module / Test type / Technique
Mobile Registration / Functional Testing / Equivalence Partitioning (IEC-CHAR-04)

## Preconditions
- Mở ứng dụng Mobile EShop.
- Đang ở màn hình Đăng Ký Tài Khoản.

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Phạm Văn Hùng` |
| Email | `hungmobile@test.com` |
| Mật khẩu | `Password123` (thiếu ký tự đặc biệt) |

## Test steps
1. Nhập Họ Tên: "Phạm Văn Hùng".
2. Nhập Email: "hungmobile@test.com".
3. Nhập Mật khẩu: "Password123".
4. Chạm vào nút "Đăng Ký".

## Expected result
- Ứng dụng chặn tại client.
- Hiển thị lỗi `registerError` yêu cầu có KÝ TỰ ĐẶC BIỆT.

## Status / Related bugs
Not Run / None
