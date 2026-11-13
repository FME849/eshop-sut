# TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATION)
## CHỨC NĂNG: ĐĂNG KÝ TÀI KHOẢN TRÊN WEB (USER REGISTRATION)
### Mã tài liệu: `TD-FR-01` | Yêu cầu nghiệp vụ: `FR-01` | Nhánh: `fme849/ep-bva`

---

## 1. TỔNG QUAN YÊU CẦU & ĐẶC TẢ NGHIỆP VỤ (SRS SPECIFICATION)

- **Mã yêu cầu:** `FR-01` (tham chiếu tiêu chuẩn giao diện `FR-21`, `FR-22` và bảo mật `SEC-01`).
- **Mô tả chức năng:** Cho phép khách hàng mới đăng ký tài khoản trên nền tảng Web EShop để thực hiện các thao tác mua sắm, áp dụng mã giảm giá và quản lý đơn hàng.
- **Phạm vi kiểm thử:** Màn hình Đăng ký tài khoản người dùng trên nền tảng Web (`/register`).
- **Đặc tả quy chuẩn nghiệp vụ (Business Rules):**
  1. `Họ Tên`: Trường bắt buộc, độ dài từ 1 đến 100 ký tự ($1 \le L \le 100$).
  2. `Email`: Trường bắt buộc, đúng định dạng RFC 5322 (`user@domain.tld`), duy nhất trong hệ thống (chưa từng được đăng ký trong CSDL).
  3. `Mật khẩu`: Trường bắt buộc, áp dụng chính sách mật khẩu mạnh:
     - Độ dài tối thiểu 8 ký tự ($L \ge 8$).
     - Chứa tối thiểu 1 chữ cái in hoa (`A-Z`).
     - Chứa tối thiểu 1 chữ cái in thường (`a-z`).
     - Chứa tối thiểu 1 chữ số (`0-9`).
     - Chứa tối thiểu 1 ký tự đặc biệt thuộc tập ký tự cho phép: `[@, $, !, %, *, ?, &]`.
     - Không chứa ký tự khoảng trắng (whitespace).
  4. `Xác nhận mật khẩu`: Trường bắt buộc, chuỗi nhập phải khớp 100% với Mật khẩu đã nhập.
  5. `Hành vi sau khi đăng ký thành công`: Thông báo thành công và tự động điều hướng sang trang Đăng nhập (`/login`).

---

## 2. DANH MỤC BIẾN ĐẦU VÀO (INPUT VARIABLES INVENTORY)

| Biến | Tên trường | Kiểu dữ liệu | Miền hợp lệ theo SRS | Mục tiêu kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **$V_1$** | `name` (Họ Tên) | Chuỗi ký tự (String) | Độ dài $1 \le L_{name} \le 100$ | Kiểm tra bắt buộc, độ dài min/max |
| **$V_2$** | `email` (Email) | Chuỗi ký tự (String) | Chuẩn RFC 5322, chưa tồn tại trong DB | Định dạng regex, tính duy nhất |
| **$V_3$** | `password_length` | Số nguyên (Integer) | $L_{pass} \ge 8$ ký tự | Phân tích giá trị biên ($Min = 8$) |
| **$V_4$** | `password_charset` | Tập ký tự (Charset) | Đủ 4 tập: `[A-Z]`, `[a-z]`, `[0-9]`, `[@$!%*?&]` | Kiểm tra tổ hợp lớp tương đương |
| **$V_5$** | `confirm_password` | Chuỗi ký tự (String) | Trùng khớp 100% với $V_3, V_4$ | Tính toàn vẹn và trùng khớp dữ liệu |

---

## 3. PHÂN VÙNG TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

### 3.1 Bảng phân hoạch tương đương cho từng biến:

