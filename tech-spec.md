# ملف المواصفات التقنية - منصة أمل الخيرية

## الملخص

منصة أمل الخيرية هي تطبيق ويب احترافي يحاكي وظائف موقع قطر الخيرية. يتكون المشروع من 9 صفحات رئيسية مع وظائف أساسية مثل عرض المشاريع، التبرع، حاسبة الزكاة، ولوحة تحكم المتبرعين. يعتمد على React مع Tailwind CSS وتأثيرات Framer Motion لتحقيق تجربة مستخدم سلسة وعصرية.

---

## المكتبات والتبعيات

### المكتبات الأساسية

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `react` | ^19.0.0 | إطار عمل الواجهة الأمامية |
| `react-dom` | ^19.0.0 | عرض DOM لـ React |
| `react-router-dom` | ^7.1.0 | التوجيه بين الصفحات (9 صفحات) |
| `typescript` | ^5.7.0 | الكتابة الثابتة للأنواع |
| `vite` | ^6.0.0 | أداة البناء والتطوير |

### التصميم والأنماط

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `tailwindcss` | ^3.4.0 | إطار الأنماط المسؤول |
| `autoprefixer` | ^10.4.0 | إضافة اللاحقات التلقائية للمتصفحات |
| `postcss` | ^8.4.0 | معالجة CSS |
| `@tailwindcss/typography` | ^0.5.0 | تنسيق النصوص الطويلة |

### المكونات وUI

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `shadcn/ui` | latest | مكونات UI جاهزة وقابلة للتخصيص |
| `@radix-ui/react-*` | ^1.0.0 | مكونات أساسية قابلة للوصول (primitives) |
| `class-variance-authority` | ^0.7.0 | إدارة اختلافات المكونات |
| `clsx` | ^2.1.0 | دمج أسماء الفئات الشرطية |
| `tailwind-merge` | ^2.6.0 | دمج أنماط Tailwind دون تكرار |

### التأثيرات والرسوم المتحركة

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `framer-motion` | ^11.18.0 | تأثيرات دخول العناصر (scroll reveal)، انتقالات الصفحات، حركات المكونات |
| `lucide-react` | ^0.468.0 | أيقونات SVG عصرية وخفيفة |
| `three` | ^0.172.0 | تأثير Color Mesh Gradient في صفحة "من نحن" |
| `@react-three/fiber` | ^9.0.0 | ربط Three.js مع React |
| `@react-three/drei` | ^10.0.0 | أدوات مساعدة لـ Three.js |

### جداول البيانات والرسوم البيانية

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `recharts` | ^2.15.0 | الرسوم البيانية في لوحة تحكم المتبرع |

### النماذج والتحقق

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `react-hook-form` | ^7.54.0 | إدارة نماذج الإدخال بكفاءة |
| `zod` | ^3.24.0 | تحقق من صحة البيانات (validation) |
| `@hookform/resolvers` | ^3.9.0 | ربط react-hook-form مع zod |

### أدوات مساعدة

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| `uuid` | ^11.0.0 | توليد معرفات فريدة |
| `date-fns` | ^4.1.0 | تنسيق التواريخ |

---

## هيكل المكونات

### المكونات المشتركة (Shared)

```
src/components/
├── Navbar.tsx                    # شريط التنقل العلوي
├── Footer.tsx                    # تذييل الصفحة
├── ProjectCard.tsx               # بطاقة المشروع (مستخدمة في Homepage و Projects)
├── ProgressBar.tsx               # شريط التقدم
├── DonationBox.tsx               # صندوق التبرع (Sidebar في ProjectDetail)
├── FilterSidebar.tsx             # الشريط الجانبي للفلاتر
├── StatCard.tsx                  # بطاقة الإحصائيات
├── Toast.tsx                     # إشعارات التنبيه
├── PageTransition.tsx            # تأثير الانتقال بين الصفحات
└── RTLWrapper.tsx                # مكون التحكم باتجاه RTL
```

### مكونات الصفحات

```
src/pages/
├── HomePage.tsx                  # الصفحة الرئيسية
├── AboutPage.tsx                 # من نحن
├── ProjectsPage.tsx              # قائمة المشاريع
├── ProjectDetailPage.tsx         # تفاصيل المشروع
├── ZakatCalculatorPage.tsx       # حاسبة الزكاة
├── DonorDashboardPage.tsx        # لوحة تحكم المتبرع
├── LoginPage.tsx                 # تسجيل الدخول
├── RegisterPage.tsx              # التسجيل
└── CheckoutPage.tsx              # إتمام التبرع
```

### الأقسام (Sections) - الصفحة الرئيسية

