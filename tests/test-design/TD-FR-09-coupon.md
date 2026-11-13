# TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATION)
## CHỨC NĂNG: ÁP DỤNG MÃ GIẢM GIÁ (COUPON APPLICATION)
### Mã tài liệu: `TD-FR-09` | Yêu cầu nghiệp vụ: `FR-09` | Nhánh: `fme849/ep-bva`

---

## 1. TỔNG QUAN YÊU CẦU & ĐẶC TẢ NGHIỆP VỤ (SRS SPECIFICATION)

- **Mã yêu cầu:** `FR-09` (tham chiếu quy tắc thanh toán `FR-08` và tính toàn vẹn giao dịch `NFR-03`).
- **Mô tả chức năng:** Cho phép khách hàng áp dụng mã ưu đãi/khuyến mãi (Coupon) để nhận chiết khấu tiền mặt hoặc phần trăm trên tổng giá trị đơn hàng.
- **Phạm vi kiểm thử:** Chức năng Áp dụng mã giảm giá tại Giỏ hàng và Thanh toán.
- **5 Điều kiện tiên quyết để chấp nhận Mã giảm giá ($C_1 \rightarrow C_5$):**
  - **$C_1$ (Trạng thái Active):** Mã có tồn tại trong CSDL và cờ `is_active = 1`.
  - **$C_2$ (Hạn sử dụng):** Thời gian thực hiện giao dịch phải thỏa mãn $\text{current\_time} \le \text{expired\_at}$.
  - **$C_3$ (Ngưỡng đơn hàng tối thiểu):** Tổng giá trị đơn hàng phải **$\ge$ (lớn hơn hoặc bằng)** `min_order_amount`.
  - **$C_4$ (Xác thực người dùng):** Khách hàng bắt buộc phải đăng nhập (gửi kèm JWT Bearer Token hợp lệ).
  - **$C_5$ (Giới hạn lượt sử dụng cá nhân):** Số lần khách hàng đã sử dụng mã này trong quá khứ phải thỏa mãn $\text{used\_count} < \text{max\_uses\_per\_user}$.
- **Công thức tính giá trị chiết khấu:**
  - Nếu `discount_type === 'percent'`:
    $$\text{discount\_amount} = \text{total\_amount} \times \frac{\text{discount\_value}}{100}$$
  - Nếu `discount_type === 'fixed'`:
    $$\text{discount\_amount} = \text{discount\_value}$$
  - Tổng tiền sau giảm giá: $\text{final\_amount} = \max(0, \text{total\_amount} - \text{discount\_amount})$.

---

## 2. DANH MỤC BIẾN ĐẦU VÀO (INPUT VARIABLES INVENTORY)

| Biến | Tên trường | Kiểu dữ liệu | Miền hợp lệ theo SRS | Mục tiêu kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **$V_1$** | `coupon_code` | Chuỗi ký tự (String) | Tồn tại trong CSDL, `is_active = 1` | Kiểm tra tồn tại, kích hoạt, hạn dùng |
| **$V_2$** | `total_amount` | Số tiền (₫) | $Total \ge min\_order\_amount$ | Phân tích giá trị biên ngưỡng ($Min$) |
| **$V_3$** | `user_usage_count` | Số nguyên (Integer) | $0 \le Count < max\_uses\_per\_user$ | Phân tích giá trị biên lượt dùng ($Max$) |
| **$V_4$** | `auth_token` | JWT Token | Hợp lệ, chưa hết hạn | Phân quyền và xác thực người dùng |

---

## 3. PHÂN VÙNG TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

### 3.1 Bảng phân hoạch tương đương cho FR-09:

| Biến đầu vào | Lớp tương đương Hợp lệ (Valid EP - VEC) | Lớp tương đương Không hợp lệ (Invalid EP - IEC) |
| :--- | :--- | :--- |
| **Tổng tiền đơn hàng ($V_2$)** | **VEC-COUP-TOTAL-01:** $Total \ge min\_order\_amount$ (Ví dụ: với `SAVE10`, $Total \ge 300.000$ ₫). | **IEC-COUP-TOTAL-01:** $0 < Total < min\_order\_amount$ (chưa đủ điều kiện tối thiểu).<br>**IEC-COUP-TOTAL-02:** $Total \le 0$ (tổng tiền không hợp lệ). |
| **Mã giảm giá ($V_1$)** | **VEC-COUP-CODE-01:** Mã tồn tại, đang active, còn hạn sử dụng (`SAVE10`, `BIGBUY`, `VIP100`). | **IEC-COUP-CODE-01:** Mã không tồn tại trong hệ thống (`NOSUCHCODE`).<br>**IEC-COUP-CODE-02:** Mã đã hết hạn (`EXPIRED` có hạn `2020-01-01`).<br>**IEC-COUP-CODE-03:** Mã bị vô hiệu hóa (`is_active = 0`). |
| **Lượt sử dụng ($V_3$)** | **VEC-COUP-USE-01:** User đã dùng $< max\_uses$ (Ví dụ với `SAVE10`: đã dùng 0 lần). | **IEC-COUP-USE-01:** User đã dùng $\ge max\_uses$ (Ví dụ với `SAVE10`: đã dùng $\ge 1$ lần). |
| **Trạng thái Xác thực ($V_4$)** | **VEC-COUP-AUTH-01:** Khách hàng đã đăng nhập tài khoản hợp lệ. | **IEC-COUP-AUTH-01:** Khách hàng chưa đăng nhập (khách vãng lai).<br>**IEC-COUP-AUTH-02:** Token phiên làm việc không hợp lệ hoặc đã hết hạn. |

