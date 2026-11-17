# QUY ƯỚC ĐẶT TÊN VÀ CẤU TRÚC THƯ MỤC

Tài liệu này định nghĩa cấu trúc tổ chức và quy chuẩn đặt tên file đồng nhất cho toàn bộ hệ thống tài liệu kiểm thử thiết kế theo phương pháp EP & BVA.

---

## 1. CẤU TRÚC THƯ MỤC CHUẨN

```text
tests/
├── test-design/
│   ├── README.md                              # Bảng mục lục tổng quan các tài liệu thiết kế kiểm thử
│   ├── TD-[REQ_ID]-[feature-slug].md          # Tài liệu Test Design Analysis chi tiết cho từng requirement
│   └── ...
└── test-cases/
    ├── <module-name-1>/
    │   ├── TC-[MODULE_PREFIX]-001.md          # Từng file test case độc lập
    │   ├── TC-[MODULE_PREFIX]-002.md
    │   └── ...
    ├── <module-name-2>/
    │   ├── TC-[MODULE_PREFIX]-001.md
    │   └── ...
    └── ...
```

---

## 2. QUY CHUẨN ĐẶT TÊN FILE

### 2.1 File Phân tích Thiết kế Kiểm thử (Test Design Specification)
- **Đường dẫn:** `tests/test-design/TD-[REQ_ID]-[feature-slug].md`
- **Ví dụ:**
  - `tests/test-design/TD-FR-01-web-registration.md`
  - `tests/test-design/TD-FR-09-coupon.md`
  - `tests/test-design/TD-FR-15-admin-products.md`
  - `tests/test-design/TD-FR-01-mobile-registration.md`

### 2.2 Thư mục Module Test Cases
- Chữ thường, phân tách bằng dấu gạch ngang `-` (kebab-case).
- **Ví dụ:** `registration`, `coupon`, `admin-products`, `mobile-registration`, `order-checkout`.

### 2.3 File Test Case Chi tiết
- **Định dạng:** `TC-[MODULE_PREFIX]-[NUMBER].md`
  - `[MODULE_PREFIX]`: Từ viết tắt in hoa 3-4 chữ cái của module.
  - `[NUMBER]`: Số thứ tự 3 chữ số tăng dần (`001`, `002`, `003`...).
- **Bảng quy chuẩn tiền tố module thông dụng:**

| Module | Tiền tố (`MODULE_PREFIX`) | Ví dụ File Test Case |
|---|---|---|
| User Registration (Web) | `REG` | `TC-REG-001.md` |
| Mobile Registration | `MOB` | `TC-MOB-001.md` |
| Coupon Application | `COUP` | `TC-COUP-001.md` |
| Admin Product CRUD | `ADMN` | `TC-ADMN-001.md` |
| User Authentication / Login | `AUTH` | `TC-AUTH-001.md` |
| Shopping Cart | `CART` | `TC-CART-001.md` |
| Order & Checkout | `ORDR` | `TC-ORDR-001.md` |
