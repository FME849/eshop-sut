# Traceability Matrix - EShop SUT (Nhánh ep-bva)

## Tóm tắt coverage

Bảng ma trận truy vết yêu cầu (Requirements Traceability Matrix - RTM) tổng hợp liên kết 3 chiều giữa:
1. **Yêu cầu (Requirements)** từ đặc tả SRS.
2. **Ca kiểm thử (Test Cases)** từ `tests/test-cases/`.
3. **Kết quả thực thi (Execution Results)** từ `tests/test-runs/TR-1-001.md`.
4. **Báo cáo lỗi (Bug Issues)** từ `tests/bugs/`.

### Thống kê tổng quan độ phủ (Coverage Overview)

- **Tổng số Requirements được kiểm thử**: 5 requirements (4 Functional: FR-01, FR-09, FR-15, FR-20; 1 Non-Functional: FR-21.2)
- **Tỷ lệ bao phủ Requirements**: 100% (100% requirements in-scope đều có test cases tương ứng)
- **Tổng số Test Cases**: 25 test cases
- **Tổng số lượt thực thi (Executions)**: 25 lượt (25 test cases $\times$ 1 build)
- **Passed (Done)**: 10 (40.00%)
- **Failed (Open)**: 15 (60.00%)
- **Blocked (Blocked)**: 0 (0.00%)
- **Not Run (Ready for Retest)**: 0 (0.00%)

### Bảng phân tích độ phủ theo Requirement

| Requirement ID | Loại yêu cầu | Mô tả yêu cầu | Số Test Cases | Số lần thực thi | Pass | Fail | Block | Tỷ lệ Pass |
|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **FR-01** | Functional | Đăng ký tài khoản khách hàng trên Web | 7 | 7 | 3 | 4 | 0 | 42.86% |
| **FR-09** | Functional | Áp dụng mã giảm giá Coupon | 6 | 6 | 2 | 4 | 0 | 33.33% |
| **FR-15** | Functional | Quản trị sản phẩm trên Web Admin (CRUD) | 7 | 7 | 3 | 4 | 0 | 42.86% |
| **FR-20** | Functional | Đăng ký tài khoản trên Mobile App | 4 | 4 | 2 | 2 | 0 | 50.00% |
| **FR-21.2** | Non-Functional | Quy chuẩn màu sắc nút bấm hành động chính | 1 | 1 | 0 | 1 | 0 | 0.00% |
| **Tổng cộng** | | | **25** | **25** | **10** | **15** | **0** | **40.00%** |

---

## Bảng truy vết (Traceability Matrix Table)

