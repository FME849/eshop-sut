# PHỤ LỤC: BÁO CÁO KIỂM TOÁN AI (AI AUDIT REPORT)
## DỰ ÁN: ESHOP — HỆ THỐNG PHỤC VỤ KIỂM THỬ PHẦN MỀM (SUT)
### Nhánh kiểm thử: `fme849/ep-bva` | Đối tượng: Kỹ thuật Phân hoạch tương đương & Phân tích giá trị biên (EP & BVA)

---

## 1. THÔNG TIN CHUNG

- **Học phần:** Nhập môn Kiểm thử Phần mềm (Testing Introduction) - HCMUS
- **Nhánh thực hiện:** `fme849/ep-bva`
- **Phiên bản hệ thống kiểm thử:** EShop SUT (Build 1)
- **Công cụ AI sử dụng:** Google Antigravity (Mô hình: Gemini 3.8 Flash)
- **Mục đích sử dụng AI:** Hỗ trợ phân tích đặc tả yêu cầu (SRS), thiết kế ca kiểm thử hộp đen theo kỹ thuật Phân hoạch tương đương (EP) và Phân tích giá trị biên (BVA), xây dựng mã kiểm thử tự động Playwright theo mô hình Page Object Model (POM), phân loại lỗi (bug reporting) và tổng hợp báo cáo kiểm thử theo chuẩn IEEE 829.

---

## 2. NHẬT KÝ CHI TIẾT CÁC LẦN TƯƠNG TÁC VỚI AI

### Lần tương tác 1: Thiết kế và sinh danh mục Test Cases ban đầu
- **Tên công cụ AI:** Google Antigravity (Gemini 3.8 Flash)
- **Ngày và giờ:** 13/11/2026, 09:21:04 (UTC+7)
- **Prompt:**
  ```text
  hãy áp dụng phương pháp phân hoạch tương đương và phân tích giá trị biên để thiết kế test case cho các chức năng FR-01, FR-09, FR-15 và FR-01 trên mobile. Hãy tham khảo các document trong @[testing-docs]
  ```
- **Đầu ra của AI:**
  - AI phân tích đặc tả yêu cầu từ `testing-docs/requirements-analysis.md` và `testing-docs/ep-bva-analysis.md`.
  - Thiết kế danh mục gồm **25 test cases** chia làm 4 module:
    1. `registration` (Web FR-01 - Đăng ký tài khoản Web): 7 test cases (`TC-REG-001` đến `TC-REG-007`).
    2. `coupon` (FR-09 - Áp dụng mã giảm giá): 6 test cases (`TC-COUP-001` đến `TC-COUP-006`).
    3. `admin-products` (FR-15 - Quản trị sản phẩm Web Admin): 7 test cases (`TC-ADMN-001` đến `TC-ADMN-007`).
    4. `mobile-registration` (Mobile FR-01 / FR-20 - Đăng ký tài khoản Mobile): 5 test cases (`TC-MOB-001` đến `TC-MOB-005`).
  - Khởi tạo 25 file markdown tương ứng trong thư mục `tests/test-cases/` tuân thủ template của dự án.
- **Phần Human Review / chỉnh sửa quan trọng:**
  - *Đánh giá của con người:* Các test case đã bao phủ được các điểm biên cơ bản. Tuy nhiên, AI mới sinh trực tiếp các file test case riêng lẻ mà chưa xây dựng tài liệu phân tích kỹ thuật thiết kế (Test Design Specification) bài bản trình bày cơ sở chia lớp tương đương và chọn điểm biên.
  - *Hành động:* Yêu cầu AI bổ sung tài liệu phân tích thiết kế kiểm thử (Test Design Analysis) theo chuẩn cho cả 4 yêu cầu trên.

---

### Lần tương tác 2: Xây dựng tài liệu Phân tích Thiết kế Kiểm thử (Test Design Analysis)
- **Tên công cụ AI:** Google Antigravity (Gemini 3.8 Flash)
- **Ngày và giờ:** 13/11/2026, 09:53:02 (UTC+7)
- **Prompt:**
  ```text
  hãy tạo các test design analysis cho các requirement trên
  ```