| Biến đầu vào | Lớp tương đương Hợp lệ (Valid EP - VEC) | Lớp tương đương Không hợp lệ (Invalid EP - IEC) |
| :--- | :--- | :--- |
| **Họ Tên ($V_1$)** | **VEC-NAME-01:** Chuỗi độ dài $1 \le L \le 100$ ký tự hợp lệ. | **IEC-NAME-01:** Chuỗi rỗng $L = 0$ (bỏ trống).<br>**IEC-NAME-02:** Chuỗi vượt quá 100 ký tự ($L > 100$). |
| **Email ($V_2$)** | **VEC-MAIL-01:** Đúng định dạng RFC 5322 và chưa có trong CSDL. | **IEC-MAIL-01:** Bỏ trống ($L = 0$).<br>**IEC-MAIL-02:** Sai định dạng (thiếu `@`, thiếu domain, chứa dấu cách).<br>**IEC-MAIL-03:** Email đã tồn tại trong CSDL (`test@eshop.com`). |
| **Độ dài Mật khẩu ($V_3$)** | **VEC-PASS-01:** Chuỗi có độ dài $L \ge 8$. | **IEC-PASS-01:** Chuỗi có độ dài $1 \le L \le 7$ (quá ngắn).<br>**IEC-PASS-02:** Chuỗi rỗng $L = 0$. |
| **Thành phần Mật khẩu ($V_4$)** | **VEC-CHAR-01:** Chứa đủ 4 nhóm: 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt cho phép. | **IEC-CHAR-01:** Thiếu chữ in hoa (`A-Z`).<br>**IEC-CHAR-02:** Thiếu chữ in thường (`a-z`).<br>**IEC-CHAR-03:** Thiếu chữ số (`0-9`).<br>**IEC-CHAR-04:** Thiếu ký tự đặc biệt trong tập quy chuẩn.<br>**IEC-CHAR-05:** Chứa ký tự đặc biệt ngoài danh sách (`~`, `#`, `^`).<br>**IEC-CHAR-06:** Chứa khoảng trắng (` `). |
| **Xác nhận Mật khẩu ($V_5$)**| **VEC-CONF-01:** Khớp chính xác 100% với mật khẩu đã nhập. | **IEC-CONF-01:** Khác mật khẩu (sai lệch ít nhất 1 ký tự hoặc khác hoa/thường).<br>**IEC-CONF-02:** Bỏ trống trường xác nhận mật khẩu. |

---

## 4. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

### 4.1 BVA cho Biến Độ dài Mật khẩu ($Min = 8$ ký tự):
- **Miền giá trị:** $[8, +\infty)$.
- **Điểm biên dưới cần kiểm thử:**
  - $L = 7$ ($Min - 1$): Điểm biên ngoài dưới $\rightarrow$ **KẾT QUẢ: REJECT (Fail)**. Hệ thống từ chối và thông báo lỗi mật khẩu tối thiểu 8 ký tự.
  - $L = 8$ ($Min$): Điểm biên trong nhỏ nhất $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Hệ thống chấp nhận mật khẩu.
  - $L = 9$ ($Min + 1$): Điểm biên trong lân cận $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Hệ thống chấp nhận bình thường.

### 4.2 BVA cho Biến Độ dài Họ Tên ($[1, 100]$ ký tự):
- $L = 0$ ($Min - 1$): Rỗng $\rightarrow$ REJECT.
- $L = 1$ ($Min$): Hợp lệ biên dưới $\rightarrow$ ACCEPT.
- $L = 100$ ($Max$): Hợp lệ biên trên $\rightarrow$ ACCEPT.
- $L = 101$ ($Max + 1$): Vượt giới hạn $\rightarrow$ REJECT.

---

## 5. MA TRẬN ÁNH XẠ TEST DESIGN SANG TEST CASES (TRACEABILITY)

| Điều kiện kiểm thử (Test Condition) | Kỹ thuật áp dụng | Dữ liệu kiểm thử đại diện | Kỳ vọng (SRS Expected) | Mã Test Case ánh xạ |
| :--- | :--- | :--- | :--- | :--- |
| Đăng ký với mật khẩu đúng 8 ký tự đủ điều kiện | BVA ($Min$) / EP (VEC-PASS-01) | `Password1!` (8 ký tự) | Đăng ký thành công, chuyển sang /login | **`TC-REG-001`** |
| Đăng ký với mật khẩu 7 ký tự | BVA ($Min - 1$) / EP (IEC-PASS-01) | `Passw1!` (7 ký tự) | Báo lỗi độ dài $\ge 8$ | **`TC-REG-002`** |
| Đăng ký với mật khẩu 9 ký tự | BVA ($Min + 1$) / EP (VEC-PASS-01) | `Password12!` (9 ký tự) | Đăng ký thành công | **`TC-REG-003`** |
| Mật khẩu thiếu ký tự chữ in hoa | EP (IEC-CHAR-01) | `password123!` | Báo lỗi thiếu chữ in hoa | **`TC-REG-004`** |
| Mật khẩu thiếu ký tự đặc biệt | EP (IEC-CHAR-04) | `Password123` | Báo lỗi thiếu ký tự đặc biệt | **`TC-REG-005`** |
| Mật khẩu chứa khoảng trắng | EP (IEC-CHAR-06) | `Pass 123!` | Báo lỗi không chứa dấu cách | **`TC-REG-006`** |
| Xác nhận mật khẩu không khớp | EP (IEC-CONF-01) | Pass: `Password1!`, Confirm: `Password2!` | Báo lỗi không khớp mật khẩu | **`TC-REG-007`** |