```
src/sections/home/
├── HeroSection.tsx               # القسم الرئيسي (فيديو + ticker)
├── UrgentProjectsSection.tsx     # المشاريع العاجلة
├── StatisticsSection.tsx         # الإحصائيات
├── QuickDonateSection.tsx        # التبرع السريع
└── RecurringSection.tsx          # التبرعات الدورية
```

### الأقسام (Sections) - صفحة من نحن

```
src/sections/about/
├── HeroShader.tsx                # تأثير Three.js Shader
├── VisionMissionSection.tsx      # الرؤية والرسالة
└── TeamPartnersSection.tsx       # الفريق والشركاء
```

### السياقات والحالة

```
src/context/
├── CartContext.tsx               # سياق سلة التبرع
├── AuthContext.tsx               # سياق المصادقة
└── ThemeContext.tsx              # سياق الثيم
```

### أنواع TypeScript

```
src/types/
├── project.ts                    # أنواع المشاريع
├── user.ts                       # أنواع المستخدمين
├── donation.ts                   # أنواع التبرعات
└── cart.ts                       # أنواع سلة التبرع
```

### البيانات الوهمية

```
src/data/
├── projects.ts                   # بيانات المشاريع
├── stats.ts                      # بيانات الإحصائيات
├── team.ts                       # بيانات الفريق
└── navigation.ts                 # بيانات التنقل
```

### السمات المخصصة

```
src/hooks/
├── useScrollReveal.ts            # هوك تأثيرات دخول العناصر
├── useLocalStorage.ts            # هوك localStorage
└── useMediaQuery.ts              # هوك استجابة حجم الشاشة
```

---

## خطة التنفيذ

### المرحلة 1: إعداد المشروع والبنية التحتية

| المهمة | الوصف |
|--------|-------|
| إعداد React + Vite | إنشاء مشروع جديد مع TypeScript |
| تكوين Tailwind CSS | إعداد Tailwind مع دعم RTL |
| إعداد shadcn/ui | تثبيت وتكوين مكونات shadcn |
| تكوين Router | إعداد react-router-dom لـ 9 صفحات |
| إنشاء السياقات | CartContext, AuthContext |
| إعداد البيانات الوهمية | إنشاء بيانات المشاريع والإحصائيات |

### المرحلة 2: المكونات المشتركة

| المهمة | الوصف |
|--------|-------|
| Navbar | شريط تنقل ثابت مع RTL، سلة، ملف شخصي |
| Footer | تذييل داكن مع 4 أعمدة |
| ProjectCard | بطاقة مشروع مع شريط تقدم |
| ProgressBar | شريط تقدم تفاعلي |
| Toast | نظام إشعارات التنبيه |
| PageTransition | تأثير انتقال الصفحات |

### المرحلة 3: الصفحة الرئيسية

| المهمة | الوصف |
|--------|-------|
| HeroSection | فيديو خلفية + ticker أخبار متحرك |
| UrgentProjectsSection | سلايدر أفقي للمشاريع العاجلة |
| StatisticsSection | أرقام كبيرة متحركة |
| QuickDonateSection | قسم التبرع السريع |
| RecurringSection | بطاقات التبرع الدوري |

### المرحلة 4: صفحة من نحن

| المهمة | الوصف |
|--------|-------|
| HeroShader | تأثير Color Mesh Gradient بـ Three.js |
| VisionMissionSection | أقسام متناوبة (Zigzag) |
| TeamPartnersSection | شبكة الفريق والشركاء |

### المرحلة 5: صفحة المشاريع

| المهمة | الوصف |
|--------|-------|
| FilterSidebar | فلاتر ديناميكية |
| ProjectGrid | شبكة 3 أعمدة مع Framer Motion |

### المرحلة 6: صفحة تفاصيل المشروع

| المهمة | الوصف |
|--------|-------|
| ProjectHero | صورة بعرض كامل |
| ProjectDetails | وصف + تفاصيل المشروع |
| DonationBox | صندوق تبرع ثابت |

### المرحلة 7: حاسبة الزكاة

| المهمة | الوصف |
|--------|-------|
| CalculatorLayout | تخطيط حاسبة CSS Grid |
| ZakatTypesTabs | تبويبات أنواع الزكاة |
| ResultDisplay | عرض النتيجة |

### المرحلة 8: لوحة تحكم المتبرع

| المهمة | الوصف |
|--------|-------|
| Sidebar | شريط جانبي للروابط |
| SummaryCards | بطاقات ملخص |
| DonationsTable | جدول التبرعات |
| MonthlyChart | رسم بياني شهري |

### المرحلة 9: المصادقة

| المهمة | الوصف |
|--------|-------|
| LoginPage | صفحة مقسمة (Split-screen) |
| RegisterPage | نموذج التسجيل مع التحقق |

