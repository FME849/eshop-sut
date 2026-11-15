# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT)
## DỰ ÁN: ESHOP — HỆ THỐNG PHỤC VỤ KIỂM THỬ PHẦN MỀM (SUT)
### Đợt kiểm thử: Nhánh `fme849/ep-bva` | Ngày lập: 2026-11-15 | Phiên bản build: Build 1

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này tổng kết toàn bộ hoạt động kiểm thử tự động trên nhánh `fme849/ep-bva` của hệ thống EShop. Báo cáo đánh giá mức độ đáp ứng của ứng dụng so với tài liệu đặc tả yêu cầu (SRS) đối với các chức năng trọng điểm áp dụng kỹ thuật Phân hoạch tương đương (Equivalence Partitioning) và Phân tích giá trị biên (Boundary Value Analysis). Dữ liệu trong báo cáo phản ánh trạng thái thực thi thực tế, phân tích các khiếm khuyết được phát hiện và cung cấp nhận định phục vụ quyết định nghiệm thu chất lượng bản build.

---

## 2. TỔNG QUAN ỨNG DỤNG

EShop là nền tảng thương mại điện tử phục vụ công tác đào tạo và thực hành kiểm thử phần mềm, bao gồm các thành phần:
- Backend RESTful API: Node.js, Express.js và cơ sở dữ liệu SQLite3 (cổng 3000).
- Frontend Web Khách hàng: Ứng dụng React 18, Vite và Tailwind CSS (cổng 5173).
- Frontend Web Quản trị (Admin Portal): Ứng dụng React 18 quản lý danh mục, sản phẩm, đơn hàng và khuyến mãi (cổng 5174).
- Frontend Mobile: Ứng dụng di động mua sắm phát triển trên nền tảng React Native / Expo.

---

## 3. PHẠM VI KIỂM THỬ (TESTING SCOPE)

### 3.1 Hạng mục trong phạm vi (In-Scope)
Kiểm thử chuyên sâu các trường dữ liệu và logic nghiệp vụ thuộc 4 yêu cầu chức năng trọng điểm:
- **FR-01 (Web Registration):** Quy trình đăng ký tài khoản khách hàng trên trình duyệt Web, kiểm tra tính hợp lệ của họ tên, email, độ dài mật khẩu, tập ký tự mật khẩu và xác nhận mật khẩu.
- **FR-09 (Coupon Application):** Logic áp dụng mã giảm giá tại giỏ hàng và thanh toán, kiểm tra 5 điều kiện tiên quyết, ngưỡng đơn hàng tối thiểu tại các điểm biên, giới hạn lượt dùng và công thức tính chiết khấu.
- **FR-15 (Admin Product Management):** Quản trị danh mục sản phẩm trên Web Admin, kiểm tra giá trị biên của giá sản phẩm và giới hạn độ dài tên sản phẩm.
- **FR-01 Mobile (FR-20 Mobile Registration):** Quy trình đăng ký tài khoản trên môi trường di động, kiểm tra tính đồng bộ nghiệp vụ với Web và sự tuân thủ các quy chuẩn giao diện (FR-21, FR-22).

### 3.2 Hạng mục ngoài phạm vi (Out-of-Scope)
- Các chức năng thanh toán qua cổng trung gian bên thứ ba (VNPay, Momo, Stripe).
- Kiểm thử tải chịu lỗi diện rộng (Stress Testing) trên môi trường hạ tầng phân tán.
- Các nghiệp vụ thuộc nhánh kiểm thử khác (Bảng quyết định cho ma trận đơn hàng, Máy trạng thái vòng đời đơn hàng FR-10).

---

## 4. PHƯƠNG PHÁP VÀ LOẠI HÌNH KIỂM THỬ

