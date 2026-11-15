# TC-ADMN-002: Admin tạo sản phẩm với giá âm (-1 ₫)

## Requirement ID
FR-15-PROD-002

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Min - 2), Equivalence Partitioning (IEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở trang Quản lý Sản phẩm / Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | `Sản phẩm Giá Âm` |
| Giá sản phẩm | `-1` |
| Danh mục | Chọn danh mục hợp lệ có sẵn |

## Test steps
1. Nhập Tên sản phẩm: "Sản phẩm Giá Âm".
2. Nhập Giá sản phẩm: "-1".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu".

## Expected result
- Hệ thống từ chối lưu sản phẩm.
- Báo lỗi: "Giá sản phẩm không hợp lệ, không được nhập số âm".

## Status / Related bugs
Fail / [BUG-ADMN-001](../../bugs/admin-products/BUG-ADMN-001.md)
