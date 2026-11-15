# TC-COUP-002: Áp dụng mã SAVE10 với tổng đơn đúng 300.000 ₫ (biên chuẩn)

## Requirement ID
FR-09-COUP-002

## Module / Test type / Technique
Coupon / Functional Testing / Boundary Value Analysis (BVA Min)

## Preconditions
- Người dùng đã đăng nhập tài khoản hợp lệ.
- Tài khoản chưa từng sử dụng mã `SAVE10`.
- Giỏ hàng có tổng giá trị đơn hàng đúng 300.000 ₫.

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `SAVE10` |
| Ngưỡng tối thiểu (min_order_amount) | `300000` |
| Tổng tiền đơn hàng | `300000` |

## Test steps
1. Vào trang Giỏ hàng / Thanh toán có tổng tiền đúng 300.000 ₫.
2. Nhập mã giảm giá "SAVE10".
3. Bấm nút "Áp dụng".

## Expected result
- Mã giảm giá được chấp nhận (do thỏa điều kiện đơn hàng >= 300.000 ₫).
- Giảm 10% giá trị đơn hàng (giảm 30.000 ₫).
- Tổng thanh toán còn lại hiển thị đúng: 270.000 ₫.

## Status / Related bugs
Fail / [BUG-COUP-001](../../bugs/coupon/BUG-COUP-001.md)
