# TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATION)
## CHỨC NĂNG: QUẢN TRỊ SẢN PHẨM TRÊN WEB ADMIN (ADMIN PRODUCT CRUD)
### Mã tài liệu: `TD-FR-15` | Yêu cầu nghiệp vụ: `FR-15` | Nhánh: `fme849/ep-bva`

---

## 1. TỔNG QUAN YÊU CẦU & ĐẶC TẢ NGHIỆP VỤ (SRS SPECIFICATION)

- **Mã yêu cầu:** `FR-15` (tham chiếu kiểm soát truy cập `FR-12`, bảo mật `SEC-02`, `SEC-03` và quản lý danh mục `FR-14`).
- **Mô tả chức năng:** Cung cấp cho Quản trị viên (Admin) các công cụ để Thêm mới, Chỉnh sửa, Xem và Xóa sản phẩm trong danh mục hàng hóa của EShop.
- **Phạm vi kiểm thử:** Màn hình Quản trị Sản phẩm trên cổng Web Quản trị (Admin Portal).
- **Đặc tả quy chuẩn nghiệp vụ (Business Rules):**
  1. `Tên sản phẩm`: Trường bắt buộc, không được để trống, độ dài từ 1 đến 255 ký tự ($1 \le L \le 255$).
  2. `Giá sản phẩm`: Trường bắt buộc, phải là **số dương** nghiêm ngặt ($Price > 0$). Giá không được bằng 0 hoặc âm.
  3. `Danh mục (category_id)`: Bắt buộc chọn từ danh sách danh mục hợp lệ đã có trong hệ thống.
  4. `Quyền hạn thực thi`: Chỉ tài khoản có vai trò Quản trị viên (`role === 'admin'`) và mang JWT Token hợp lệ mới được quyền tạo hoặc sửa sản phẩm.

---

## 2. DANH MỤC BIẾN ĐẦU VÀO (INPUT VARIABLES INVENTORY)

| Biến | Tên trường | Kiểu dữ liệu | Miền hợp lệ theo SRS | Mục tiêu kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **$V_1$** | `product_price` | Số thực / Số nguyên (₫) | $Price > 0$ (nghiêm ngặt số dương) | Phân tích giá trị biên ($Min = 1$ ₫) |
| **$V_2$** | `product_name_length` | Số nguyên (ký tự) | $1 \le L \le 255$ | Phân tích giá trị biên 3-giá trị ($Min=1, Max=255$) |
| **$V_3$** | `category_id` | Số nguyên (ID) | Tồn tại trong bảng `categories` | Kiểm tra ràng buộc khóa ngoại |
| **$V_4$** | `auth_role` | Chuỗi ký tự (Role) | Bắt buộc `role === 'admin'` | Kiểm soát truy cập và phân quyền (RBAC) |

---

## 3. PHÂN VÙNG TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

### 3.1 Bảng phân hoạch tương đương cho FR-15:

| Biến đầu vào | Lớp tương đương Hợp lệ (Valid EP - VEC) | Lớp tương đương Không hợp lệ (Invalid EP - IEC) |
| :--- | :--- | :--- |
| **Giá sản phẩm ($V_1$)** | **VEC-PRICE-01:** Số dương $Price > 0$ (Ví dụ: 1 ₫, 10.000 ₫, 100.000.000 ₫). | **IEC-PRICE-01:** Giá bằng 0 ($Price = 0$).<br>**IEC-PRICE-02:** Giá âm ($Price < 0$, ví dụ: -1 ₫, -50.000 ₫).<br>**IEC-PRICE-03:** Để trống hoặc nhập ký tự chữ ("abc"). |
| **Độ dài Tên SP ($V_2$)** | **VEC-PNAME-01:** Chuỗi ký tự độ dài $1 \le L \le 255$. | **IEC-PNAME-01:** Chuỗi rỗng $L = 0$ (để trống).<br>**IEC-PNAME-02:** Chuỗi vượt quá 255 ký tự ($L > 255$). |
| **Danh mục ($V_3$)** | **VEC-CAT-01:** Chọn ID danh mục có sẵn trong CSDL. | **IEC-CAT-01:** Bỏ trống danh mục.<br>**IEC-CAT-02:** ID danh mục không tồn tại. |
| **Phân quyền Admin ($V_4$)**| **VEC-ROLE-01:** Yêu cầu từ tài khoản Quản trị viên (Admin). | **IEC-ROLE-01:** Chưa đăng nhập (khách vãng lai).<br>**IEC-ROLE-02:** Tài khoản Người dùng thông thường (`role === 'user'`). |

