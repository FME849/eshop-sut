# TC-COUP-001: Áp dụng mã SAVE10 với tổng đơn 299.999 ₫ (cận dưới ngoài)

## Requirement ID
FR-09-COUP-001

## Module / Test type / Technique
Coupon / Functional Testing / Boundary Value Analysis (BVA Min - 1)

## Preconditions
- Người dùng đã đăng nhập tài khoản hợp lệ.
- Giỏ hàng có tổng giá trị đơn hàng là 299.999 ₫ (hoặc 299.000 ₫).
- Mã giảm giá `SAVE10` đang active và còn hạn (yêu cầu đơn tối thiểu 300.000 ₫).

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `SAVE10` |
| Ngưỡng tối thiểu (min_order_amount) | `300000` |
| Tổng tiền đơn hàng | `299999` |

## Test steps
1. Vào trang Giỏ hàng / Thanh toán có tổng tiền 299.999 ₫.
2. Nhập mã giảm giá "SAVE10" vào ô nhập coupon.
3. Bấm nút "Áp dụng".

## Expected result
- Hệ thống từ chối áp dụng mã giảm giá.
- Hiển thị thông báo lỗi: "Đơn hàng chưa đạt giá trị tối thiểu 300.000 ₫ để áp dụng mã này".
- Tổng tiền thanh toán giữ nguyên không đổi.

## Status / Related bugs
Pass / None
