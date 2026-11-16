# 12. NHẬT KÝ GIT COMMIT (GIT COMMIT LOG)

**Nhánh:** `fme849/ep-bva`  
**Tác giả:** FME849 <1414439@gmail.com>

---

## 1. Commit Log

```text
* 7974d07 - (2026-11-15 09:29:39 +0700) feat: add ai critique [FME849]
* c0c44fe - (2026-11-15 09:22:54 +0700) feat: add ai audit report [FME849]
* d1dd557 - (2026-11-15 09:08:37 +0700) feat: add bug reports after running test [FME849]
* e8ba048 - (2026-11-15 09:07:24 +0700) chore: stop tracking playwright report [FME849]
* 7ac555a - (2026-11-15 08:53:45 +0700) feat: impl test scripts [FME849]
* 0a3fbeb - (2026-11-13 21:08:15 +0700) feat: add test cases and test design analysis [FME849]
```

### Bảng tóm tắt các Commit trên nhánh

| STT | Commit Hash | Thời gian (UTC+7) | Tác giả | Thông điệp Commit |
|:---:|:---:|:---:|:---:|---|
| 1 | `0a3fbeb` | 2026-11-13 21:08:15 | FME849 | `feat: add test cases and test design analysis` |
| 2 | `7ac555a` | 2026-11-15 08:53:45 | FME849 | `feat: impl test scripts` |
| 3 | `e8ba048` | 2026-11-15 09:07:24 | FME849 | `chore: stop tracking playwright report` |
| 4 | `d1dd557` | 2026-11-15 09:08:37 | FME849 | `feat: add bug reports after running test` |
| 5 | `c0c44fe` | 2026-11-15 09:22:54 | FME849 | `feat: add ai audit report` |
| 6 | `7974d07` | 2026-11-15 09:29:39 | FME849 | `feat: add ai critique` |

---

## 2. Commit Detail

### Commit 1: `0a3fbeb`
- **Full SHA:** `0a3fbebbcc9ac31bf456db76d084fceb972a08df`
- **Author:** FME849 <1414439@gmail.com>
- **Date:** Fri Nov 13 21:08:15 2026 +0700
- **Message:** `feat: add test cases and test design analysis`
- **Chi tiết thay đổi:**
```text
 tests/test-cases/admin-products/TC-ADMN-001.md     | 32 +++++++++
 tests/test-cases/admin-products/TC-ADMN-002.md     | 31 +++++++++
 tests/test-cases/admin-products/TC-ADMN-003.md     | 31 +++++++++
 tests/test-cases/admin-products/TC-ADMN-004.md     | 31 +++++++++
 tests/test-cases/admin-products/TC-ADMN-005.md     | 31 +++++++++
 tests/test-cases/admin-products/TC-ADMN-006.md     | 31 +++++++++
 tests/test-cases/admin-products/TC-ADMN-007.md     | 31 +++++++++
 tests/test-cases/coupon/TC-COUP-001.md             | 32 +++++++++
 tests/test-cases/coupon/TC-COUP-002.md             | 32 +++++++++
 tests/test-cases/coupon/TC-COUP-003.md             | 32 +++++++++
 tests/test-cases/coupon/TC-COUP-004.md             | 31 +++++++++
 tests/test-cases/coupon/TC-COUP-005.md             | 32 +++++++++
 tests/test-cases/coupon/TC-COUP-006.md             | 31 +++++++++
 tests/test-cases/mobile-registration/TC-MOB-001.md | 33 +++++++++
 tests/test-cases/mobile-registration/TC-MOB-002.md | 32 +++++++++
 tests/test-cases/mobile-registration/TC-MOB-003.md | 31 +++++++++
 tests/test-cases/mobile-registration/TC-MOB-004.md | 28 ++++++++
 tests/test-cases/mobile-registration/TC-MOB-005.md | 27 ++++++++
 tests/test-cases/registration/TC-REG-001.md        | 34 +++++++++
 tests/test-cases/registration/TC-REG-002.md        | 34 +++++++++
 tests/test-cases/registration/TC-REG-003.md        | 33 +++++++++
 tests/test-cases/registration/TC-REG-004.md        | 32 +++++++++
 tests/test-cases/registration/TC-REG-005.md        | 32 +++++++++
 tests/test-cases/registration/TC-REG-006.md        | 32 +++++++++
 tests/test-cases/registration/TC-REG-007.md        | 32 +++++++++
 tests/test-design/README.md                        | 33 +++++++++
 tests/test-design/TD-FR-01-mobile-registration.md  | 68 ++++++++++++++++++
 tests/test-design/TD-FR-01-web-registration.md     | 80 +++++++++++++++++++++
 tests/test-design/TD-FR-09-coupon.md               | 81 ++++++++++++++++++++++
 tests/test-design/TD-FR-15-admin-products.md       | 76 ++++++++++++++++++++
 30 files changed, 1126 insertions(+)
```

---

### Commit 2: `7ac555a`
- **Full SHA:** `7ac555a87e208a4da5e35e111f0f227af79f3634`
- **Author:** FME849 <1414439@gmail.com>
- **Date:** Sun Nov 15 08:53:45 2026 +0700
- **Message:** `feat: impl test scripts`
- **Chi tiết thay đổi:**
```text
 backend/database.sqlite                            | Bin 36864 -> 36864 bytes
 tests/test-scripts/README.md                       | 122 +++++++++++++++++++
 tests/test-scripts/admin-products/admin-products.spec.ts |  91 +++++++++++++++
 tests/test-scripts/coupon/coupon.spec.ts           |  88 ++++++++++++++
 tests/test-scripts/mobile-registration/mobile-registration.spec.ts |  77 ++++++++++++
 tests/test-scripts/package-lock.json               |  61 ++++++++++
 tests/test-scripts/package.json                    |  14 +++
 tests/test-scripts/pages/AdminProductPage.ts       |  89 ++++++++++++++
 tests/test-scripts/pages/CouponPage.ts             |  77 ++++++++++++
 tests/test-scripts/pages/MobileRegisterPage.ts     |  50 ++++++++
 tests/test-scripts/pages/RegisterPage.ts           |  83 +++++++++++++
 tests/test-scripts/playwright-report/index.html    |  49 ++++++++
 tests/test-scripts/playwright.config.ts            |  36 ++++++
 tests/test-scripts/registration/registration.spec.ts | 130 +++++++++++++++++++++
 14 files changed, 967 insertions(+)
```

