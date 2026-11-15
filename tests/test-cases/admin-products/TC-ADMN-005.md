# TC-ADMN-005: Admin tạo sản phẩm với tên dài đúng 1 ký tự

## Requirement ID
FR-15-PROD-005

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Min), Equivalence Partitioning (VEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở form Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | `A` (1 ký tự) |
| Giá sản phẩm | `100000` |
| Danh mục | Chọn danh mục hợp lệ |

## Test steps
1. Nhập Tên sản phẩm: "A".
2. Nhập Giá sản phẩm: "100000".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu".

## Expected result
- Hệ thống chấp nhận tên sản phẩm độ dài 1 ký tự.
- Tạo sản phẩm thành công và lưu vào CSDL.

## Status / Related bugs
Pass / None
