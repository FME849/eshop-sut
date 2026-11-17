# TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATION)
## CHỨC NĂNG: ÁP DỤNG MÃ GIẢM GIÁ (COUPON APPLICATION)
### Mã tài liệu: `TD-FR-09` | Yêu cầu nghiệp vụ: `FR-09` | Dự án: EShop

---

## 1. TỔNG QUAN YÊU CẦU & ĐẶC TẢ NGHIỆP VỤ (SRS SPECIFICATION)

- **Mã yêu cầu:** `FR-09` (Tính năng Khuyến mãi và Giảm giá).
- **Mô tả chức năng:** Cho phép khách hàng áp dụng mã giảm giá hợp lệ tại bước giỏ hàng / thanh toán để được chiết khấu trực tiếp trên tổng giá trị đơn hàng.
- **Phạm vi kiểm thử:** API Endpoint `/api/apply-coupon` và giao diện thanh toán `/checkout`.
- **Đặc tả quy chuẩn nghiệp vụ (Business Rules):**
  1. `Tồn tại mã`: Mã giảm giá phải tồn tại trong hệ thống.
  2. `Trạng thái kích hoạt`: Mã phải đang ở trạng thái kích hoạt (`active = 1`).
  3. `Hạn sử dụng`: Ngày hiện tại phải nằm trong khoảng thời gian có hiệu lực (`valid_from <= CurrentDate <= valid_until`).
  4. `Giới hạn số lần sử dụng`: Tổng số lần sử dụng của mã chưa đạt mức tối đa (`usage_count < usage_limit`). Mỗi người dùng chỉ được dùng tối đa 1 lần nếu có quy định.
  5. `Ngưỡng đơn hàng tối thiểu (Min Order Amount)`: Giá trị tổng tiền đơn hàng phải lớn hơn hoặc bằng giá trị tối thiểu của mã (`total_amount >= min_order_amount`). Mã mẫu `DISCOUNT20` yêu cầu tối thiểu $300.000$ ₫.
  6. `Công thức chiết khấu`:
     - Giảm theo tỷ lệ phần trăm: $Discount = total\_amount \times \frac{discount\_value}{100}$.
     - Giảm theo số tiền cố định: $Discount = discount\_value$.
     - Tổng tiền thanh toán sau giảm: $Final = total\_amount - Discount$.

---

## 2. DANH MỤC BIẾN ĐẦU VÀO (INPUT VARIABLES INVENTORY)

| Biến | Tên trường | Kiểu dữ liệu | Miền hợp lệ theo SRS | Mục tiêu kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **$V_1$** | `code` (Mã giảm giá) | String | Chuỗi ký tự tồn tại trong CSDL | Tính tồn tại của mã khuyến mãi |
| **$V_2$** | `total_amount` | Number (VNĐ) | $total\_amount \ge 300.000$ ₫ | Phân tích giá trị biên ($Min = 300.000$ ₫) |
| **$V_3$** | `current_date` | Date | `valid_from` $\le current\_date \le$ `valid_until` | Phân tích giá trị biên ngày hiệu lực |
| **$V_4$** | `usage_count` | Integer | $usage\_count < usage\_limit$ | Giới hạn lượt sử dụng |
| **$V_5$** | `user_used` | Boolean | `False` (người dùng chưa từng dùng mã này) | Kiểm tra ràng buộc người dùng |

---

## 3. PHÂN VÙNG TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

| Biến đầu vào | Lớp tương đương Hợp lệ (Valid EP - VEC) | Lớp tương đương Không hợp lệ (Invalid EP - IEC) |
| :--- | :--- | :--- |
| **Mã giảm giá ($V_1$)** | **VEC-CODE-01:** Mã tồn tại và đang active (`DISCOUNT20`). | **IEC-CODE-01:** Mã không tồn tại (`INVALIDCODE`).<br>**IEC-CODE-02:** Mã bị vô hiệu hóa (`active = 0`). |
| **Tổng tiền ($V_2$)** | **VEC-AMT-01:** $total\_amount \ge 300.000$ ₫. | **IEC-AMT-01:** $total\_amount < 300.000$ ₫. |
| **Hạn sử dụng ($V_3$)** | **VEC-DATE-01:** Ngày hiện tại nằm trong hạn. | **IEC-DATE-01:** Chưa đến ngày hiệu lực ($Date < valid\_from$).<br>**IEC-DATE-02:** Đã hết hạn ($Date > valid\_until$). |
| **Lượt sử dụng ($V_4$)** | **VEC-USE-01:** Mã còn lượt dùng ($usage < limit$). | **IEC-USE-01:** Mã đã hết lượt dùng chung ($usage \ge limit$). |
| **Người dùng ($V_5$)** | **VEC-USR-01:** Người dùng chưa từng dùng mã này. | **IEC-USR-01:** Người dùng đã từng áp dụng mã này trước đó. |