- **Đầu ra của AI:**
  - AI tạo thư mục `tests/test-design/` và sinh 4 tài liệu Test Design Specification (TDS) theo tiêu chuẩn quốc tế IEEE 829 & ISTQB:
    1. `TD-FR-01-web-registration.md`
    2. `TD-FR-09-coupon.md`
    3. `TD-FR-15-admin-products.md`
    4. `TD-FR-01-mobile-registration.md`
    5. `README.md` (chỉ mục tài liệu)
  - Nội dung mỗi tài liệu bao gồm: Tổng quan nghiệp vụ theo SRS, Bảng kiểm kê biến đầu vào, Bảng phân hoạch tương đương hợp lệ/không hợp lệ (VEC/IEC), Phân tích giá trị biên 2-giá trị và 3-giá trị (BVA / Robustness), và Ma trận ánh xạ 2 chiều sang Test Cases.
  - Tuy nhiên, trong mỗi tài liệu, AI đã tự động đưa thêm "Mục 6: Phân tích khiếm khuyết mã nguồn SUT (Actual Code Flaws)", trích dẫn trực tiếp các dòng mã lỗi trong `backend/server.js`, `frontend-web/src/pages/Register.jsx` và `frontend-mobile/App.js`.
- **Phần Human Review / chỉnh sửa quan trọng:**
  - *Đánh giá của con người:* Phát hiện lỗi phương pháp luận nghiêm trọng: Kỹ thuật EP và BVA là các kỹ thuật **Kiểm thử Hộp đen (Black-box Testing)**, việc thiết kế kiểm thử bắt buộc phải hoàn toàn dựa trên đặc tả yêu cầu nghiệp vụ (SRS), không được "soi mã nguồn" (white-box) để gán trước lỗi của lập trình viên vào tài liệu thiết kế.
  - *Hành động can thiệp:* Yêu cầu AI loại bỏ triệt để toàn bộ các phần phân tích và trích dẫn mã nguồn ra khỏi tài liệu test design và test case.

---

### Lần tương tác 3: Chuẩn hóa tài liệu về chuẩn Kiểm thử Hộp đen (Black-box Testing)
- **Tên công cụ AI:** Google Antigravity (Gemini 3.8 Flash)
- **Ngày và giờ:** 13/11/2026, 10:01:32 (UTC+7)
- **Prompt:**
  ```text
  hãy bỏ các phần soi lỗi trong source code
  ```
- **Đầu ra của AI:**
  - Xóa hoàn toàn Mục 6 (Actual Code Flaws) khỏi cả 4 tài liệu trong `tests/test-design/`.
  - Định nghĩa lại phạm vi kiểm thử thuần túy theo góc nhìn giao diện người dùng và đặc tả hành vi của SRS.
  - Cập nhật file `tests/test-design/README.md`.
  - Rà soát toàn bộ 25 files trong `tests/test-cases/`, xóa các ghi chú liên quan đến mã nguồn (như biến code, file code, lớp CSS) trong các ca `TC-REG-005`, `TC-REG-006`, `TC-REG-007`, `TC-COUP-002`, `TC-COUP-003`, `TC-MOB-004`, `TC-MOB-005`.
  - Đồng bộ trường trạng thái của toàn bộ 25 test case về giá trị khởi tạo khách quan: `Not Run / None`.
- **Phần Human Review / chỉnh sửa quan trọng:**
  - *Đánh giá của con người:* Xác nhận toàn bộ tài liệu thiết kế và ca kiểm thử đã hoàn toàn đạt chuẩn kiểm thử hộp đen độc lập, không bị thiên lệch bởi mã nguồn hiện tại của ứng dụng.
  - *Hành động:* Chấp thuận tài liệu thiết kế và chuyển sang giai đoạn tự động hóa kịch bản kiểm thử.

---

### Lần tương tác 4: Xây dựng bộ kịch bản kiểm thử tự động với Playwright
- **Tên công cụ AI:** Google Antigravity (Gemini 3.8 Flash)
- **Ngày và giờ:** 13/11/2026, 21:09:41 (UTC+7)
- **Prompt:**
  ```text
  hãy sử dụng playwright viết test scripts để chạy kiểm thử các test case
  ```