- **Phân hoạch tương đương (Equivalence Partitioning - EP):** Phân chia miền dữ liệu của từng trường đầu vào thành các lớp tương đương hợp lệ (VEC) và không hợp lệ (IEC).
- **Phân tích giá trị biên (Boundary Value Analysis - BVA):** Kiểm tra các điểm biên 2 giá trị và 3 giá trị (Min - 1, Min, Min + 1, Max - 1, Max, Max + 1) trên các trường số tiền đơn hàng, giá sản phẩm, độ dài tên và mật khẩu.
- **Kiểm thử tự động hóa (Automation Testing):** Xây dựng kịch bản kiểm thử hướng đối tượng với Playwright Test và TypeScript theo mô hình Page Object Model (POM).
- **Kiểm thử giao diện (GUI Testing):** Kiểm tra tính nhất quán màu sắc nút bấm theo chuẩn hành vi (FR-21.2) và sự hiện diện của các thành phần bắt buộc.

---

## 5. MÔI TRƯỜNG KIỂM THỬ VÀ CÔNG CỤ

| Thành phần | Phiên bản / Cấu hình |
|---|---|
| Hệ điều hành | macOS (Darwin 24.x) |
| Runtime | Node.js v23.10.0, npm 10.9.2 |
| Automation Framework | Playwright Test 1.64.1 |
| Trình duyệt kiểm thử | Chromium 124.0 (Desktop 1280x720 và Mobile Viewport 390x844) |
| Backend Server | Express.js chạy tại http://localhost:3000 |
| Frontend Web Client | Vite dev server chạy tại http://localhost:5173 |
| Frontend Admin Portal | Vite dev server chạy tại http://localhost:5174 |

---

## 6. THỐNG KÊ THỰC THI VÀ ĐO LƯỜNG CHẤT LƯỢNG

### 6.1 Tổng quan Thực thi Test Cases

$$\text{Execution Rate} = \frac{25}{25} \times 100\% = 100\%$$

$$\text{Pass Rate} = \frac{10}{25} \times 100\% = 40.00\%$$

| Phân hệ / Module | Số lượng Test Cases | Passed | Failed | Blocked | Tỷ lệ Pass |
|---|:---:|:---:|:---:|:---:|:---:|
| Registration (Web FR-01) | 7 | 3 | 4 | 0 | 42.86% |
| Coupon (FR-09) | 6 | 2 | 4 | 0 | 33.33% |
| Admin Products (FR-15) | 7 | 3 | 4 | 0 | 42.86% |
| Mobile Registration (FR-01 Mobile) | 5 | 2 | 3 | 0 | 40.00% |
| **Tổng cộng** | **25** | **10** | **15** | **0** | **40.00%** |

### 6.2 Thống kê Lỗi theo Mức độ nghiêm trọng (Severity)

| Severity | Số lượng lỗi | Tỷ lệ (%) | Trạng thái Open | Trạng thái Closed |
|---|:---:|:---:|:---:|:---:|
| Critical (P1) | 4 | 50.00% | 4 | 0 |
| Major (P2) | 3 | 37.50% | 3 | 0 |
| Minor (P3) | 1 | 12.50% | 1 | 0 |
| **Tổng cộng** | **8** | **100.00%** | **8** | **0** |

### 6.3 Phân bố Lỗi theo Module

| Module | Số lượng Defect | Tỷ lệ (%) |
|---|:---:|:---:|
| Registration | 2 | 25.00% |
| Coupon | 3 | 37.50% |
| Admin Products | 2 | 25.00% |
| Mobile Registration | 1 | 12.50% |
| **Tổng cộng** | **8** | **100.00%** |

### 6.4 Bảng Chi tiết Khiếm khuyết (Defect Inventory)