---

## 4. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

### 4.1 BVA cho Biến Giá sản phẩm ($Price > 0$):
- **Phân tích tập điểm biên quanh $0$ (với đơn vị tiền tệ nguyên ₫):**
  - $Price = -1$ ₫ ($Min - 2$): Điểm âm ngoài biên $\rightarrow$ **KẾT QUẢ: REJECT (Fail)**. Báo lỗi giá không hợp lệ.
  - $Price = 0$ ₫ ($Min - 1$): Điểm biên ngoài $\rightarrow$ **KẾT QUẢ: REJECT (Fail)**. Báo lỗi giá sản phẩm phải là số dương $> 0$.
  - $Price = 1$ ₫ ($Min$): Điểm biên trong nhỏ nhất $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Hệ thống chấp nhận giá 1 ₫.
  - $Price = 2$ ₫ ($Min + 1$): Điểm biên trong lân cận $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**.
  - $Price = 100.000$ ₫ (Nominal): Giá trị thông thường $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**.

### 4.2 BVA 3-giá trị (Robustness BVA) cho Độ dài Tên sản phẩm ($[1, 255]$ ký tự):
- **Tập điểm 7 vị trí:**
  1. $L = 0$ ($Min - 1$): Rỗng $\rightarrow$ **REJECT**. Báo lỗi tên không được để trống.
  2. $L = 1$ ($Min$): Biên dưới hợp lệ nhỏ nhất $\rightarrow$ **ACCEPT**.
  3. $L = 2$ ($Min + 1$): Biên trong lân cận dưới $\rightarrow$ **ACCEPT**.
  4. $L = 50$ (Nominal): Chuỗi tên thông thường $\rightarrow$ **ACCEPT**.
  5. $L = 254$ ($Max - 1$): Biên trong lân cận trên $\rightarrow$ **ACCEPT**.
  6. $L = 255$ ($Max$): Biên trên tối đa hợp lệ $\rightarrow$ **ACCEPT**.
  7. $L = 256$ ($Max + 1$): Vượt giới hạn tối đa $\rightarrow$ **REJECT**. Báo lỗi tên vượt quá 255 ký tự.

---

## 5. MA TRẬN ÁNH XẠ TEST DESIGN SANG TEST CASES (TRACEABILITY)

| Điều kiện kiểm thử (Test Condition) | Kỹ thuật áp dụng | Dữ liệu kiểm thử đại diện | Kỳ vọng (SRS Expected) | Mã Test Case ánh xạ |
| :--- | :--- | :--- | :--- | :--- |
| Tạo sản phẩm với giá bằng 0 ₫ | BVA ($Min - 1$) / EP (IEC-PRICE-01) | Price: `0`, Name: `Sản phẩm Test` | Báo lỗi giá phải lớn hơn 0 | **`TC-ADMN-001`** |
| Tạo sản phẩm với giá âm (-1 ₫) | BVA ($Min - 2$) / EP (IEC-PRICE-02) | Price: `-1`, Name: `Sản phẩm Test` | Báo lỗi giá không hợp lệ | **`TC-ADMN-002`** |
| Tạo sản phẩm với giá đúng 1 ₫ | BVA ($Min$) / EP (VEC-PRICE-01) | Price: `1`, Name: `Sticker EShop` | Tạo sản phẩm thành công | **`TC-ADMN-003`** |
| Tạo sản phẩm với tên rỗng (0 ký tự) | BVA ($Min - 1$) / EP (IEC-PNAME-01) | Name: `""`, Price: `100.000` ₫ | Báo lỗi tên không được để trống | **`TC-ADMN-004`** |
| Tạo sản phẩm với tên dài 1 ký tự | BVA ($Min$) / EP (VEC-PNAME-01) | Name: `"A"`, Price: `100.000` ₫ | Tạo sản phẩm thành công | **`TC-ADMN-005`** |
| Tạo sản phẩm với tên dài đúng 255 ký tự| BVA ($Max$) / EP (VEC-PNAME-01) | Name: 255 ký tự `"A"`, Price: `100.000` ₫ | Tạo sản phẩm thành công | **`TC-ADMN-006`** |
| Tạo sản phẩm với tên dài 256 ký tự | BVA ($Max + 1$) / EP (IEC-PNAME-02) | Name: 256 ký tự `"A"`, Price: `100.000` ₫ | Báo lỗi tên vượt quá 255 ký tự | **`TC-ADMN-007`** |
