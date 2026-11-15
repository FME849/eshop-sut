# TC-ADMN-007: Admin tạo sản phẩm với tên dài 256 ký tự (vượt biên trên)

## Requirement ID
FR-15-PROD-007

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Max + 1), Equivalence Partitioning (IEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở form Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | Chuỗi 256 ký tự chữ cái `A` |
| Giá sản phẩm | `150000` |
| Danh mục | Chọn danh mục hợp lệ |

## Test steps
1. Nhập Tên sản phẩm: Chuỗi 256 ký tự "A".
2. Nhập Giá sản phẩm: "150000".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu".

## Expected result
- Hệ thống từ chối lưu sản phẩm.
- Báo lỗi: "Tên sản phẩm không được vượt quá 255 ký tự".

## Status / Related bugs
Fail / [BUG-ADMN-002](../../bugs/admin-products/BUG-ADMN-002.md)
