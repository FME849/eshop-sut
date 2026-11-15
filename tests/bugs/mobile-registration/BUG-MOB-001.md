# Title: [BUG][MobileRegistration] Nút Đăng Ký vi phạm quy chuẩn giao diện người dùng FR-21.2 (dùng màu Đỏ)

## Found by Test Case
TC-MOB-005

## Requirement liên quan
FR-20, FR-21.2 (GUI Standards)

## Severity / Priority
Minor / P3

## Environment
- Browser: Chromium 124.0 (Mobile Viewport: 390x844)
- Platform: Mobile Web / Mobile View
- URL: http://localhost:5173/register
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Truy cập trang Đăng ký tài khoản trên môi trường mobile: `http://localhost:5173/register`.
2. Quan sát màu sắc của nút "Đăng Ký".

## Expected result
- Nút "Đăng Ký" (hành động chính mang tính tích cực) phải sử dụng màu Xanh dương (`bg-blue-500` hoặc tương đương) theo quy chuẩn FR-21.2.

## Actual result
- Nút "Đăng Ký" hiển thị màu Đỏ (`bg-red-500` / `rgb(239, 68, 68)`), màu thường chỉ dành riêng cho các hành động hủy hoặc nguy hiểm.

## Evidence
- Assertion failure từ Playwright log:
  ```text
  Error: Nút Đăng ký không được dùng màu Đỏ theo quy chuẩn FR-21.2
  Expected: false
  Received: true
  ```
- Nút submit mang class `bg-red-500` tại `frontend-web/src/pages/Register.jsx:72` và `styles.redButton` tại `frontend-mobile/App.js:828`.
