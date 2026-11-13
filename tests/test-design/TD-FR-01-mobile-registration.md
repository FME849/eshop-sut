# TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATION)
## CHỨC NĂNG: ĐĂNG KÝ TÀI KHOẢN TRÊN ỨNG DỤNG DI ĐỘNG (MOBILE USER REGISTRATION)
### Mã tài liệu: `TD-FR-01-MOB` | Yêu cầu nghiệp vụ: `FR-20` (Đồng bộ `FR-01` Mobile) | Nhánh: `fme849/ep-bva`

---

## 1. TỔNG QUAN YÊU CẦU & ĐẶC TẢ NGHIỆP VỤ (SRS SPECIFICATION)

- **Mã yêu cầu:** `FR-20` (Ứng dụng Di động - Kế thừa đồng bộ `FR-01`, `FR-21`, `FR-22`).
- **Mô tả chức năng:** Cung cấp trải nghiệm đăng ký tài khoản khách hàng trên ứng dụng di động Mobile EShop, đảm bảo tính đồng bộ hoàn toàn về mặt quy tắc nghiệp vụ với hệ thống Web.
- **Phạm vi kiểm thử:** Màn hình Đăng ký tài khoản trên ứng dụng di động Mobile.
- **Đặc tả quy chuẩn nghiệp vụ (Business Rules):**
  1. `Họ Tên`: Bắt buộc, $1 \le L \le 100$.
  2. `Email`: Bắt buộc, đúng định dạng RFC 5322, chưa tồn tại trong CSDL.
  3. `Mật khẩu`: Bắt buộc, độ dài $\ge 8$ ký tự, đủ 4 nhóm (chữ hoa, chữ thường, chữ số, ký tự đặc biệt trong `[@$!%*?&]`).
  4. `Xác nhận mật khẩu`: Bắt buộc có trường nhập và chuỗi nhập phải khớp 100% mật khẩu.
  5. `Quy chuẩn GUI & Usability Mobile (FR-21, FR-22)`:
     - Nút "Đăng Ký" là hành động chính/tích cực $\rightarrow$ Bắt buộc dùng màu **Xanh dương** (vi phạm nếu dùng màu Đỏ).
     - Thông báo lỗi form phải hiển thị **phía trên nút submit** (FR-22.3).
     - Các trường bắt buộc phải có chỉ báo dấu sao đỏ `*` cạnh nhãn (FR-22.1).
     - Trường mật khẩu phải được ẩn ký tự bảo mật (`secure text entry`).

---

## 2. DANH MỤC BIẾN ĐẦU VÀO TRÊN MOBILE (INPUT VARIABLES INVENTORY)

| Biến | Tên trường Mobile | Kiểu Component | Miền hợp lệ theo SRS | Mục tiêu kiểm thử Mobile |
| :---: | :--- | :--- | :--- | :--- |
| **$V_1$** | `Họ Tên` | Trường nhập văn bản (Text Input) | Độ dài $1 \le L \le 100$ | Virtual Keyboard, chuỗi rỗng/dài |
| **$V_2$** | `Email` | Trường nhập Email (Text Input) | RFC 5322, duy nhất trong DB | Định dạng email trên mobile |
| **$V_3$** | `Mật khẩu (độ dài)` | Trường nhập Mật khẩu ẩn | $L \ge 8$ ký tự | BVA tại biên ($Min = 8$) |
| **$V_4$** | `Mật khẩu (thành phần)` | Trường nhập Mật khẩu | Đủ 4 nhóm ký tự theo SRS | Validation tại client mobile |
| **$V_5$** | `Xác nhận mật khẩu` | Trường nhập Mật khẩu ẩn | Khớp 100% với mật khẩu | Kiểm tra xác nhận mật khẩu |

---

## 3. PHÂN VÙNG TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

### 3.1 Bảng phân hoạch tương đương cho Mobile:

