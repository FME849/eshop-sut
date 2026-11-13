# TC-COUP-006: Áp dụng mã giảm giá đã hết hạn sử dụng

## Requirement ID
FR-09-COUP-006

## Module / Test type / Technique
Coupon / Functional Testing / Equivalence Partitioning (IEC-CODE-02)

## Preconditions
- Người dùng đã đăng nhập tài khoản.
- Mã `EXPIRED` có trong CSDL nhưng hạn sử dụng là `2020-01-01` (đã hết hạn).
- Đơn hàng có giá trị 500.000 ₫.

## Test data
| Field | Value |
|---|---|
| Mã giảm giá | `EXPIRED` |
| Hạn dùng (expired_at) | `2020-01-01` |
| Tổng tiền đơn hàng | `500000` |

## Test steps
1. Mở trang Thanh toán với đơn hàng 500.000 ₫.
2. Nhập mã "EXPIRED".
3. Bấm nút "Áp dụng".

## Expected result
- Hệ thống kiểm tra ngày hiện tại > expired_at.
- Từ chối áp dụng và thông báo: "Mã giảm giá đã hết hạn sử dụng".

## Status / Related bugs
Not Run / None