---

## 4. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

### 4.1 BVA cho Biến Tổng tiền đơn hàng `total_amount` ($Min = 300.000$ ₫):
- **Miền giá trị hợp lệ:** $[300.000, +\infty)$.
- Áp dụng kỹ thuật 3 giá trị biên:

| Điểm biên | Giá trị cụ thể | Thuộc lớp | Kỳ vọng hành vi hệ thống (SRS Expected) |
| :---: | :--- | :---: | :--- |
| **$Min - 1$** | $299.000$ ₫ (hoặc $299.999$ ₫) | IEC | **REJECT:** Từ chối áp dụng, báo lỗi đơn hàng chưa đạt mức tối thiểu $300.000$ ₫. |
| **$Min$** | $300.000$ ₫ | VEC | **ACCEPT:** Áp dụng thành công, chiết khấu 20% = $60.000$ ₫, thanh toán $240.000$ ₫. |
| **$Min + 1$** | $301.000$ ₫ | VEC | **ACCEPT:** Áp dụng thành công, chiết khấu 20% = $60.200$ ₫, thanh toán $240.800$ ₫. |

---

## 5. MA TRẬN ÁNH XẠ TEST DESIGN SANG TEST CASES (TRACEABILITY)

| Điều kiện kiểm thử (Test Condition) | Kỹ thuật áp dụng | Dữ liệu kiểm thử đại diện | Kỳ vọng theo SRS | Mã Test Case ánh xạ |
| :--- | :--- | :--- | :--- | :--- |
| Áp dụng coupon với đơn hàng đúng ngưỡng tối thiểu $300.000$ ₫ | BVA ($Min$) / EP (VEC-AMT-01) | Code: `DISCOUNT20`, Tổng: $300.000$ ₫ | Áp dụng thành công, giảm 20% ($60.000$ ₫), thanh toán $240.000$ ₫ | **`TC-COUP-001`** |
| Áp dụng coupon với đơn hàng dưới ngưỡng tối thiểu $299.000$ ₫ | BVA ($Min - 1$) / EP (IEC-AMT-01) | Code: `DISCOUNT20`, Tổng: $299.000$ ₫ | Từ chối, báo lỗi đơn hàng tối thiểu $300.000$ ₫ | **`TC-COUP-002`** |
| Áp dụng coupon với đơn hàng trên ngưỡng tối thiểu $500.000$ ₫ | EP (VEC-AMT-01) | Code: `DISCOUNT20`, Tổng: $500.000$ ₫ | Áp dụng thành công, giảm 20% ($100.000$ ₫), thanh toán $400.000$ ₫ | **`TC-COUP-003`** |
| Áp dụng mã giảm giá không tồn tại trong hệ thống | EP (IEC-CODE-01) | Code: `NONEXIST20`, Tổng: $500.000$ ₫ | Từ chối, báo lỗi mã giảm giá không hợp lệ | **`TC-COUP-004`** |
| Áp dụng mã giảm giá đã hết hạn sử dụng | EP (IEC-DATE-02) | Code: `EXPIRED10`, Tổng: $500.000$ ₫ | Từ chối, báo lỗi mã giảm giá đã hết hạn | **`TC-COUP-005`** |
| Cùng một người dùng áp dụng mã đã dùng ở đơn hàng trước | EP (IEC-USR-01) | Code: `DISCOUNT20`, User đã dùng 1 lần | Từ chối, báo lỗi mỗi người dùng chỉ được dùng 1 lần | **`TC-COUP-006`** |