### المرحلة 10: إتمام التبرع

| المهمة | الوصف |
|--------|-------|
| Stepper | شريط الخطوات المتعددة |
| DonationStep | تفاصيل التبرع |
| PersonalInfoStep | البيانات الشخصية |
| PaymentStep | نموذج الدفع |

---

## التوجيه (Routing)

| المسار | الصفحة | الوصف |
|--------|--------|-------|
| `/` | HomePage | الصفحة الرئيسية |
| `/about` | AboutPage | من نحن |
| `/projects` | ProjectsPage | قائمة المشاريع |
| `/projects/:id` | ProjectDetailPage | تفاصيل مشروع |
| `/zakat` | ZakatCalculatorPage | حاسبة الزكاة |
| `/dashboard` | DonorDashboardPage | لوحة تحكم المتبرع |
| `/login` | LoginPage | تسجيل الدخول |
| `/register` | RegisterPage | التسجيل |
| `/checkout` | CheckoutPage | إتمام التبرع |

---

## خطة البيانات الوهمية

### المشاريع (10 مشاريع)

| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | string | معرف فريد |
| title | string | عنوان المشروع |
| description | string | وصف المشروع |
| image | string | رابط الصورة |
| category | string | الفئة (زكاة، صدقة، كفالة) |
| targetAmount | number | المبلغ المستهدف |
| raisedAmount | number | المبلغ المجموع |
| beneficiaries | number | عدد المستفيدين |
| urgency | 'high' \| 'medium' \| 'low' | درجة العجلة |
| location | string | الموقع |
| acceptsZakat | boolean | هل يقبل الزكاة |

### الإحصائيات

| الحقل | القيمة |
|-------|--------|
| totalDonors | 150,000+ |
| totalRaised | 250,000,000 ريال |
| completedProjects | 5,200+ |
| activeCountries | 50+ |

---

## إدارة الحالة

### سلة التبرع (CartContext)

```typescript
interface CartItem {
  projectId: string;
  projectTitle: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

// الإجراءات: addItem, removeItem, updateAmount, clearCart
```

### المصادقة (AuthContext)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// الإجراءات: login, logout, register
```

---

## التأثيرات الرئيسية

### 1. تأثير Color Mesh Gradient (صفحة من نحن)

- **المكتبة**: Three.js + @react-three/fiber
- **التفاصيل**: شبكة ألوان تفاعلية تتحرك بحركة الماوس
- **الألوان**: `#083C5A` و `#E8734A`
- **التنفيذ**: ShaderMaterial مخصص مع Fragment Shader

### 2. تأثيرات دخول العناصر (Scroll Reveal)

- **المكتبة**: Framer Motion + useInView
- **التفاصيل**: fade-in + translateY(20px) -> translateY(0)
- **المدة**: 0.8s
- **التأخير**: متدرج حسب ترتيب العنصر

### 3. ticker الأخبار المتحرك

- **المكتبة**: CSS Animation (بدون مكتبة)
- **التفاصيل**: شريط نصي يتحرك بشكل مستمر من اليمين لليسار
- **المدة**: 30s للدورة الكاملة

### 4. الرسوم المتحركة للأرقام

- **المكتبة**: Framer Motion (useMotionValue + animate)
- **التفاصيل**: عداد أرقام يتدرج من 0 إلى القيمة النهائية
- **المدة**: 2s

---

## الاعتبارات التقنية

### دعم RTL

- تعيين `dir="rtl"` في عنصر `<html>`
- تكوين Tailwind مع `rtl:` variant
- جميع المكونات مصممة من اليمين لليسار

### الاستجابة (Responsive)

- **Mobile**: < 640px - تخطيط عمودي واحد
- **Tablet**: 640px - 1024px - تخطيط عمودين
- **Desktop**: > 1024px - تخطيط كامل

### الأداء

- استخدام `React.lazy` للصفحات
- تحميل الصور بشكل كسول (Lazy loading)
- تقليل حجم مكتبة Three.js (إزالة الميزات غير المستخدمة)

---

## قائمة المهام

- [ ] إعداد المشروع والتبعيات
- [ ] إنشاء المكونات المشتركة (Navbar, Footer, ProjectCard)
- [ ] بناء الصفحة الرئيسية مع جميع أقسامها
- [ ] بناء صفحة من نحن مع تأثير Three.js
- [ ] بناء صفحة المشاريع مع الفلاتر الديناميكية
- [ ] بناء صفحة تفاصيل المشروع مع صندوق التبرع
- [ ] بناء حاسبة الزكاة
- [ ] بناء لوحة تحكم المتبرع
- [ ] بناء صفحات المصادقة
- [ ] بناء صفحة إتمام التبرع
- [ ] البناء والنشر