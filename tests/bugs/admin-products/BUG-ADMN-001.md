# Title: [BUG][AdminProducts] API cho phép tạo sản phẩm với giá bằng 0 ₫ và giá âm (thiếu validation biên)

## Found by Test Case
TC-ADMN-001, TC-ADMN-002

## Requirement liên quan
FR-15 (Product Management CRUD)

## Severity / Priority
Critical / P1

## Environment
- Endpoint: POST /api/products
- Host: http://localhost:3000
- Build: Build 1 (SUT Initial)

## Steps to reproduce
1. Gửi request tạo sản phẩm mới với giá bằng 0 hoặc âm:
   ```json
   {
     "name": "Sản phẩm Giá 0 Đồng",
     "price": 0,
     "category_id": 1,
     "description": "Test giá 0"
   }
   ```
2. Gửi request tương tự với `price: -1`.

## Expected result
- Hệ thống từ chối lưu sản phẩm vào CSDL, trả về mã lỗi HTTP 400 Bad Request kèm thông báo: "Giá sản phẩm phải là số dương lớn hơn 0".

## Actual result
- API trả về HTTP 200 OK và chèn trực tiếp sản phẩm có giá 0 ₫ và giá -1 ₫ vào CSDL SQLite.

## Evidence
- Assertion failure từ Playwright log:
  ```text
  Error: Giá sản phẩm = 0 phải bị từ chối theo SRS FR-15
  Expected: not 200
  Received: 200
  ```
- Đoạn mã nguồn tại `backend/server.js:126-135`:
  ```javascript
  app.post("/api/products", (req, res) => {
    const { name, price, description, imageUrl, category_id } = req.body;
    db.run(
      "INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)",
      [name, price, description, imageUrl, category_id], ...
    );
  });
  ```
  Hoàn toàn không có bất kỳ dòng lệnh kiểm tra điều kiện `if (price <= 0)` nào.