| Bug ID | Mức độ | Tiêu đề lỗi | Module | Test Cases phát hiện |
|---|---|---|---|---|
| [BUG-REG-001](./bugs/registration/BUG-REG-001.md) | Critical / P1 | Biểu thức Regex kiểm tra mật khẩu sai lệch, bắt buộc khoảng trắng và từ chối ký tự đặc biệt | Registration | TC-REG-001, TC-REG-003, TC-REG-006, TC-MOB-001 |
| [BUG-REG-002](./bugs/registration/BUG-REG-002.md) | Major / P2 | Khuyết thiếu trường Xác nhận mật khẩu trên form đăng ký | Registration | TC-REG-007, TC-MOB-004 |
| [BUG-COUP-001](./bugs/coupon/BUG-COUP-001.md) | Critical / P1 | Dùng sai toán tử so sánh strictly greater than thay vì greater than or equal tại ngưỡng tối thiểu 300.000 ₫ | Coupon | TC-COUP-002 |
| [BUG-COUP-002](./bugs/coupon/BUG-COUP-002.md) | Critical / P1 | Công thức tính tiền giảm giá phần trăm sai lệch phát sinh số âm | Coupon | TC-COUP-003, TC-COUP-004 |
| [BUG-COUP-003](./bugs/coupon/BUG-COUP-003.md) | Major / P2 | API không kiểm tra giới hạn lượt sử dụng mã của tài khoản | Coupon | TC-COUP-005 |
| [BUG-ADMN-001](./bugs/admin-products/BUG-ADMN-001.md) | Critical / P1 | Backend API chấp nhận tạo sản phẩm với giá bằng 0 ₫ và giá âm | Admin Products | TC-ADMN-001, TC-ADMN-002 |
| [BUG-ADMN-002](./bugs/admin-products/BUG-ADMN-002.md) | Major / P2 | Backend API chấp nhận tạo sản phẩm tên rỗng và tên vượt 255 ký tự | Admin Products | TC-ADMN-004, TC-ADMN-007 |
| [BUG-MOB-001](./bugs/mobile-registration/BUG-MOB-001.md) | Minor / P3 | Nút Đăng ký vi phạm quy chuẩn GUI FR-21.2 khi sử dụng màu nền Đỏ | Mobile Registration | TC-MOB-005 |

---

## 7. RỦI RO TỒN ĐỌNG VÀ BÀI HỌC KINH NGHIỆM

### 7.1 Rủi ro tồn đọng
- **Rủi ro người dùng không thể tạo tài khoản hợp lệ:** Lỗi regex tại trang đăng ký khiến 100% người dùng nhập mật khẩu theo đúng hướng dẫn có ký tự đặc biệt (ví dụ `Password1!`) bị từ chối, gây tê liệt luồng đăng ký người dùng mới.
- **Rủi ro thất thoát doanh thu và sai lệch thanh toán:** Công thức tính coupon sai khiến đơn hàng bị tính toán sai lệch tiền nghiêm trọng; đồng thời việc từ chối đơn hàng đúng ngưỡng biên 300.000 ₫ gây trải nghiệm tiêu cực cho khách hàng.
- **Rủi ro toàn vẹn cơ sở dữ liệu hàng hóa:** API tạo sản phẩm không validate dữ liệu phía server dẫn đến nguy cơ CSDL bị chèn các bản ghi sản phẩm giá 0 đồng, giá âm hoặc tên rỗng.

### 7.2 Bài học kinh nghiệm
- **Nguyên tắc kiểm tra biên trong lập trình:** Cần chú ý đặc biệt các biểu thức điều kiện biên (toán tử `>=` thay vì `>`), tránh lỗi off-by-one error tại các điểm giao nhau giữa các phân vùng dữ liệu.
- **Validation hai lớp (Defense in Depth):** Không bao giờ phụ thuộc hoàn toàn vào form validation ở phía client; backend bắt buộc phải validate toàn diện kiểu dữ liệu, miền giá trị và tính hợp lệ trước khi thực hiện câu lệnh chèn dữ liệu vào cơ sở dữ liệu.
- **Tính nhất quán giữa tài liệu hướng dẫn và logic kiểm tra:** Thông báo hướng dẫn trên giao diện yêu cầu ký tự đặc biệt nhưng regex kiểm tra lại yêu cầu khoảng trắng là ví dụ điển hình của việc thiếu đồng bộ giữa tài liệu thiết kế và mã nguồn thực thi.

---

## 8. ĐỀ XUẤT CẢI TIẾN VÀ KẾ HOẠCH KHẮC PHỤC

1. **Khắc phục Module Registration:**
   - Thay thế biểu thức regex tại `Register.jsx` bằng regex chuẩn:
     ```javascript
     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     ```
   - Bổ sung ô nhập `confirmPassword` trên cả giao diện Web và Mobile, kiểm tra `password === confirmPassword` trước khi submit.
   - Đổi màu nền nút bấm Đăng ký sang màu Xanh dương (`bg-blue-600`).
