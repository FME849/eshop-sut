# Title: [BUG][AdminProducts] API cho phép tạo sản phẩm với tên rỗng và tên vượt quá 255 ký tự

## Found by Test Case
TC-ADMN-004, TC-ADMN-007

## Requirement liên quan
FR-15 (Product Management CRUD)

## Severity / Priority
Major / P2

## Environment
- Endpoint: POST /api/products
- Host: http://localhost:3000
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Gửi request tạo sản phẩm với tên rỗng: `name: ""` và `price: 100000`.
2. Gửi request tạo sản phẩm với tên dài 256 ký tự: `name: "A".repeat(256)` và `price: 150000`.

## Expected result
- Hệ thống từ chối lưu và trả về mã lỗi HTTP 400 Bad Request kèm thông báo lỗi độ dài hợp lệ từ 1 đến 255 ký tự.

## Actual result
- API trả về HTTP 200 OK và chèn dữ liệu không hợp lệ vào CSDL.

## Evidence
- Assertion failure từ Playwright log:
  ```text
  Error: Tên sản phẩm rỗng phải bị từ chối
  Expected: not 200
  Received: 200
  ```
- Backend `POST /api/products` không thực hiện validate `if (!name || name.trim().length === 0 || name.length > 255)` trước khi chèn vào bảng `products`.
