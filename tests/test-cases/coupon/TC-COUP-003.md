# TC-COUP-003: Áp dụng mã SAVE10 với tổng đơn 300.001 ₫ (cận dưới trong)

## Requirement ID
FR-09-COUP-003

## Module / Test type / Technique
Coupon / Functional Testing / Boundary Value Analysis (BVA Min + 1)

## Preconditions
- Người dùng đã đăng nhập tài khoản hợp lệ.
- Tài khoản chưa từng sử dụng mã `SAVE10`.
- Giỏ hàng có tổng đơn hàng là 300.001 ₫.

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `SAVE10` |
| Ngưỡng tối thiểu (min_order_amount) | `300000` |
| Tổng tiền đơn hàng | `300001` |

## Test steps
1. Vào trang Giỏ hàng / Thanh toán có tổng tiền 300.001 ₫.
2. Nhập mã giảm giá "SAVE10".
3. Bấm nút "Áp dụng".

## Expected result
- Mã giảm giá được chấp nhận thành công.
- Số tiền giảm 10% tính đúng (~30.000 ₫).
- Tổng tiền thanh toán cập nhật tương ứng.

## Status / Related bugs
Fail / [BUG-COUP-002](../../bugs/coupon/BUG-COUP-002.md)