2. **Khắc phục Module Coupon:**
   - Sửa toán tử so sánh tại `backend/server.js:379` thành `>=`:
     ```javascript
     if (total_amount >= coupon.min_order_amount)
     ```
   - Điều chỉnh công thức tính giảm giá phần trăm:
     ```javascript
     discount_amount = Math.floor(total_amount * (coupon.discount_value / 100));
     ```
   - Thêm câu lệnh truy vấn kiểm tra số lần đã dùng trong bảng `coupon_usage` so với `max_uses_per_user`.
3. **Khắc phục Module Admin Products:**
   - Thêm middleware kiểm tra `authenticateToken` và `role === 'admin'` cho toàn bộ các route `/api/products`.
   - Validate phía server: kiểm tra `price > 0`, `name.trim().length > 0` và `name.length <= 255`.

---

## 9. ĐÁNH GIÁ TIÊU CHÍ DỪNG KIỂM THỬ (EXIT CRITERIA)

| Tiêu chí xuất xưởng | Yêu cầu chuẩn | Kết quả thực tế đợt 1 | Đánh giá |
|---|---|---|:---:|
| Tỷ lệ thực thi Test Cases | 100% test cases được chạy | 25/25 test cases (100%) | **ĐẠT** |
| Tỷ lệ Pass trên bản build | $\ge 90\%$ | 10/25 test cases (40.00%) | **CHƯA ĐẠT** |
| Lỗi Critical (P1) còn mở | 0 lỗi | 4 lỗi Critical đang mở | **CHƯA ĐẠT** |
| Lỗi Major (P2) còn mở | 0 lỗi | 3 lỗi Major đang mở | **CHƯA ĐẠT** |
| Lỗi Minor (P3) còn mở | Được khoanh vùng và có kế hoạch | 1 lỗi (nút màu đỏ) đã có giải pháp | **ĐẠT** |

---

## 10. KẾT LUẬN VÀ ĐỀ XUẤT NGHIỆM THU

### Kết luận
Bản build Build 1 trên nhánh `fme849/ep-bva` **CHƯA ĐẠT** tiêu chuẩn xuất xưởng và chưa đủ điều kiện bàn giao sang môi trường kiểm thử chấp nhận người dùng (UAT) do tỷ lệ lỗi Critical và Major còn cao (chiếm 87.5% tổng số lỗi phát hiện), ảnh hưởng trực tiếp đến các luồng nghiệp vụ cốt lõi (Đăng ký, Giảm giá và Quản lý sản phẩm).

### Đề xuất hành động tiếp theo
1. Đội ngũ phát triển (Development Team) tiến hành sửa chữa 8 khiếm khuyết theo danh sách chi tiết tại mục 6.4 và tài liệu [tests/bugs/](./bugs).
2. Đóng gói bản build vá lỗi (Build 2 / Fix Build).
3. Đội ngũ QA tái thực thi (Regression Test Run) toàn bộ 25 test scripts Playwright trên Build 2 để xác nhận lỗi đã được khắc phục triệt để mà không phát sinh lỗi hồi quy.

---

## 11. BẢNG THUẬT NGỮ VÀ TỪ VIẾT TẮT

| Thuật ngữ | Tên đầy đủ / Ý nghĩa |
|---|---|
| **SRS** | Software Requirements Specification (Đặc tả yêu cầu phần mềm) |
| **SUT** | System Under Test (Hệ thống đang được kiểm thử) |
| **EP** | Equivalence Partitioning (Kỹ thuật phân hoạch tương đương) |
| **BVA** | Boundary Value Analysis (Kỹ thuật phân tích giá trị biên) |
| **VEC / IEC** | Valid / Invalid Equivalence Class (Lớp tương đương hợp lệ / không hợp lệ) |
| **POM** | Page Object Model (Mô hình đối tượng trang trong tự động hóa kiểm thử) |
| **TC / TR** | Test Case / Test Run |
| **GUI** | Graphical User Interface (Giao diện đồ họa người dùng) |
