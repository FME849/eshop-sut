# NGUYÊN TẮC KIỂM THỬ HỘP ĐEN THUẦN TÚY (BLACK-BOX TESTING PRINCIPLES)

Tài liệu này quy định các ràng buộc và nguyên tắc ứng xử khi thiết kế Test Design Analysis và sinh Test Cases.

---

## 1. NGUYÊN TẮC CỐT LÕI: KHÔNG SOI LỖI MÃ NGUỒN TRONG GIAI ĐOẠN THIẾT KẾ

Khi thực hiện kỹ thuật phân tích yêu cầu, thiết kế Test Design và tạo Test Cases:
- **Nguồn chân lý duy nhất (Single Source of Truth):** Chỉ dựa vào tài liệu đặc tả yêu cầu (SRS), tiêu chuẩn giao diện (UI/UX Guidelines), và quy tắc nghiệp vụ (Business Rules).
- **Hộp đen hoàn toàn (Strict Black-Box):** Coi phần mềm như một chiếc hộp đen. Người thiết kế kiểm thử không được biết hoặc không được đưa các suy diễn từ mã nguồn (source code) vào tài liệu thiết kế kiểm thử.

---

## 2. NHỮNG ĐIỀU TUYỆT ĐỐI CẤM (WHAT NOT TO DO)

1. **Cấm "đoán trước lỗi từ code" rồi viết test case:**
   - ❌ *Sai lầm:* Đọc file `server.js` thấy lập trình viên viết `total_amount > min_amount`, sau đó ghi vào Test Design: "Do code dùng dấu > nên tại điểm 300.000 test case sẽ fail".
   - ✔️ *Đúng chuẩn:* Tại điểm $300.000$ ₫ (điểm biên $Min$), theo đặc tả SRS đơn hàng từ $300.000$ ₫ trở lên được áp dụng mã $\rightarrow$ Kỳ vọng SRS (Expected Result) là **Áp dụng thành công (ACCEPT)**.

2. **Cấm đưa thông tin file code, hàm, biến code vào Expected Result:**
   - ❌ *Sai lầm:* "Hàm `applyCoupon` trả về mã lỗi 400 do regex trong `Register.jsx:15` bắt buộc khoảng trắng".
   - ✔️ *Đúng chuẩn:* "Hệ thống từ chối đăng ký và hiển thị thông báo lỗi yêu cầu mật khẩu không được chứa khoảng trắng".

3. **Cấm viết Expected Result dựa theo hành vi sai của phần mềm:**
   - Test case được sinh ra để **thẩm định độ lệch** giữa Phần mềm thực tế và Đặc tả yêu cầu. Nếu Expected Result viết theo code bị sai, thì khi test chạy nó sẽ Pass một cách vô nghĩa và che giấu bug thực tế.

---

## 3. VAI TRÒ CỦA VIỆC PHÂN TÍCH SOURCE CODE

- Việc phân tích source code **CHỈ ĐƯỢC PHÉP DIỄN RA Ở GIAI ĐOẠN SAU ĐÓ**:
  1. Sau khi test scripts thực thi thất bại (Execution Phase).
  2. Khi tiến hành điều tra nguyên nhân gốc rễ (Root Cause Analysis).
  3. Khi lập Báo cáo lỗi (Bug Report - `BUG-[MODULE]-[NUMBER].md`).
