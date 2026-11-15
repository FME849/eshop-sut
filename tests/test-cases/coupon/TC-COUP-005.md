# TC-COUP-005: Áp dụng mã SAVE10 lần thứ 2 vượt giới hạn lượt dùng

## Requirement ID
FR-09-COUP-005

## Module / Test type / Technique
Coupon / Functional Testing / Boundary Value Analysis (BVA Max), Equivalence Partitioning (IEC)

## Preconditions
- Người dùng đã sử dụng mã `SAVE10` thành công trong 1 đơn hàng trước đó (`used_count = 1`).
- Đơn hàng mới có giá trị 400.000 ₫.

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `SAVE10` |
| Giới hạn lượt dùng (max_uses_per_user) | `1` |
| Số lần user đã dùng | `1` |
| Tổng tiền đơn hàng | `400000` |

## Test steps
1. Đăng nhập tài khoản đã từng sử dụng mã SAVE10.
2. Mở trang Thanh toán với đơn hàng 400.000 ₫.
3. Nhập lại mã "SAVE10".
4. Bấm nút "Áp dụng".

## Expected result
- Hệ thống kiểm tra số lần đã dùng = 1 >= 1.
- Từ chối áp dụng và hiển thị thông báo: "Bạn đã sử dụng hết lượt cho mã giảm giá này".

## Status / Related bugs
Fail / [BUG-COUP-003](../../bugs/coupon/BUG-COUP-003.md)
