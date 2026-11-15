# HƯỚNG DẪN THỰC THI PLAYWRIGHT TEST SCRIPTS
### DỰ ÁN: ESHOP-SUT | NHÁNH KIỂM THỬ: `fme849/ep-bva`

---

## 1. TỔNG QUAN HẠ TẦNG TEST AUTOMATION

Toàn bộ test scripts được xây dựng bằng **Playwright** và **TypeScript**, áp dụng mô hình **Page Object Model (POM)** chuẩn mực, bao phủ đầy đủ 25 Test Cases đã thiết kế cho các chức năng:
- **FR-01 (Web):** Đăng ký tài khoản người dùng trên Web (`TC-REG-001` $\rightarrow$ `TC-REG-007`).
- **FR-09:** Áp dụng Mã giảm giá Coupon (`TC-COUP-001` $\rightarrow$ `TC-COUP-006`).
- **FR-15:** Quản trị Sản phẩm trên Web Admin (`TC-ADMN-001` $\rightarrow$ `TC-ADMN-007`).
- **FR-01 (Mobile) / FR-20:** Đăng ký tài khoản trên Mobile App (`TC-MOB-001` $\rightarrow$ `TC-MOB-005`).

---

## 2. CẤU TRÚC THƯ MỤC TEST SCRIPTS

```text
tests/test-scripts/
├── package.json
├── playwright.config.ts
├── pages/                                # Page Object Model (POM)
│   ├── RegisterPage.ts                   # POM cho Web Registration (FR-01)
│   ├── CouponPage.ts                     # POM & API Helper cho Coupon (FR-09)
│   ├── AdminProductPage.ts               # POM & API Helper cho Admin Products (FR-15)
│   └── MobileRegisterPage.ts             # POM & Viewport Emulation cho Mobile Registration
├── registration/
│   └── registration.spec.ts              # 7 test cases cho Web Registration
├── coupon/
│   └── coupon.spec.ts                    # 6 test cases cho Coupon Application
├── admin-products/
│   └── admin-products.spec.ts            # 7 test cases cho Admin Products CRUD
├── mobile-registration/
│   └── mobile-registration.spec.ts       # 5 test cases cho Mobile Registration
└── README.md                             # Tài liệu hướng dẫn thực thi
```

---

## 3. CÁC BƯỚC KHỞI ĐỘNG VÀ THỰC THI KIỂM THỬ

### Bước 1: Khởi động các dịch vụ của Hệ thống (SUT)
Mở các cửa sổ Terminal riêng biệt để chạy Backend và Frontend:

1. **Khởi động Backend API (Port 3000):**
   ```bash
   cd backend
   node server.js
   ```
2. **Khởi động Frontend Web (Port 5173):**
   ```bash
   cd frontend-web
   npm run dev
   ```
3. **Khởi động Frontend Admin (Port 5174):**
   ```bash
   cd frontend-admin
   npm run dev
   ```

---

### Bước 2: Chạy kiểm thử tự động với Playwright

Di chuyển vào thư mục test scripts:
```bash
cd tests/test-scripts
```

#### 1. Kiểm tra danh sách các test cases đã đăng ký:
```bash
npx playwright test --list
```

#### 2. Chạy toàn bộ test suite (Chế độ Headless):
```bash
npx playwright test
```

#### 3. Chạy theo từng phân hệ / module cụ thể:
- **Chạy riêng module Web Registration (FR-01):**
  ```bash
  npx playwright test registration/registration.spec.ts
  ```
- **Chạy riêng module Coupon (FR-09):**
  ```bash
  npx playwright test coupon/coupon.spec.ts
  ```
- **Chạy riêng module Admin Products (FR-15):**
  ```bash
  npx playwright test admin-products/admin-products.spec.ts
  ```
- **Chạy riêng module Mobile Registration (FR-01 Mobile):**
  ```bash
  npx playwright test mobile-registration/mobile-registration.spec.ts
  ```

#### 4. Chạy một Test Case cụ thể (theo ID):
```bash
npx playwright test -g "TC-REG-001"
npx playwright test -g "TC-COUP-002"
```

#### 5. Chạy với giao diện đồ họa trực quan (Headed / UI Mode):
```bash
npx playwright test --headed
# hoặc mở giao diện tương tác Playwright UI:
npx playwright test --ui
```

---

## 4. XEM BÁO CÁO KIỂM THỬ (HTML TEST REPORT)

Sau khi hoàn tất đợt chạy kiểm thử, mở báo cáo HTML trực quan:
```bash
npx playwright show-report
```
Báo cáo sẽ cung cấp:
- Trạng thái Pass/Fail của từng Test Case.
- Call log chi tiết của từng bước thao tác (action).
- Ảnh chụp màn hình (screenshot) và Video ghi lại thao tác khi có kiểm thử thất bại.
