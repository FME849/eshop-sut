# HƯỚNG DẪN PHƯƠNG PHÁP PHÂN HOẠCH TƯƠNG ĐƯƠNG & PHÂN TÍCH GIÁ TRỊ BIÊN

Tài liệu này cung cấp nền tảng lý thuyết và nguyên tắc thực hành chuẩn quốc tế (ISTQB / IEEE 829) khi áp dụng kỹ thuật Phân hoạch tương đương (Equivalence Partitioning - EP) và Phân tích giá trị biên (Boundary Value Analysis - BVA) trong kiểm thử hộp đen.

---

## 1. PHÂN HOẠCH TƯƠNG ĐƯƠNG (EQUIVALENCE PARTITIONING - EP)

### 1.1 Khái niệm & Mục tiêu
- **Mục tiêu:** Giảm thiểu số lượng test cases cần thực thi nhưng vẫn đảm bảo độ bao phủ cao, dựa trên giả định: nếu một giá trị trong một lớp tương đương phát hiện được lỗi (hoặc chạy đúng), thì tất cả các giá trị khác trong cùng lớp đó cũng sẽ hành xử tương tự.
- **Phân loại lớp tương đương:**
  1. **Lớp tương đương Hợp lệ (Valid Equivalence Class - VEC):** Chứa các giá trị thỏa mãn đặc tả yêu cầu, hệ thống phải chấp nhận và xử lý thành công.
  2. **Lớp tương đương Không hợp lệ (Invalid Equivalence Class - IEC):** Chứa các giá trị vi phạm quy tắc đặc tả (rỗng, sai định dạng, vượt ngưỡng, sai loại ký tự), hệ thống phải từ chối và đưa ra thông báo phù hợp.

### 1.2 Hướng dẫn phân chia theo kiểu dữ liệu
1. **Kiểu Khoảng liên tục (Continuous Range):** Ví dụ: Độ tuổi từ 18 đến 60.
   - 1 VEC: $18 \le x \le 60$.
   - 2 IEC: $x < 18$ và $x > 60$.
2. **Kiểu Số lượng / Kích thước (Number of Values):** Ví dụ: Số lượng sản phẩm từ 1 đến 10.
   - 1 VEC: $1 \le count \le 10$.
   - 2 IEC: $count < 1$ (hoặc 0) và $count > 10$.
3. **Kiểu Tập hợp (Set of Values / Enum):** Ví dụ: Phương thức thanh toán thuộc {COD, MOMO, VNPAY}.
   - Các VEC: Từng giá trị hợp lệ riêng biệt.
   - 1 IEC: Bất kỳ giá trị nào không nằm trong danh sách (ví dụ: BITCOIN).
4. **Kiểu Ràng buộc định dạng / Chuỗi (Format / String Constraints):** Ví dụ: Email chuẩn RFC, Mật khẩu có chữ hoa, chữ thường, số, ký tự đặc biệt.
   - 1 VEC: Chuỗi thỏa mãn đồng thời tất cả các quy tắc.
   - Các IEC: Từng vi phạm riêng biệt (thiếu hoa, thiếu thường, thiếu số, chứa khoảng trắng...).

### 1.3 Quy tắc tổ hợp kiểm thử (Test Combination Rules)
- **Positive Test Cases:** Tổ hợp các VEC của tất cả các biến vào trong cùng 1 test case nhằm tối ưu hóa chi phí thực thi (Happy Path).
- **Negative Test Cases (Quy tắc Single Fault Assumption):** Mỗi test case tiêu cực **CHỈ ĐƯỢC CHỨA ĐÚNG 1 IEC** của một biến đầu vào duy nhất. Tất cả các biến đầu vào khác trong test case đó PHẢI giữ ở trạng thái VEC hợp lệ.
  > *Lý do:* Nếu đưa đồng thời nhiều giá trị IEC vào 1 test case, hệ thống có thể dừng lại ngay ở lỗi đầu tiên (masking defect) và không bao giờ thực thi đến đoạn kiểm tra các biến lỗi còn lại, dẫn đến sót lỗi tiềm ẩn.

---

## 2. PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS - BVA)

### 2.1 Khái niệm & Tầm quan trọng
- Thực tế cho thấy lỗi phần mềm có xác suất xuất hiện cao nhất tại các điểm biên của miền giá trị (do lập trình viên thường nhầm lẫn giữa `>`, `>=`, `<`, `<=`).
- BVA bổ trợ cho EP bằng cách tập trung kiểm thử tại chính xác các vị trí tiếp giáp giữa lớp hợp lệ (VEC) và không hợp lệ (IEC).

### 2.2 Các mô hình phân tích biên

#### A. Mô hình 2 giá trị biên (Two-Value Boundary Testing)
Áp dụng cho mỗi biên $Min$ hoặc $Max$:
- Tại biên dưới $Min$: Kiểm tra $Min$ (Hợp lệ) và $Min - 1$ (Không hợp lệ).
- Tại biên trên $Max$: Kiểm tra $Max$ (Hợp lệ) và $Max + 1$ (Không hợp lệ).

#### B. Mô hình 3 giá trị biên (Three-Value Boundary Testing / Robust BVA)
Cung cấp độ tin cậy tối đa cho các hệ thống có yêu cầu chính xác cao (tài chính, ngân hàng, thương mại điện tử):
- Tại biên dưới $Min$:
  - $Min - 1$: Điểm biên ngoài dưới (IEC $\rightarrow$ REJECT)
  - $Min$: Điểm biên trong nhỏ nhất (VEC $\rightarrow$ ACCEPT)
  - $Min + 1$: Điểm biên trong lân cận (VEC $\rightarrow$ ACCEPT)
- Tại biên trên $Max$:
  - $Max - 1$: Điểm biên trong lân cận (VEC $\rightarrow$ ACCEPT)
  - $Max$: Điểm biên trong lớn nhất (VEC $\rightarrow$ ACCEPT)
  - $Max + 1$: Điểm biên ngoài trên (IEC $\rightarrow$ REJECT)

### 2.3 Xác định bước nhảy nhỏ nhất (Smallest Step Unit - $\epsilon$)
- Với số nguyên / Độ dài ký tự: $\epsilon = 1$ (ví dụ: $Min = 8 \Rightarrow Min-1 = 7, Min+1 = 9$).
- Với số tiền tiền tệ nguyên tệ (VNĐ): $\epsilon = 1$ đồng (ví dụ: $300.000$ ₫ $\Rightarrow 299.999$ ₫, $300.000$ ₫, $301.000$ ₫ hoặc đơn vị tiền nhỏ nhất có nghĩa).
- Với số thực làm tròn 2 chữ số (USD): $\epsilon = 0.01$ (\$10.00 $\Rightarrow \$9.99, \$10.00, \$10.01$).
