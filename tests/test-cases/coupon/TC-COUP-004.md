# TC-COUP-004: Áp dụng mã SAVE10 lần đầu tiên (chưa từng dùng)

## Requirement ID
FR-09-COUP-004

## Module / Test type / Technique
Coupon / Functional Testing / Boundary Value Analysis (BVA Max - 1), Equivalence Partitioning (VEC)

## Preconditions
- Người dùng đã đăng nhập tài khoản mới hoặc chưa từng dùng mã `SAVE10` (`used_count = 0`).
- Đơn hàng có giá trị 400.000 ₫ (vượt ngưỡng 300.000 ₫).

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `SAVE10` |
| Giới hạn lượt dùng (max_uses_per_user) | `1` |
| Số lần user đã dùng | `0` |
| Tổng tiền đơn hàng | `400000` |

## Test steps
1. Mở trang Thanh toán với đơn hàng 400.000 ₫.
2. Nhập mã "SAVE10".
3. Bấm nút "Áp dụng".

## Expected result
- Hệ thống kiểm tra số lần đã dùng = 0 < 1.
- Áp dụng mã thành công, giảm 40.000 ₫ (10%).

## Status / Related bugs
Not Run / None