| Biến đầu vào | Lớp tương đương Hợp lệ (Valid EP - VEC) | Lớp tương đương Không hợp lệ (Invalid EP - IEC) |
| :--- | :--- | :--- |
| **Độ dài Mật khẩu ($V_3$)** | **VEC-MOB-PASS-01:** Mật khẩu có độ dài $L \ge 8$. | **IEC-MOB-PASS-01:** Độ dài $1 \le L \le 7$ (quá ngắn).<br>**IEC-MOB-PASS-02:** Chuỗi rỗng $L = 0$. |
| **Thành phần Mật khẩu ($V_4$)** | **VEC-MOB-CHAR-01:** Chứa đủ 4 nhóm: chữ hoa, chữ thường, số, ký tự đặc biệt theo SRS (`Pass123!`). | **IEC-MOB-CHAR-01:** Thiếu chữ hoa (`pass123!`).<br>**IEC-MOB-CHAR-02:** Thiếu chữ thường (`PASS123!`).<br>**IEC-MOB-CHAR-03:** Thiếu số (`Password!`).<br>**IEC-MOB-CHAR-04:** Thiếu ký tự đặc biệt (`Password123`).<br>**IEC-MOB-CHAR-05:** Ký tự đặc biệt ngoài danh sách quy chuẩn. |
| **Xác nhận Mật khẩu ($V_5$)**| **VEC-MOB-CONF-01:** Khớp 100% mật khẩu. | **IEC-MOB-CONF-01:** Bỏ trống hoặc không có trường xác nhận trên giao diện.<br>**IEC-MOB-CONF-02:** Không khớp mật khẩu đã nhập. |
| **Quy chuẩn GUI Nút bấm** | **VEC-MOB-GUI-01:** Nút Đăng ký hiển thị màu nền Xanh dương. | **IEC-MOB-GUI-01:** Nút Đăng ký hiển thị màu Đỏ hoặc sai màu quy chuẩn. |

---

## 4. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

### 4.1 BVA cho Biến Độ dài Mật khẩu trên Mobile ($Min = 8$ ký tự):
- **Phân tích hành vi kiểm thử quanh biên $Min = 8$:**
  - $L = 7$ ($Min - 1$): Điểm biên ngoài dưới $\rightarrow$ **KẾT QUẢ: REJECT (Fail)**. Ứng dụng từ chối đăng ký, hiển thị thông báo lỗi yêu cầu mật khẩu tối thiểu 8 ký tự phía trên form.
  - $L = 8$ ($Min$): Điểm biên trong nhỏ nhất $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Hệ thống chấp nhận mật khẩu, đăng ký thành công và hiển thị thông báo thành công.
  - $L = 9$ ($Min + 1$): Điểm biên trong lân cận $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Đăng ký thành công bình thường.

---

## 5. MA TRẬN ÁNH XẠ TEST DESIGN SANG TEST CASES (TRACEABILITY)

| Điều kiện kiểm thử (Test Condition) | Kỹ thuật áp dụng | Dữ liệu kiểm thử đại diện | Kỳ vọng (SRS Expected) | Mã Test Case ánh xạ |
| :--- | :--- | :--- | :--- | :--- |
| Đăng ký Mobile với mật khẩu đúng 8 ký tự | BVA ($Min$) / EP (VEC-MOB-PASS-01) | `Password1!` (8 ký tự) | Thông báo Thành công, chuyển về Login | **`TC-MOB-001`** |
| Đăng ký Mobile với mật khẩu 7 ký tự | BVA ($Min - 1$) / EP (IEC-MOB-PASS-01) | `Passw1!` (7 ký tự) | Thông báo lỗi độ dài phía trên form | **`TC-MOB-002`** |
| Đăng ký Mobile thiếu ký tự đặc biệt | EP (IEC-MOB-CHAR-04) | `Password123` | Báo lỗi yêu cầu có ký tự đặc biệt | **`TC-MOB-003`** |
| Kiểm tra trường Xác nhận mật khẩu trên UI Mobile | GUI / EP (IEC-MOB-CONF-01) | Kiểm tra giao diện màn hình Đăng ký | Phải có trường Xác nhận mật khẩu | **`TC-MOB-004`** |
| Kiểm tra màu sắc nút "Đăng Ký" trên Mobile | GUI Checklist (FR-21.2) | Quan sát màu nút Đăng Ký | Nút phải hiển thị màu Xanh dương | **`TC-MOB-005`** |