- **Đầu ra của AI:**
  - Xây dựng hoàn chỉnh hạ tầng kiểm thử tự động tại thư mục `tests/test-scripts/` sử dụng Playwright Test với TypeScript:
    1. Cấu hình `package.json` và `playwright.config.ts` (cấu hình `retries: 0`, single worker để tránh race condition, timeout chuẩn).
    2. Thiết kế 4 lớp Page Object Model (POM) tại `tests/test-scripts/pages/`:
       - `RegisterPage.ts`: Quản lý định vị và tương tác trang đăng ký Web.
       - `CouponPage.ts`: Quản lý giao diện thanh toán và helper gọi API coupon.
       - `AdminProductPage.ts`: Quản lý trang quản trị sản phẩm và helper gọi API products.
       - `MobileRegisterPage.ts`: Giả lập kích thước màn hình di động (Viewport 390x844) và kiểm tra giao diện mobile.
    3. Viết 4 spec files bao phủ đủ 25 test cases:
       - `registration/registration.spec.ts` (7 test cases)
       - `coupon/coupon.spec.ts` (6 test cases)
       - `admin-products/admin-products.spec.ts` (7 test cases)
       - `mobile-registration/mobile-registration.spec.ts` (5 test cases)
    4. Soạn thảo `tests/test-scripts/README.md` hướng dẫn thực thi kịch bản (CLI, Headed, UI Mode, Report).
- **Phần Human Review / chỉnh sửa quan trọng:**
  - *Đánh giá của con người:* Kiểm tra tính bao phủ và ánh xạ 1-1 giữa các spec file với 25 test cases trong `tests/test-cases/`. Xác nhận assertions trong test script phản ánh đúng kỳ vọng của SRS chứ không assert theo bug của code.
  - *Hành động:* Yêu cầu AI tiến hành chạy thực thi kiểm thử trên môi trường thực tế, ghi nhận lỗi và tổng hợp báo cáo.

---

### Lần tương tác 5: Thực thi kiểm thử, báo cáo Bug và tổng hợp Báo cáo Kiểm thử
- **Tên công cụ AI:** Google Antigravity (Gemini 3.8 Flash)
- **Ngày và giờ:** 15/11/2026, 08:54:58 (UTC+7)
- **Prompt:**
  ```text
  hãy chạy và cập nhật bug, trạng thái test case, tổng hợp báo cáo
  ```
- **Đầu ra của AI:**
  - Tích hợp `webServer` trong cấu hình Playwright để tự động khởi chạy đồng thời Backend (port 3000), Web Client (port 5173), Admin Portal (port 5174).
  - Thực thi toàn bộ test suite bằng lệnh `npx playwright test`. Kết quả thực tế:
    + **Tổng test cases:** 25
    + **Passed:** 10 (40.00%)
    + **Failed:** 15 (60.00%)
  - Tạo tài liệu Test Run: `tests/test-runs/TR-1-001.md`.
  - Phân tích lỗi từ log và evidence của Playwright, gom nhóm thành **8 Bug Reports** chuẩn trong `tests/bugs/`:
    + `BUG-REG-001` (Critical / P1): Regex mật khẩu trên Web bắt buộc có khoảng trắng và chặn ký tự đặc biệt hợp lệ.
    + `BUG-REG-002` (Major / P2): Giao diện Web thiếu trường Xác nhận mật khẩu.
    + `BUG-COUP-001` (Critical / P1): Backend coupon dùng sai toán tử so sánh `>` thay vì `>=` tại ngưỡng biên 300.000 ₫.
    + `BUG-COUP-002` (Critical / P1): Công thức tính phần trăm giảm giá bị sai dẫn đến số tiền giảm bị âm.
    + `BUG-COUP-003` (Major / P2): Không kiểm tra giới hạn lượt dùng coupon của mỗi người dùng.
    + `BUG-ADMN-001` (Critical / P1): Backend API cho phép tạo sản phẩm có giá bằng 0 ₫ và giá âm.
    + `BUG-ADMN-002` (Major / P2): Backend API cho phép tạo sản phẩm có tên rỗng hoặc vượt quá 255 ký tự.
    + `BUG-MOB-001` (Minor / P3): Nút Đăng Ký trên mobile hiển thị màu đỏ vi phạm tiêu chuẩn GUI FR-21.2.
  - Cập nhật trạng thái kết quả của toàn bộ 25 ca kiểm thử trong `tests/test-cases/` (gắn link đến bug tương ứng cho các ca Failed).
  - Lập Báo cáo Tổng kết Kiểm thử (Test Summary Report) chuẩn IEEE 829 tại `tests/test-summary-report.md`.
  - Lập Ma trận Truy vết Yêu cầu (Traceability Matrix) tại `tests/traceability-matrix/traceability-matrix.md`.
