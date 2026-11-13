# TC-MOB-004: Kiểm tra sự hiện diện của trường Xác nhận mật khẩu trên Mobile

## Requirement ID
FR-01-MOB-004

## Module / Test type / Technique
Mobile Registration / GUI Testing, Functional / Checklist, Equivalence Partitioning

## Preconditions
- Mở ứng dụng Mobile EShop.
- Đang ở màn hình Đăng Ký Tài Khoản.

## Test data
| Field | Value |
|---|---|
| Màn hình kiểm tra | Màn hình Đăng ký tài khoản trên Mobile |

## Test steps
1. Mở màn hình Đăng Ký trên ứng dụng di động.
2. Kiểm tra danh sách các ô nhập liệu hiển thị trên màn hình.
3. Quan sát xem có trường "Xác nhận mật khẩu" và logic kiểm tra khớp mật khẩu hay không.

## Expected result
- Màn hình Đăng Ký phải có trường "Xác nhận mật khẩu" đi kèm nhãn và ô nhập bảo mật.
- Bắt buộc người dùng nhập lại đúng mật khẩu trước khi cho phép bấm nút "Đăng Ký".

## Status / Related bugs
Not Run / None
