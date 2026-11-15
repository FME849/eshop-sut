# TC-REG-006: Đăng ký tài khoản với mật khẩu chứa khoảng trắng

## Requirement ID
FR-01-REG-006

## Module / Test type / Technique
Registration / Functional Testing / Equivalence Partitioning (IEC-CHAR-05)

## Preconditions
- Người dùng đang mở trang Đăng ký trên trình duyệt Web (`/register`).

## Test data
| Field | Value |
|---|---|
| Họ Tên | `Vũ Văn Giang` |
| Email | `vugiang@example.com` |
| Mật khẩu | `Pass 123!` (chứa dấu cách) |
| Xác nhận mật khẩu | `Pass 123!` |

## Test steps
1. Nhập Họ Tên: "Vũ Văn Giang".
2. Nhập Email: "vugiang@example.com".
3. Nhập Mật khẩu: "Pass 123!".
4. Nhập Xác nhận mật khẩu: "Pass 123!".
5. Nhấn nút "Đăng Ký".

## Expected result
- Hệ thống từ chối đăng ký.
- Báo lỗi: Mật khẩu không được chứa khoảng trắng.

## Status / Related bugs
Fail / [BUG-REG-001](../../bugs/registration/BUG-REG-001.md)