- **Phần Human Review / chỉnh sửa quan trọng:**
  - *Đánh giá của con người:* Dữ liệu giữa Test Run, Bug Reports và Test Summary Report hoàn toàn nhất quán. Các bằng chứng lỗi (evidence, log, assertion) rất rõ ràng và thuyết phục.
  - *Hành động:* Yêu cầu AI bổ sung/lưu trữ tài liệu Test Summary Report vào thư mục tài liệu chung `testing-docs/` để tiện tra cứu liên phân hệ.

---

### Lần tương tác 6: Đồng bộ và hoàn tất tài liệu Test Summary Report
- **Tên công cụ AI:** Google Antigravity (Gemini 3.8 Flash)
- **Ngày và giờ:** 15/11/2026, 09:09:15 (UTC+7)
- **Prompt:**
  ```text
  thêm tài liệu test summary report
  ```
- **Đầu ra của AI:**
  - Đồng bộ và lưu bản sao hoàn chỉnh của Báo cáo Tổng kết Kiểm thử vào vị trí `testing-docs/test-summary-report.md`.
  - Trình bày tóm tắt 11 mục cốt lõi của báo cáo tổng kết, phân tích các rủi ro chất lượng và đưa ra kết luận từ chối nghiệm thu xuất xưởng (Reject Release) đối với bản build Build 1.
- **Phần Human Review / chỉnh sửa quan trọng:**
  - *Đánh giá của con người:* Toàn bộ chu trình kiểm thử trên nhánh `fme849/ep-bva` đã hoàn thành trọn vẹn và đạt chất lượng cao: từ phân tích yêu cầu, thiết kế test case hộp đen, xây dựng script tự động, thực thi test run, lập báo cáo bug, ma trận truy vết RTM đến báo cáo tổng kết.
  - *Hành động:* Đóng gói sản phẩm và lập Báo cáo Kiểm toán AI (AI Audit Report) này làm phụ lục minh chứng tính minh bạch và liêm chính học thuật.

---

## 3. TỔNG KẾT VÀ ĐÁNH GIÁ VAI TRÒ CỦA AI VS HUMAN

| Hạng mục | Vai trò của AI | Vai trò và Can thiệp của Con người (Human) |
|---|---|---|
| **Phân tích & Thiết kế Test Case** | Tự động sinh danh mục test case và tài liệu TDS từ dữ liệu đầu vào. | **Định hướng và hiệu chỉnh phương pháp:** Phát hiện AI có xu hướng soi mã nguồn (white-box), can thiệp bắt buộc AI loại bỏ soi code để tuân thủ 100% nguyên tắc kiểm thử hộp đen từ SRS. |
| **Tự động hóa Kiểm thử (Playwright)** | Sinh mã boilerplate, thiết lập POM, cấu hình web server và viết spec. | **Kiểm duyệt kịch bản:** Đảm bảo assertions bám sát đặc tả SRS gốc, xác nhận môi trường chạy thật không bị bypass hay giả lập sai lệch. |
| **Thực thi & Báo cáo Lỗi** | Chạy kiểm thử tự động, bóc tách log lỗi, phát hiện bất thường và thống kê số liệu. | **Phân loại và thẩm định bug:** Xác nhận mức độ nghiêm trọng (Severity/Priority), gom nhóm lỗi trùng nguyên nhân gốc và phê duyệt nội dung báo cáo. |
| **Tổng hợp Báo cáo Nghiệm thu** | Tổng hợp số liệu toán học, lập bảng ma trận RTM và soạn thảo báo cáo IEEE 829. | **Đánh giá tiêu chí xuất xưởng:** Ra quyết định từ chối xuất xưởng (Reject Release) đối với Build 1 dựa trên số liệu thực tế. |

> **Cam kết:** Báo cáo kiểm toán này phản ánh đầy đủ, trung thực và chính xác 100% các lượt tương tác với công cụ AI trong suốt quá trình hoàn thành bài tập kiểm thử. Mọi quyết định chuyên môn và điều chỉnh phương pháp kiểm thử đều do con người trực tiếp kiểm soát và phê duyệt.
