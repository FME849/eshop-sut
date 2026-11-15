# Title: [BUG][Coupon] Không kiểm soát giới hạn số lần sử dụng coupon trên mỗi tài khoản người dùng

## Found by Test Case
TC-COUP-005

## Requirement liên quan
FR-09 (Coupon Application - Điều kiện C5)

## Severity / Priority
Major / P2

## Environment
- Endpoint: POST /api/apply-coupon
- Host: http://localhost:3000
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Người dùng đã từng sử dụng mã `SAVE10` (`max_uses_per_user = 1`).
2. Gửi request áp dụng lại mã `SAVE10` cho đơn hàng tiếp theo:
   ```json
   {
     "code": "SAVE10",
     "total_amount": 400000,
     "user_id": 2
   }
   ```

## Expected result
- Hệ thống truy vấn bảng `coupon_usage`, xác định user đã đạt giới hạn 1 lần dùng.
- Trả về lỗi HTTP 400: "Bạn đã sử dụng hết lượt cho mã giảm giá này".

## Actual result
- Hệ thống không kiểm tra bảng `coupon_usage` tại API `apply-coupon` hoặc cho phép áp dụng tiếp tục mà không chặn lượt sử dụng vượt quá `max_uses_per_user`.

## Evidence
- Assertion failure từ Playwright log:
  ```text
  expect(received).toBe(expected)
  Expected: 400
  Received: 200
  ```