| No. | Requirement | Test case | Build | Result | Bug issue | Status |
|:---:|---|---|:---:|:---:|---|:---:|
| 01 | FR-01 | [TC-REG-001](../test-cases/registration/TC-REG-001.md) | Build-1 | Fail | [BUG-REG-001](../bugs/registration/BUG-REG-001.md) | Open |
| 02 | FR-01 | [TC-REG-002](../test-cases/registration/TC-REG-002.md) | Build-1 | Pass | - | Done |
| 03 | FR-01 | [TC-REG-003](../test-cases/registration/TC-REG-003.md) | Build-1 | Fail | [BUG-REG-001](../bugs/registration/BUG-REG-001.md) | Open |
| 04 | FR-01 | [TC-REG-004](../test-cases/registration/TC-REG-004.md) | Build-1 | Pass | - | Done |
| 05 | FR-01 | [TC-REG-005](../test-cases/registration/TC-REG-005.md) | Build-1 | Pass | - | Done |
| 06 | FR-01 | [TC-REG-006](../test-cases/registration/TC-REG-006.md) | Build-1 | Fail | [BUG-REG-001](../bugs/registration/BUG-REG-001.md) | Open |
| 07 | FR-01 | [TC-REG-007](../test-cases/registration/TC-REG-007.md) | Build-1 | Fail | [BUG-REG-002](../bugs/registration/BUG-REG-002.md) | Open |
| 08 | FR-09 | [TC-COUP-001](../test-cases/coupon/TC-COUP-001.md) | Build-1 | Pass | - | Done |
| 09 | FR-09 | [TC-COUP-002](../test-cases/coupon/TC-COUP-002.md) | Build-1 | Fail | [BUG-COUP-001](../bugs/coupon/BUG-COUP-001.md) | Open |
| 10 | FR-09 | [TC-COUP-003](../test-cases/coupon/TC-COUP-003.md) | Build-1 | Fail | [BUG-COUP-002](../bugs/coupon/BUG-COUP-002.md) | Open |
| 11 | FR-09 | [TC-COUP-004](../test-cases/coupon/TC-COUP-004.md) | Build-1 | Fail | [BUG-COUP-002](../bugs/coupon/BUG-COUP-002.md) | Open |
| 12 | FR-09 | [TC-COUP-005](../test-cases/coupon/TC-COUP-005.md) | Build-1 | Fail | [BUG-COUP-003](../bugs/coupon/BUG-COUP-003.md) | Open |
| 13 | FR-09 | [TC-COUP-006](../test-cases/coupon/TC-COUP-006.md) | Build-1 | Pass | - | Done |
| 14 | FR-15 | [TC-ADMN-001](../test-cases/admin-products/TC-ADMN-001.md) | Build-1 | Fail | [BUG-ADMN-001](../bugs/admin-products/BUG-ADMN-001.md) | Open |
| 15 | FR-15 | [TC-ADMN-002](../test-cases/admin-products/TC-ADMN-002.md) | Build-1 | Fail | [BUG-ADMN-001](../bugs/admin-products/BUG-ADMN-001.md) | Open |
| 16 | FR-15 | [TC-ADMN-003](../test-cases/admin-products/TC-ADMN-003.md) | Build-1 | Pass | - | Done |
| 17 | FR-15 | [TC-ADMN-004](../test-cases/admin-products/TC-ADMN-004.md) | Build-1 | Fail | [BUG-ADMN-002](../bugs/admin-products/BUG-ADMN-002.md) | Open |
| 18 | FR-15 | [TC-ADMN-005](../test-cases/admin-products/TC-ADMN-005.md) | Build-1 | Pass | - | Done |
| 19 | FR-15 | [TC-ADMN-006](../test-cases/admin-products/TC-ADMN-006.md) | Build-1 | Pass | - | Done |
| 20 | FR-15 | [TC-ADMN-007](../test-cases/admin-products/TC-ADMN-007.md) | Build-1 | Fail | [BUG-ADMN-002](../bugs/admin-products/BUG-ADMN-002.md) | Open |
| 21 | FR-20 | [TC-MOB-001](../test-cases/mobile-registration/TC-MOB-001.md) | Build-1 | Fail | [BUG-REG-001](../bugs/registration/BUG-REG-001.md) | Open |
| 22 | FR-20 | [TC-MOB-002](../test-cases/mobile-registration/TC-MOB-002.md) | Build-1 | Pass | - | Done |
| 23 | FR-20 | [TC-MOB-003](../test-cases/mobile-registration/TC-MOB-003.md) | Build-1 | Pass | - | Done |
| 24 | FR-20 | [TC-MOB-004](../test-cases/mobile-registration/TC-MOB-004.md) | Build-1 | Fail | [BUG-REG-002](../bugs/registration/BUG-REG-002.md) | Open |
| 25 | FR-21.2 | [TC-MOB-005](../test-cases/mobile-registration/TC-MOB-005.md) | Build-1 | Fail | [BUG-MOB-001](../bugs/mobile-registration/BUG-MOB-001.md) | Open |

---

**Giải thích trạng thái Status:**
- **Done** — Test Case có kết quả Pass, yêu cầu được thỏa mãn.
- **Open** — Test Case có kết quả Fail, có Bug Report đang mở cần đội phát triển sửa chữa.
- **Blocked** — Test Case không thể thực thi do lỗi chặn môi trường hoặc lỗi khác.
- **Ready for Retest** — Test Case chưa được chạy hoặc đã fix xong chờ kiểm thử lại.
