# TC-ADMN-004: Admin tạo sản phẩm với tên rỗng 0 ký tự

## Requirement ID
FR-15-PROD-004

## Module / Test type / Technique
Admin Products / Functional Testing / Boundary Value Analysis (BVA Min - 1), Equivalence Partitioning (IEC)

## Preconditions
- Đăng nhập tài khoản Admin (`admin@eshop.com`).
- Đang ở form Thêm sản phẩm mới.

## Test data
| Field | Value |
|---|---|
| Tên sản phẩm | `` (để trống) |
| Giá sản phẩm | `100000` |
| Danh mục | Chọn danh mục hợp lệ |

## Test steps
1. Để trống ô Tên sản phẩm.
2. Nhập Giá sản phẩm: "100000".
3. Chọn Danh mục hợp lệ.
4. Nhấn nút "Lưu".

## Expected result
- Hệ thống từ chối lưu sản phẩm.
- Báo lỗi: "Tên sản phẩm không được để trống".

## Status / Related bugs
Not Run / None
