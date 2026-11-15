# TC-ADMN-006: Admin tạo sản phẩm với tên dài đúng 255 ký tự

## Requirement ID
FR-15-PROD-006

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Max), Equivalence Partitioning (VEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở form Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | Chuỗi 255 ký tự chữ cái `A` |
| Giá sản phẩm | `150000` |
| Danh mục | Chọn danh mục hợp lệ |

## Test steps
1. Nhập Tên sản phẩm: Chuỗi 255 ký tự "A".
2. Nhập Giá sản phẩm: "150000".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu".

## Expected result
- Hệ thống chấp nhận tên sản phẩm đạt biên tối đa 255 ký tự.
- Tạo sản phẩm thành công mà không bị cắt cụt (truncate) hoặc lỗi CSDL.

## Status / Related bugs
Pass / None
