# TC-ADMN-003: Admin tạo sản phẩm với giá 1 ₫ (biên trong nhỏ nhất)

## Requirement ID
FR-15-PROD-003

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Min), Equivalence Partitioning (VEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở trang Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | `Sticker EShop` |
| Giá sản phẩm | `1` |
| Danh mục | Chọn danh mục hợp lệ có sẵn |

## Test steps
1. Nhập Tên sản phẩm: "Sticker EShop".
2. Nhập Giá sản phẩm: "1".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu".

## Expected result
- Hệ thống chấp nhận giá trị biên nhỏ nhất 1 ₫.
- Tạo sản phẩm thành công và hiển thị trong danh sách sản phẩm với giá 1 ₫.

## Status / Related bugs
Pass / None