---

## 4. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

### 4.1 BVA cho Biến Tổng tiền đơn hàng (`SAVE10` có $min\_order\_amount = 300.000$ ₫):
- **Ngưỡng biên dưới ($Min = 300.000$ ₫):**
  - $Total = 299.999$ ₫ ($Min - 1$ đơn vị tiền tệ): Biên ngoài dưới $\rightarrow$ **KẾT QUẢ: REJECT (Fail)**. Hệ thống từ chối áp dụng và hiển thị thông báo lỗi đơn hàng chưa đủ giá trị tối thiểu.
  - $Total = 300.000$ ₫ ($Min$): Biên trong chính xác $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Hệ thống chấp nhận mã và áp dụng giảm 10% ($30.000$ ₫).
  - $Total = 300.001$ ₫ ($Min + 1$): Biên trong lân cận $\rightarrow$ **KẾT QUẢ: ACCEPT (Pass)**. Hệ thống chấp nhận mã và giảm 10%.

### 4.2 BVA cho Biến Lượt sử dụng cá nhân (`SAVE10` có $max\_uses\_per\_user = 1$ lần):
- **Ngưỡng giới hạn ($Max = 1$):**
  - Đã dùng $0$ lần ($Max - 1$): **ACCEPT (Pass)**. Cho phép áp dụng mã.
  - Đã dùng $1$ lần ($Max$): **REJECT (Fail)**. Từ chối do đã đạt giới hạn tối đa.
  - Đã dùng $2$ lần ($Max + 1$): **REJECT (Fail)**. Tiếp tục chặn không cho sử dụng.

### 4.3 BVA cho Biến Lượt sử dụng mã `VIP100` ($max\_uses\_per\_user = 2$ lần):
- Đã dùng $0$ lần: ACCEPT.
- Đã dùng $1$ lần ($Max - 1$): ACCEPT.
- Đã dùng $2$ lần ($Max$): REJECT (Đã dùng đủ 2 lần tối đa).

---

## 5. MA TRẬN ÁNH XẠ TEST DESIGN SANG TEST CASES (TRACEABILITY)

| Điều kiện kiểm thử (Test Condition) | Kỹ thuật áp dụng | Dữ liệu kiểm thử đại diện | Kỳ vọng (SRS Expected) | Mã Test Case ánh xạ |
| :--- | :--- | :--- | :--- | :--- |
| Áp dụng `SAVE10` với tổng đơn 299.999 ₫ | BVA ($Min - 1$) / EP (IEC-COUP-TOTAL-01) | Code: `SAVE10`, Total: $299.999$ ₫ | Báo lỗi chưa đạt tối thiểu 300.000 ₫ | **`TC-COUP-001`** |
| Áp dụng `SAVE10` với tổng đơn đúng 300.000 ₫ | BVA ($Min$) / EP (VEC-COUP-TOTAL-01) | Code: `SAVE10`, Total: $300.000$ ₫ | Áp dụng thành công, giảm 30.000 ₫ | **`TC-COUP-002`** |
| Áp dụng `SAVE10` với tổng đơn 300.001 ₫ | BVA ($Min + 1$) / EP (VEC-COUP-TOTAL-01) | Code: `SAVE10`, Total: $300.001$ ₫ | Áp dụng thành công, giảm 10% | **`TC-COUP-003`** |
| Áp dụng `SAVE10` lần đầu (0 lần dùng) | BVA ($Max - 1$) / EP (VEC-COUP-USE-01) | User lượt dùng = 0, Total: $400.000$ ₫ | Áp dụng mã thành công | **`TC-COUP-004`** |
| Áp dụng `SAVE10` lần thứ 2 vượt giới hạn | BVA ($Max$) / EP (IEC-COUP-USE-01) | User lượt dùng = 1, Total: $400.000$ ₫ | Báo lỗi đã hết lượt dùng | **`TC-COUP-005`** |
| Áp dụng mã giảm giá đã hết hạn sử dụng | EP (IEC-COUP-CODE-02) | Code: `EXPIRED`, Total: $500.000$ ₫ | Báo lỗi mã giảm giá đã hết hạn | **`TC-COUP-006`** |
