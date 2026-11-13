# DANH MỤC TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATIONS)
### DỰ ÁN: ESHOP-SUT | NHÁNH KIỂM THỬ: `fme849/ep-bva`

---

## 1. MỤC ĐÍCH TÀI LIỆU
Thư mục này chứa các tài liệu **Phân tích Thiết kế Kiểm thử (Test Design Specifications - TDS)** được xây dựng dựa trên tiêu chuẩn quốc tế IEEE 829 và ISTQB. Mỗi tài liệu phân tích chi tiết từ đặc tả yêu cầu nghiệp vụ (SRS), nhận diện miền biến đầu vào, phân hoạch tương đương (EP), phân tích giá trị biên (BVA) và thiết lập ma trận ánh xạ test cases.

---

## 2. DANH MỤC CÁC TÀI LIỆU THIẾT KẾ ĐÃ HOÀN TẤT

| Mã tài liệu | Yêu cầu nghiệp vụ | Tên phân hệ / Chức năng | Kỹ thuật kiểm thử áp dụng | File chi tiết |
| :---: | :---: | :--- | :--- | :--- |
| **`TD-FR-01`** | **FR-01** | **Đăng ký tài khoản trên Web (User Registration)** | Equivalence Partitioning (EP), Boundary Value Analysis (BVA Min: $7, 8, 9$), Security (SEC-01) | [TD-FR-01-web-registration.md](./TD-FR-01-web-registration.md) |
| **`TD-FR-09`** | **FR-09** | **Áp dụng Mã giảm giá (Coupon Application)** | BVA Ngưỡng đơn ($299k, 300k, 301k$), BVA Lượt dùng ($0, 1, 2$), Decision Rules | [TD-FR-09-coupon.md](./TD-FR-09-coupon.md) |
| **`TD-FR-15`** | **FR-15** | **Quản trị Sản phẩm Web Admin (Product Management CRUD)** | BVA 3-giá trị Giá ($-1, 0, 1$), BVA Độ dài Tên ($0, 1, 255, 256$), RBAC | [TD-FR-15-admin-products.md](./TD-FR-15-admin-products.md) |
| **`TD-FR-01-MOB`**| **FR-20 / FR-01** | **Đăng ký tài khoản trên Mobile App (Mobile Registration)** | EP, BVA trên React Native Client, So sánh sai lệch Web vs Mobile, GUI Standards | [TD-FR-01-mobile-registration.md](./TD-FR-01-mobile-registration.md) |

---

## 3. QUY TRÌNH KẾT NỐI TỪ DESIGN SANG TEST RUN
```text
1. SRS Analysis (testing-docs/requirements-analysis.md)
   ↓
2. Test Design Specification (tests/test-design/TD-*.md)
   ↓
3. Test Case Specification (tests/test-cases/<module>/TC-*.md)
   ↓
4. Test Execution & Bug Reporting (tests/test-runs/ & tests/bugs/)
   ↓
5. Requirements Traceability Matrix (tests/traceability-matrix/RTM.md)
```
