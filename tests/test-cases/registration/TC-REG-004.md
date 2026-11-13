# TC-REG-004: Đăng ký tài khoản với mật khẩu thiếu chữ in hoa

## Requirement ID
FR-01-REG-004

## Module / Test type / Technique
Registration / Functional Testing / Equivalence Partitioning (IEC-CHAR-01)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Phạm Văn Dũng` |
| Email | `phamdung@example.com` |
| Mật khẩu | `password123!` (không có chữ in hoa) |
| Xác nhận mật khẩu | `password123!` |

## Test steps
1. Nhập Họ Tên: "Phạm Văn Dũng".
2. Nhập Email: "phamdung@example.com".
3. Nhập Mật khẩu: "password123!".
4. Nhập Xác nhận mật khẩu: "password123!".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống từ chối đăng ký.
- Hiển thị thông báo lỗi yêu cầu mật khẩu phải chứa ít nhất 1 chữ cái in hoa (A-Z).

## Status / Related bugs
Not Run / None
