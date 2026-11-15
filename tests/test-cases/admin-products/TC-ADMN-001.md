# TC-ADMN-001: Admin tạo sản phẩm với giá bằng 0 ₫ (biên ngoài dưới)

## Requirement ID
FR-15-PROD-001

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Min - 1), Equivalence Partitioning (IEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở trang Quản lý Sản phẩm / Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | `Sản phẩm Test 0 Đồng` |
| Giá sản phẩm | `0` |
| Danh mục | Chọn danh mục hợp lệ có sẵn |
| Mô tả | `Mô tả kiểm thử` |

## Test steps
1. Nhập Tên sản phẩm: "Sản phẩm Test 0 Đồng".
2. Nhập Giá sản phẩm: "0".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu" hoặc "Thêm sản phẩm".

## Expected result
- Hệ thống từ chối lưu sản phẩm.
- Báo lỗi: "Giá sản phẩm phải là số dương lớn hơn 0".

## Status / Related bugs
Fail / [BUG-ADMN-001](../../bugs/admin-products/BUG-ADMN-001.md)
