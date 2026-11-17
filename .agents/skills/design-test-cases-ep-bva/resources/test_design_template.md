# TÀI LIỆU PHÂN TÍCH THIẾT KẾ KIỂM THỬ (TEST DESIGN SPECIFICATION)
## CHỨC NĂNG: [TÊN CHỨC NĂNG] ([TÊN TIẾNG ANH NẾU CÓ])
### Mã tài liệu: `TD-[REQ_ID]` | Yêu cầu nghiệp vụ: `[MÃ_YÊU_CẦU]` | Dự án: `[TÊN_DỰ_ÁN]`

---

## 1. TỔNG QUAN YÊU CẦU & ĐẶC TẢ NGHIỆP VỤ (SRS SPECIFICATION)

- **Mã yêu cầu:** `[REQ_ID]` (Tham chiếu các tiêu chuẩn liên quan: `[GUI_ID]`, `[SEC_ID]`,...).
- **Mô tả chức năng:** [Mô tả tóm tắt mục tiêu nghiệp vụ của chức năng theo đặc tả SRS].
- **Phạm vi kiểm thử:** [Màn hình, giao diện hoặc API endpoint chịu trách nhiệm thực thi].
- **Đặc tả quy chuẩn nghiệp vụ (Business Rules / Constraints):**
  1. `[Tên trường 1 / Điều kiện 1]`: [Quy tắc bắt buộc, định dạng, độ dài, khoảng giá trị...].
  2. `[Tên trường 2 / Điều kiện 2]`: [Quy tắc bắt buộc, định dạng, độ dài, khoảng giá trị...].
  3. `[Quy tắc tính toán / Điều kiện logic]`: [Công thức chiết khấu, logic xử lý, ràng buộc thời gian/trạng thái...].
  4. `[Hành vi hệ thống khi thành công / thất bại]`: [Thông báo, điều hướng, cập nhật dữ liệu...].

> **[LƯU Ý QUAN TRỌNG - NGUYÊN TẮC HỘP ĐEN]**
> Toàn bộ đặc tả trên phải được trích xuất 100% từ tài liệu yêu cầu (SRS, Acceptance Criteria, Business Rules). Tuyệt đối **KHÔNG** soi mã nguồn để tìm bug trước rồi viết test design theo bug.

---

## 2. DANH MỤC BIẾN ĐẦU VÀO (INPUT VARIABLES INVENTORY)

Liệt kê tất cả các biến đầu vào, tham số hoặc trạng thái ảnh hưởng đến hành vi chức năng:

| Biến | Tên trường / Tham số | Kiểu dữ liệu | Miền giá trị hợp lệ theo SRS | Mục tiêu kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **$V_1$** | `[field_name_1]` | String / Number / Date | `[Min..Max]`, Định dạng, Danh sách | Kiểm tra trường bắt buộc, độ dài, định dạng |
| **$V_2$** | `[field_name_2]` | Integer / Float | $Value \ge X$ hoặc $Min \le Value \le Max$ | Phân tích giá trị biên ngưỡng giá trị |
| **$V_3$** | `[field_name_3]` | Boolean / Enum | `{Giá trị A, Giá trị B}` | Kiểm tra phân hoạch tương đương trạng thái |

---

## 3. PHÂN VÙNG TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

Phân chia miền dữ liệu của từng biến đầu vào thành các lớp tương đương hợp lệ (VEC) và không hợp lệ (IEC):

| Biến đầu vào | Lớp tương đương Hợp lệ (Valid EP - VEC) | Lớp tương đương Không hợp lệ (Invalid EP - IEC) |
| :--- | :--- | :--- |
| **[Tên biến $V_1$]** | **VEC-[VAR]-01:** [Mô tả giá trị hợp lệ, ví dụ: chuỗi độ dài từ 1..100 ký tự]. | **IEC-[VAR]-01:** [Bỏ trống / chuỗi rỗng].<br>**IEC-[VAR]-02:** [Chuỗi vượt quá 100 ký tự].<br>**IEC-[VAR]-03:** [Sai định dạng quy định]. |
| **[Tên biến $V_2$]** | **VEC-[VAR]-01:** [Giá trị số nằm trong khoảng hợp lệ]. | **IEC-[VAR]-01:** [Giá trị nhỏ hơn ngưỡng tối thiểu].<br>**IEC-[VAR]-02:** [Giá trị lớn hơn ngưỡng tối đa].<br>**IEC-[VAR]-03:** [Giá trị âm hoặc ký tự phi số]. |

