# Title: [BUG][Coupon] Sử dụng sai toán tử so sánh biên tại ngưỡng đơn hàng tối thiểu (Boundary Bug)

## Found by Test Case
TC-COUP-002

## Requirement liên quan
FR-09 (Coupon Application)

## Severity / Priority
Critical / P1

## Environment
- Endpoint: POST /api/apply-coupon
- Host: http://localhost:3000
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Đăng nhập tài khoản người dùng (`test@eshop.com`).
2. Gửi request áp dụng mã giảm giá `SAVE10` (có `min_order_amount = 300000`):
   ```json
   {
     "code": "SAVE10",
     "total_amount": 300000,
     "user_id": 2
   }
   ```

## Expected result
- Đơn hàng đạt giá trị đúng bằng 300.000 ₫ thỏa mãn điều kiện $Total \ge min\_order\_amount$.
- API trả về HTTP 200 OK kèm thông tin giảm giá: `discount_amount: 30000`, `final_amount: 270000`.

## Actual result
- API trả về HTTP 400 Bad Request kèm thông báo: "Chưa đạt giá trị đơn hàng tối thiểu".

## Evidence
- Assertion failure từ Playwright log:
  ```text
  Error: Tại đúng biên 300.000 ₫, hệ thống phải chấp nhận mã SAVE10 theo điều kiện >= min_order_amount
  Expected: 200
  Received: 400
  ```
- Đoạn mã nguồn lỗi tại `backend/server.js:379`:
  ```javascript
  if (total_amount > coupon.min_order_amount) { // <-- Dùng `>` thay vì `>=`
  ```
