# TC-COUP-001: Áp dụng mã giảm giá với đơn hàng đúng ngưỡng tối thiểu 300.000 ₫

## Requirement ID
FR-09-COUP-001

## Module / Test type / Technique
Coupon / Functional Testing / Boundary Value Analysis (BVA Min), Equivalence Partitioning (VEC)

## Preconditions
- Người dùng đã đăng nhập vào hệ thống và đang ở trang Thanh toán (`/checkout`).
- Mã `DISCOUNT20` đang kích hoạt, còn hạn sử dụng, còn lượt dùng, chiết khấu 20% cho đơn hàng từ 300.000 ₫ trở lên.
- Giỏ hàng hiện có tổng giá trị hàng hóa đúng 300.000 ₫.
- Người dùng hiện tại chưa từng sử dụng mã `DISCOUNT20`.

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `DISCOUNT20` |
| Tổng tiền đơn hàng | `300000` |
| Giá trị chiết khấu kỳ vọng | `60000` (20% của 300.000) |
| Tổng tiền sau giảm kỳ vọng | `240000` (300.000 - 60.000) |

## Test steps
1. Tại màn hình Thanh toán (`/checkout`), quan sát trường nhập mã giảm giá.
2. Nhập mã "DISCOUNT20" vào ô Mã giảm giá.
3. Nhấn nút "Áp Dụng" (hoặc gửi request `POST /api/apply-coupon`).

## Expected result
- Hệ thống chấp nhận mã giảm giá hợp lệ tại giá trị biên nhỏ nhất ($300.000$ ₫).
- Hiển thị thông báo áp dụng thành công.
- Số tiền giảm giá được hiển thị chính xác là $-60.000$ ₫.
- Tổng số tiền cần thanh toán được cập nhật thành $240.000$ ₫.

## Status / Related bugs
Not Run