> **Nguyên tắc tổ hợp lớp tương đương:**
> - **Positive Test:** Kết hợp các lớp hợp lệ (VEC) của tất cả các biến vào chung 1 kịch bản để tối ưu số lượng test case.
> - **Negative Test:** Áp dụng nguyên tắc **Single Fault Assumption** — mỗi test case chỉ chọn DUY NHẤT một lớp không hợp lệ (IEC) của một biến, tất cả các biến còn lại phải giữ ở lớp hợp lệ (VEC) để cô lập chính xác nguyên nhân lỗi.

---

## 4. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

Xác định các điểm biên cho các biến có miền giá trị có thứ tự (số nguyên, số thực, độ dài chuỗi ký tự, ngày tháng):

### 4.1 BVA cho Biến: [Tên biến có khoảng giá trị, ví dụ: Độ dài hoặc Số tiền]
- **Miền giá trị hợp lệ:** `[Min, Max]` (hoặc `[Min, +∞)`).
- **Kỹ thuật áp dụng:** 2 giá trị biên (Boundary Value) hoặc 3 giá trị biên (Robust Boundary Value).

| Điểm biên | Giá trị cụ thể | Thuộc lớp | Kỳ vọng hành vi hệ thống (SRS Expected) |
| :---: | :--- | :---: | :--- |
| **$Min - 1$** | `[Giá trị ngay dưới biên min]` | IEC | **REJECT:** Hệ thống từ chối và báo lỗi vi phạm cận dưới |
| **$Min$** | `[Giá trị đúng bằng biên min]` | VEC | **ACCEPT:** Hệ thống chấp nhận giá trị hợp lệ nhỏ nhất |
| **$Min + 1$** | `[Giá trị ngay trên biên min]` | VEC | **ACCEPT:** Hệ thống chấp nhận giá trị hợp lệ bình thường |
| **$Max - 1$** | `[Giá trị ngay dưới biên max]` | VEC | **ACCEPT:** Hệ thống chấp nhận giá trị hợp lệ cận trên |
| **$Max$** | `[Giá trị đúng bằng biên max]` | VEC | **ACCEPT:** Hệ thống chấp nhận giá trị hợp lệ lớn nhất |
| **$Max + 1$** | `[Giá trị ngay trên biên max]` | IEC | **REJECT:** Hệ thống từ chối và báo lỗi vi phạm cận trên |

---

## 5. MA TRẬN ÁNH XẠ TEST DESIGN SANG TEST CASES (TRACEABILITY)

Bảng cầu nối chuyển đổi từ phân tích thiết kế sang danh sách test cases cụ thể:

| Điều kiện kiểm thử (Test Condition) | Kỹ thuật áp dụng | Dữ liệu kiểm thử đại diện | Kỳ vọng theo SRS | Mã Test Case ánh xạ |
| :--- | :--- | :--- | :--- | :--- |
| [Mô tả kịch bản test] | BVA ($Min$) / EP (VEC-...) | `[Field: value, ...]` | [Kết quả mong đợi] | **`TC-[MOD]-001`** |
| [Mô tả kịch bản biên ngoài] | BVA ($Min - 1$) / EP (IEC-...) | `[Field: value, ...]` | [Thông báo lỗi cụ thể] | **`TC-[MOD]-002`** |
| [Mô tả kịch bản kiểm tra lỗi định dạng] | EP (IEC-...) | `[Field: value, ...]` | [Thông báo lỗi cụ thể] | **`TC-[MOD]-003`** |
