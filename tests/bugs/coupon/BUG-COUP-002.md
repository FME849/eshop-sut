# Title: [BUG][Coupon] Công thức tính số tiền chiết khấu phần trăm bị sai lệch nghiêm trọng dẫn đến giá trị âm

## Found by Test Case
TC-COUP-003, TC-COUP-004

## Requirement liên quan
FR-09 (Coupon Application)

## Severity / Priority
Critical / P1

## Environment
- Endpoint: POST /api/apply-coupon
- Host: http://localhost:3000
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Gửi request áp dụng mã giảm giá phần trăm `SAVE10` (giảm 10%, `discount_value = 10`):
   ```json
   {
     "code": "SAVE10",
     "total_amount": 400000,
     "user_id": 9999
   }
   ```

## Expected result
- Số tiền chiết khấu mong đợi: $400.000 \times 10\% = 40.000$ ₫.
- Số tiền thanh toán cuối cùng: $400.000 - 40.000 = 360.000$ ₫.

## Actual result
- API trả về:
  ```json
  {
    "discount_amount": -3600000,
    "final_amount": 4000000
  }
  ```
  Số tiền chiết khấu bị tính thành số âm, làm tổng tiền đơn hàng bị đội lên gấp 10 lần!

## Evidence
- Assertion failure từ Playwright log:
  ```text
  expect(received).toBe(expected) // Object.is equality
  Expected: 40000
  Received: -3600000
  ```
- Đoạn mã nguồn lỗi tại `backend/server.js:383`:
  ```javascript
  discount_amount = Math.floor(total_amount * (1 - coupon.discount_value));
  ```
  Với `discount_value = 10`, công thức tính thành `total_amount * (1 - 10) = total_amount * (-9)`.
  Công thức đúng phải là:
  ```javascript
  discount_amount = Math.floor(total_amount * (coupon.discount_value / 100));
  ```
