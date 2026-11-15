# 10. PHÊ BÌNH AI (AI CRITIQUE)
## DỰ ÁN: ESHOP — HỆ THỐNG PHỤC VỤ KIỂM THỬ PHẦN MỀM (SUT)
### Học phần: Nhập môn Kiểm thử Phần mềm (Testing Introduction) — HCMUS
### Nhánh kiểm thử: `fme849/ep-bva` | Đối tượng: Kỹ thuật EP & BVA
### Số từ: 286 từ (Quy định bắt buộc: 200–300 từ)

---

Trong quá trình làm bài tập kiểm thử với EShop, em nhận thấy AI mắc lỗi phương pháp luận khá rõ khi thiết kế tài liệu kiểm thử hộp đen (EP & BVA). Cụ thể, khi được yêu cầu phân tích thiết kế, AI đã tự ý đọc thẳng vào mã nguồn backend và frontend để chỉ ra các đoạn code lỗi, biến tài liệu black-box thành một bản code review kiểu white-box. Ngoài ra, ban đầu AI sinh các test case riêng lẻ mà bỏ qua bước lập tài liệu phân tích cơ sở phân hoạch tương đương.

Sở dĩ AI hiểu sai là do mô hình có sẵn toàn bộ mã nguồn trong ngữ cảnh làm việc, dẫn đến xu hướng tìm cách giải thích nguyên nhân lỗi ngay lập tức thay vì đứng ở góc nhìn độc lập của một tester chỉ dựa vào đặc tả yêu cầu (SRS).

Để khắc phục, em đã yêu cầu AI loại bỏ triệt để mọi phân tích liên quan đến mã nguồn trong các file thiết kế, đồng thời rà soát lại toàn bộ assertion trong kịch bản Playwright để đảm bảo kịch bản kiểm tra đúng theo kỳ vọng nghiệp vụ của SRS chứ không hùa theo hành vi sai của code.

Qua bài tập này, em rút ra nguyên tắc then chốt: AI chỉ là công cụ hỗ trợ tăng tốc viết kịch bản và sinh dữ liệu mẫu, con người bắt buộc phải giữ vai trò kiểm soát phương pháp luận (Human-in-the-loop). Nếu tester không vững lý thuyết kiểm thử và thiếu sự phản biện độc lập, ta rất dễ bị AI dẫn dắt đi chệch khỏi mục tiêu kiểm thử ban đầu.