---

### Commit 3: `e8ba048`
- **Full SHA:** `e8ba04811f29d350c177de545541a98fc3605f95`
- **Author:** FME849 <1414439@gmail.com>
- **Date:** Sun Nov 15 09:07:24 2026 +0700
- **Message:** `chore: stop tracking playwright report`
- **Chi tiết thay đổi:**
```text
 tests/test-scripts/playwright-report/index.html | 49 -------------------------
 1 file changed, 49 deletions(-)
```

---

### Commit 4: `d1dd557`
- **Full SHA:** `d1dd5570c771afdadc5e2c3adf747c7e5c946683`
- **Author:** FME849 <1414439@gmail.com>
- **Date:** Sun Nov 15 09:08:37 2026 +0700
- **Message:** `feat: add bug reports after running test`
- **Chi tiết thay đổi:**
```text
 .gitignore                                         |   6 +-
 backend/database.sqlite                            | Bin 36864 -> 36864 bytes
 frontend-web/vite.config.js                        |   4 +
 tests/bugs/admin-products/BUG-ADMN-001.md          |  52 ++++++
 tests/bugs/admin-products/BUG-ADMN-002.md          |  34 ++++
 tests/bugs/coupon/BUG-COUP-001.md                  |  45 +++++
 tests/bugs/coupon/BUG-COUP-002.md                  |  56 +++++++
 tests/bugs/coupon/BUG-COUP-003.md                  |  41 +++++
 tests/bugs/mobile-registration/BUG-MOB-001.md      |  35 ++++
 tests/bugs/registration/BUG-REG-001.md             |  44 +++++
 tests/bugs/registration/BUG-REG-002.md             |  41 +++++
 tests/test-cases/admin-products/TC-ADMN-001.md     |   2 +-
 tests/test-cases/admin-products/TC-ADMN-002.md     |   2 +-
 tests/test-cases/admin-products/TC-ADMN-003.md     |   2 +-
 tests/test-cases/admin-products/TC-ADMN-004.md     |   2 +-
 tests/test-cases/admin-products/TC-ADMN-005.md     |   2 +-
 tests/test-cases/admin-products/TC-ADMN-006.md     |   2 +-
 tests/test-cases/admin-products/TC-ADMN-007.md     |   2 +-
 tests/test-cases/coupon/TC-COUP-001.md             |   2 +-
 tests/test-cases/coupon/TC-COUP-002.md             |   2 +-
 tests/test-cases/coupon/TC-COUP-003.md             |   2 +-
 tests/test-cases/coupon/TC-COUP-004.md             |   2 +-
 tests/test-cases/coupon/TC-COUP-005.md             |   2 +-
 tests/test-cases/coupon/TC-COUP-006.md             |   2 +-
 tests/test-cases/mobile-registration/TC-MOB-001.md |   2 +-
 tests/test-cases/mobile-registration/TC-MOB-002.md |   2 +-
 tests/test-cases/mobile-registration/TC-MOB-003.md |   2 +-
 tests/test-cases/mobile-registration/TC-MOB-004.md |   2 +-
 tests/test-cases/mobile-registration/TC-MOB-005.md |   2 +-
 tests/test-cases/registration/TC-REG-001.md        |   2 +-
 tests/test-cases/registration/TC-REG-002.md        |   2 +-
 tests/test-cases/registration/TC-REG-003.md        |   2 +-
 tests/test-cases/registration/TC-REG-004.md        |   2 +-
 tests/test-cases/registration/TC-REG-005.md        |   2 +-
 tests/test-cases/registration/TC-REG-006.md        |   2 +-
 tests/test-cases/registration/TC-REG-007.md        |   2 +-
 tests/test-runs/TR-1-001.md                        |  67 ++++++++
 tests/test-scripts/playwright.config.ts            |  22 ++-
 tests/test-summary-report.md                       | 186 +++++++++++++++++++++
 tests/traceability-matrix/traceability-matrix.md   |  71 ++++++++
 40 files changed, 724 insertions(+), 30 deletions(-)
```

---

### Commit 5: `c0c44fe`
- **Full SHA:** `c0c44fe49bbd453a6ce1b4b2b7b55d16ee986ed9`
- **Author:** FME849 <1414439@gmail.com>
- **Date:** Sun Nov 15 09:22:54 2026 +0700
- **Message:** `feat: add ai audit report`
- **Chi tiết thay đổi:**
```text
 tests/ai-audit-report.md | 165 +++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 165 insertions(+)
```

---

### Commit 6: `7974d07`
- **Full SHA:** `7974d07176a5b021ef6fb89006698c39b0e8f42f`
- **Author:** FME849 <1414439@gmail.com>
- **Date:** Sun Nov 15 09:29:39 2026 +0700
- **Message:** `feat: add ai critique`
- **Chi tiết thay đổi:**
```text
 tests/ai-critique.md | 15 +++++++++++++++
 1 file changed, 15 insertions(+)
```
