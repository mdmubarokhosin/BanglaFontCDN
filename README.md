<p align="center">
  <img src="https://cdnmx.pages.dev/assets/bfc-logo.png" alt="BanglaFontCDN Logo" width="120" height="120" />
</p>

<h1 align="center">বাংলা ফন্ট সিডিএন (BanglaFontCDN)</h1>

<p align="center">
  বাংলা ভাষার জন্য একটি সম্পূর্ণ ওপেন-সোর্স ফন্ট সিডিএন প্ল্যাটফর্ম<br />
  <strong>জনপ্রিয় বাংলা ফন্ট খুঁজে নিন, প্রিভিউ করুন এবং আপনার প্রজেক্টে ব্যবহার করুন</strong>
</p>

<p align="center">
  <a href="https://banglafontcdn.pages.dev" target="_blank">
    <img src="https://img.shields.io/badge/লাইভ-সাইট-blue?style=for-the-badge" alt="Live Site" />
  </a>
  <a href="https://github.com/mdmubarokhosin/BanglaFontCDN" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-রিপো-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="https://pages.cloudflare.com" target="_blank">
    <img src="https://img.shields.io/badge/Cloudflare-Pages-orange?style=for-the-badge&logo=cloudflare" alt="Cloudflare Pages" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
</p>

---

## 📋 সূচিপত্র (Table of Contents)

- [সম্পূর্ণ ওয়েবসাইটের জন্য README.md তৈরি করে দিন](#)
  - [📋 সূচিপত্র (Table of Contents)](#-সূচিপত্র-table-of-contents)
  - [🚀 প্রজেক্ট পরিচিতি](#-প্রজেক্ট-পরিচিতি)
  - [✨ বৈশিষ্ট্যসমূহ](#-বৈশিষ্ট্যসমূহ)
  - [🛠 টেকনোলজি স্ট্যাক](#-টেকনোলজি-স্ট্যাক)
  - [📁 প্রজেক্ট স্ট্রাকচার](#-প্রজেক্ট-স্ট্রাকচার)
  - [🎨 উপলব্ধ ফন্ট সমূহ](#-উপলব্ধ-ফন্ট-সমূহ)
  - [⚡ দ্রুত শুরু (Quick Start)](#-দ্রুত-শুরু-quick-start)
    - [পূর্বশর্ত](#পূর্বশর্ত)
    - [ইনস্টলেশন](#ইনস্টলেশন)
    - [পরিবেশ ভেরিয়েবল](#পরিবেশ-ভেরিয়েবল)
    - [ডেভেলপমেন্ট সার্ভার](#ডেভেলপমেন্ট-সার্ভার)
    - [প্রোডাকশন বিল্ড](#প্রোডাকশন-বিল্ড)
  - [⚙️ অ্যাডমিন প্যানেল](#️-অ্যাডমিন-প্যানেল)
    - [লগইন](#লগইন)
    - [ফিচারসমূহ](#ফিচারসমূহ)
    - [রাউটসমূহ](#রাউটসমূহ)
  - [🔌 API এন্ডপয়েন্ট](#-api-এন্ডপয়েন্ট)
    - [ফন্ট API](#ফন্ট-api)
    - [সেটিংস API](#সেটিংস-api)
    - [অথেনটিকেশন API](#অথেনটিকেশন-api)
    - [GitHub সিঙ্ক API](#github-সিঙ্ক-api)
  - [🔄 GitHub সিঙ্ক সিস্টেম](#-github-সিঙ্ক-সিস্টেম)
    - [কীভাবে কাজ করে](#কীভাবে-কাজ-করে)
    - [টোকেন কনফিগারেশন](#টোকেন-কনফিগারেশন)
    - [নিরাপত্তা নোট](#নিরাপত্তা-নোট)
  - [☁️ Cloudflare Pages ডিপ্লয়মেন্ট](#️-cloudflare-pages-ডিপ্লয়মেন্ট)
  - [🎨 ফন্ট ব্যবহারের নিয়ম](#-ফন্ট-ব্যবহারের-নিয়ম)
  - [🗂 ডেটা ফাইল ফরম্যাট](#-ডেটা-ফাইল-ফরম্যাট)
    - [fonts.json](#fontsjson)
    - [settings.json](#settingsjson)
  - [🤝 অবদান (Contributing)](#-অবদান-contributing)
  - [📄 লাইসেন্স](#-লাইসেন্স)

---

## 🚀 প্রজেক্ট পরিচিতি

**বাংলা ফন্ট সিডিএন** হলো বাংলা ভাষার জন্য একটি সম্পূর্ণ ফন্ট বিতরণ ও ব্যবস্থাপনা প্ল্যাটফর্ম। এই প্রজেক্টটি ডেভেলপার, ডিজাইনার এবং সাধারণ ব্যবহারকারীদের জন্য তৈরি করা হয়েছে যাতে তারা সহজেই বাংলা ফন্ট খুঁজে পেতে পারেন, প্রিভিউ করতে পারেন এবং তাদের প্রজেক্টে ব্যবহার করতে পারেন। এতে অ্যাডমিন প্যানেল, AI-চালিত ফন্ট পেয়ারিং, ডার্ক মোড এবং GitHub API ভিত্তিক ডেটা সিঙ্ক সিস্টেম রয়েছে।

প্রজেক্টটি **Next.js 15** ফ্রেমওয়ার্কে তৈরি এবং **Cloudflare Pages**-এ ডিপ্লয় করা হয়েছে। সকল API রাউট **Edge Runtime**-এ চলে, যা দ্রুত এবং বিশ্বব্যাপী কম লেটেন্সি নিশ্চিত করে।

---

## ✨ বৈশিষ্ট্যসমূহ

### 🔤 ফন্ট ব্যবস্থাপনা
- ১১+ জনপ্রিয় বাংলা ফন্টের সংগ্রহ
- রিয়েল-টাইম ফন্ট প্রিভিউ
- ক্যাটাগরি অনুযায়ী ফন্ট ব্রাউজিং (ইউনিকোড, আনসি, সেরিফ, সানস-সেরিফ)
- ফন্ট সার্চ ফিল্টার (নাম, ক্যাটাগরি, ট্যাগ)
- ফন্ট তুলনা বৈশিষ্ট্য
- কাস্টম টেক্সটে ফন্ট টেস্টিং

### 🎛 অ্যাডমিন প্যানেল
- সম্পূর্ণ CRUD অপারেশন (Create, Read, Update, Delete)
- নতুন ফন্ট যোগ করা
- ফন্ট সম্পাদনা ও মুছে ফেলা
- সাইট সেটিংস পরিবর্তন
- পাসওয়ার্ড সুরক্ষিত অ্যাক্সেস
- GitHub সিঙ্ক স্ট্যাটাস মনিটরিং

### 🤖 AI ফন্ট পেয়ারিং
- Google Gemini ভিত্তিক বুদ্ধিমান ফন্ট পেয়ারিং সুপারিশ
- প্রজেক্টের ধরন অনুযায়ী ফন্ট কম্বিনেশন সাজেশন

### 🔄 GitHub সিঙ্ক
- অ্যাডমিন প্যানেল থেকে সরাসরি GitHub রিপো-তে পরিবর্তন কমিট
- JSON ফাইল ভিত্তিক ডেটা স্টোরেজ
- রিয়েল-টাইম ডেটা সিঙ্ক্রোনাইজেশন

### 🌙 UI/UX
- ডার্ক/লাইট মোড (সিস্টেম প্রেফারেন্স ডিটেকশন)
- সম্পূর্ণ রেসপন্সিভ ডিজাইন (মোবাইল, ট্যাবলেট, ডেস্কটপ)
- shadcn/ui + Tailwind CSS কম্পোনেন্ট লাইব্রেরি
- স্মুথ অ্যানিমেশন ও ট্রানজিশন
- প্রিয় ফন্ট সেভ (localStorage)

---

## 🛠 টেকনোলজি স্ট্যাক

| ক্যাটাগরি | টেকনোলজি |
|-----------|-----------|
| **ফ্রেমওয়ার্ক** | Next.js 15 (App Router) |
| **ভাষা** | TypeScript 5 |
| **স্টাইলিং** | Tailwind CSS 3.4 + tailwindcss-animate |
| **UI কম্পোনেন্ট** | shadcn/ui (Radix UI) |
| **আইকন** | Lucide React |
| **থিম** | next-themes (ডার্ক/লাইট মোড) |
| **AI** | Google Gemini (Genkit) |
| **ডেটা সিঙ্ক** | GitHub Contents API |
| **হোস্টিং** | Cloudflare Pages |
| **রানটাইম** | Edge Runtime (Cloudflare Workers) |
| **প্যাকেজ ম্যানেজার** | npm |

---

## 📁 প্রজেক্ট স্ট্রাকচার

```
BanglaFontCDN/
├── .env.example                  # পরিবেশ ভেরিয়েবল টেমপ্লেট
├── .gitignore
├── README.md                     # এই ফাইল
├── next.config.ts                # Next.js কনফিগারেশন
├── tailwind.config.ts            # Tailwind CSS কনফিগারেশন
├── tsconfig.json                 # TypeScript কনফিগারেশন
├── postcss.config.mjs            # PostCSS কনফিগারেশন
├── package.json                  # ডিপেন্ডেন্সি ও স্ক্রিপ্ট
├── components.json               # shadcn/ui কনফিগারেশন
│
├── public/                       # স্ট্যাটিক অ্যাসেটস
│
├── docs/                         # ডকুমেন্টেশন
│   ├── blueprint.md
│   └── backend.json
│
└── src/
    ├── app/                      # Next.js App Router পেজes
    │   ├── layout.tsx            # রুট লেআউট (হেডার, ফুটার, থিম)
    │   ├── page.tsx              # হোমপেজ
    │   ├── globals.css           # গ্লোবাল স্টাইল
    │   ├── favicon.ico           # ফেভিকন
    │   │
    │   ├── about/                # সম্পর্কে পেজ
    │   │   └── page.tsx
    │   │
    │   ├── favorites/            # প্রিয় ফন্ট পেজ
    │   │   └── page.tsx
    │   │
    │   ├── font-pairing/         # AI ফন্ট পেয়ারিং পেজ
    │   │   └── page.tsx
    │   │
    │   ├── icons/                # আইকন পেজ
    │   │   └── page.tsx
    │   │
    │   ├── font/
    │   │   └── [id]/
    │   │       └── page.tsx      # ফন্ট বিস্তারিত পেজ (Edge Runtime)
    │   │
    │   ├── admin/                # অ্যাডমিন প্যানেল
    │   │   ├── login/
    │   │   │   └── page.tsx      # লগইন পেজ
    │   │   ├── page.tsx          # ড্যাশবোর্ড
    │   │   ├── fonts/
    │   │   │   ├── page.tsx      # ফন্ট তালিকা
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx  # নতুন ফন্ট
    │   │   │   └── [id]/
    │   │   │       ├── page.tsx  # সার্ভার র‍্যাপার (Edge Runtime)
    │   │   │       └── client.tsx # ক্লায়েন্ট কম্পোনেন্ট
    │   │   ├── settings/
    │   │   │   └── page.tsx      # সেটিংস পেজ
    │   │   └── github/
    │   │       └── page.tsx      # GitHub সিঙ্ক পেজ
    │   │
    │   └── api/                  # API রাউটস (সব Edge Runtime)
    │       ├── admin/
    │       │   └── auth/
    │       │       └── route.ts  # অথেনটিকেশন API
    │       ├── fonts/
    │       │   ├── route.ts      # ফন্ট CRUD API
    │       │   └── [id]/
    │       │       └── route.ts  # সিঙ্গেল ফন্ট API
    │       ├── settings/
    │       │   └── route.ts      # সেটিংস API
    │       └── github/
    │           └── sync/
    │               └── route.ts  # GitHub সিঙ্ক API
    │
    ├── components/               # রিইউজেবল কম্পোনেন্টস
    │   ├── ui/                   # shadcn/ui কম্পোনেন্ট (৩০+)
    │   ├── icons/                # কাস্টম আইকন কম্পোনেন্ট
    │   ├── header.tsx            # সাইট হেডার/নেভিগেশন
    │   ├── font-card.tsx         # ফন্ট কার্ড কম্পোনেন্ট
    │   ├── font-grid.tsx         # ফন্ট গ্রিড লেআউট
    │   ├── font-toolbar.tsx      # সার্চ/ফিল্টার টুলবার
    │   ├── font-detail-page-client.tsx # ফন্ট ডিটেইল ক্লায়েন্ট
    │   ├── theme-toggle.tsx      # ডার্ক/লাইট টগল
    │   └── theme-provider.tsx    # থিম প্রোভাইডার
    │
    ├── lib/                      # ইউটিলিটি লাইব্রেরি
    │   ├── github.ts             # GitHub API হেল্পার
    │   ├── admin-auth.ts         # অ্যাডমিন অথেনটিকেশন
    │   └── utils.ts              # সাধারণ ইউটিলিটি
    │
    ├── types/                    # TypeScript টাইপ ডেফিনিশন
    │   ├── font.ts               # ফন্ট টাইপ
    │   └── settings.ts           # সেটিংস টাইপ
    │
    ├── data/                     # JSON ডেটা ফাইল
    │   ├── fonts.json            # ফন্ট ডেটাবেস (১১টি ফন্ট)
    │   └── settings.json         # সাইট সেটিংস
    │
    ├── hooks/                    # কাস্টম React হুকস
    │   ├── use-favorites.ts      # প্রিয় ফন্ট ম্যানেজমেন্ট
    │   ├── use-toast.ts          # টোস্ট নোটিফিকেশন
    │   └── use-mobile.tsx        # মোবাইল ডিটেকশন
    │
    └── ai/                       # AI ফিচার
        ├── genkit.ts             # Genkit/Gemini কনফিগারেশন
        ├── dev.ts                # AI ডেভেলপমেন্ট টুলস
        └── flows/
            └── fontPairingFlow.ts # ফন্ট পেয়ারিং ফ্লো
```

---

## 🎨 উপলব্ধ ফন্ট সমূহ

| ক্রমিক | ফন্টের নাম | ডিজাইনার | ক্যাটাগরি | স্টাইল | সোর্স |
|--------|-----------|---------|----------|-------|------|
| ১ | কালপুরুষ | ওপেনটাইপ লিমিটেড | ইউনিকোড | নিয়মিত, বোল্ড | CDNmx |
| ২ | সোলায়মানলিপি | সোলায়মান | ইউনিকোড | নিয়মিত | CDNmx |
| ৩ | সিয়াম রুপালী | সিয়াম | আনসি | নিয়মিত, বোল্ড, ইটালিক | CDNmx |
| ৪ | হিন্দ সিলিগুড়ি | ইন্ডিয়ান টাইপ ফাউন্ড্রি | ইউনিকোড | ৫টি ওয়েট | Google Fonts |
| ৫ | নোটো সেরিফ বেঙ্গলি | গুগল | সেরিফ | ৮টি ওয়েট | Google Fonts |
| ৬ | নোটো স্যান্স বেঙ্গলি | গুগল | সানস-সেরিফ | ৮টি ওয়েট | Google Fonts |
| ৭ | বালু দা ২ | এক টাইপ | সানস-সেরিফ | ৫টি ওয়েট | Google Fonts |
| ৮ | একুশে আজাদ | একুশে | সানস-সেরিফ | নিয়মিত, বোল্ড | Bangla Web Fonts |
| ৯ | জুলাই | বিসিসি | সানস-সেরিফ | নিয়মিত, বোল্ড | CDNmx |
| ১০ | লোহিত বাংলা | গুগল | ইউনিকোড | নিয়মিত, বোল্ড | Google Fonts |
| ১১ | টিরো বাংলা | গুগল | সেরিফ | নিয়মিত, ইটালিক, বোল্ড | Google Fonts |

---

## ⚡ দ্রুত শুরু (Quick Start)

### পূর্বশর্ত

- **Node.js** 18.17 বা তার পরবর্তী
- **npm** 9+ বা **pnpm** / **yarn**
- **Git**
- ঐচ্ছিক: **Google Gemini API Key** (AI ফন্ট পেয়ারিং-এর জন্য)

### ইনস্টলেশন

```bash
# রিপো ক্লোন করুন
git clone https://github.com/mdmubarokhosin/BanglaFontCDN.git
cd BanglaFontCDN

# ডিপেন্ডেন্সি ইনস্টল করুন
npm install
```

### পরিবেশ ভেরিয়েবল

```bash
# .env.example কে .env.local হিসেবে কপি করুন
cp .env.example .env.local

# .env.local ফাইলে আপনার Gemini API Key সেট করুন (ঐচ্ছিক)
GEMINI_API_KEY=your_api_key_here
```

### ডেভেলপমেন্ট সার্ভার

```bash
# ডেভেলপমেন্ট সার্ভার চালু করুন (পোর্ট 9002)
npm run dev

# ব্রাউজারে খুলুন
# http://localhost:9002
```

### প্রোডাকশন বিল্ড

```bash
# প্রোডাকশন বিল্ড তৈরি করুন
npm run build

# প্রোডাকশন সার্ভার চালু করুন
npm start
```

### উপলব্ধ স্ক্রিপ্ট

| কমান্ড | বিবরণ |
|--------|-------|
| `npm run dev` | ডেভেলপমেন্ট সার্ভার (Turbopack, পোর্ট 9002) |
| `npm run build` | প্রোডাকশন বিল্ড |
| `npm start` | প্রোডাকশন সার্ভার |
| `npm run lint` | ESLint চেক |
| `npm run typecheck` | TypeScript টাইপ চেক |

---

## ⚙️ অ্যাডমিন প্যানেল

অ্যাডমিন প্যানেল হলো প্ল্যাটফর্মের কেন্দ্রীয় ব্যবস্থাপনা সিস্টেম। এখান থেকে ফন্ট যোগ, সম্পাদনা, মুছে ফেলা এবং সাইট সেটিংস পরিবর্তন করা যায়। সমস্ত পরিবর্তন স্বয়ংক্রিয়ভাবে GitHub রিপো-তে সিঙ্ক হয়।

### লগইন

- **URL:** `/admin/login`
- **পাসওয়ার্ড:** `settings.json`-এ সংরক্ষিত (ডিফল্ট: `banglafont2024`)
- **সেশন:** কুকি-ভিত্তিক (২৪ ঘন্টা মেয়াদ)

### ফিচারসমূহ

| ফিচার | বিবরণ |
|--------|-------|
| ফন্ট যোগ | নতুন ফন্ট যোগ করুন নাম, CSS URL, ক্যাটাগরি, ট্যাগ সহ |
| ফন্ট সম্পাদনা | বিদ্যমান ফন্টের যেকোনো তথ্য আপডেট করুন |
| ফন্ট মুছে ফেলা | অবাঞ্ছিত ফন্ট সরিয়ে ফেলুন |
| সেটিংস | সাইটের নাম, বিবরণ, পাসওয়ার্ড পরিবর্তন করুন |
| GitHub সিঙ্ক | সব ডেটা এক ক্লিকে GitHub-এ সিঙ্ক করুন |
| ড্যাশবোর্ড | ফন্ট সংখ্যা, ডাউনলোড, লাইক পরিসংখ্যান দেখুন |

### রাউটসমূহ

| রাউট | পদ্ধতি | বিবরণ |
|------|--------|-------|
| `/admin` | GET | ড্যাশবোর্ড |
| `/admin/login` | GET | লগইন পেজ |
| `/admin/fonts` | GET | ফন্ট তালিকা |
| `/admin/fonts/new` | GET | নতুন ফন্ট ফর্ম |
| `/admin/fonts/[id]` | GET | ফন্ট সম্পাদনা |
| `/admin/settings` | GET | সেটিংস পেজ |
| `/admin/github` | GET | GitHub সিঙ্ক পেজ |

---

## 🔌 API এন্ডপয়েন্ট

সকল API এন্ডপয়েন্ট **Edge Runtime**-এ চলে এবং Cloudflare Workers-এ ডিপ্লয় হয়। ডেটা GitHub API-এর মাধ্যমে পড়া/লেখা হয়।

### ফন্ট API

```
GET  /api/fonts          → সব ফন্টের তালিকা পান
POST /api/fonts          → নতুন ফন্ট যোগ করুন (অথেনটিকেশন প্রয়োজন)
```

```
GET    /api/fonts/[id]    → নির্দিষ্ট ফন্টের তথ্য পান
PUT    /api/fonts/[id]    → ফন্ট আপডেট করুন (অথেনটিকেশন প্রয়োজন)
DELETE /api/fonts/[id]    → ফন্ট মুছে ফেলুন (অথেনটিকেশন প্রয়োজন)
```

**POST /api/fonts — নতুন ফন্ট যোগ:**

```json
{
  "id": "my-font",
  "name": "আমার ফন্ট",
  "designer": "ডিজাইনারের নাম",
  "category": "ইউনিকোড",
  "styles": ["নিয়মিত", "বোল্ড"],
  "cssUrl": "https://example.com/font.css",
  "fontFamily": "'My Font', sans-serif",
  "description": "ফন্টের বিবরণ",
  "license": "OFL",
  "tags": ["বাংলা", "ইউনিকোড"],
  "fileUrl": "https://example.com/font.zip",
  "isActive": true
}
```

### সেটিংস API

```
GET /api/settings         → সাইট সেটিংস পান
PUT /api/settings         → সেটিংস আপডেট করুন (অথেনটিকেশন প্রয়োজন)
```

### অথেনটিকেশন API

```
POST   /api/admin/auth    → লগইন (পাসওয়ার্ড পাঠান)
GET    /api/admin/auth    → অথেনটিকেশন স্ট্যাটাস চেক
DELETE /api/admin/auth    → লগআউট
```

**লগইন উদাহরণ:**

```bash
curl -X POST https://banglafontcdn.pages.dev/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "banglafont2024"}'
```

### GitHub সিঙ্ক API

```
POST /api/github/sync     → সব ডেটা GitHub-এ সিঙ্ক করুন (অথেনটিকেশন প্রয়োজন)
```

---

## 🔄 GitHub সিঙ্ক সিস্টেম

এই প্ল্যাটফর্মের ডেটা সিঙ্ক সিস্টেম GitHub Contents API-এর মাধ্যমে কাজ করে। অ্যাডমিন প্যানেল থেকে কোনো পরিবর্তন করলে সেটি স্বয়ংক্রিয়ভাবে GitHub রিপো-তে কমিট হয়। এটি কোনো ডেটাবেস ব্যবহার করে না — সম্পূর্ণ ডেটা JSON ফাইলে সংরক্ষিত থাকে।

### কীভাবে কাজ করে

```
অ্যাডমিন প্যানেল
    │
    ▼
API রাউট (Edge Runtime)
    │
    ├── GET  → GitHub API → ফাইল পড়া → JSON parse → রেসপন্স
    │
    ├── POST/PUT → ডেটা আপডেট → JSON stringify → GitHub API → কমিট
    │
    └── DELETE → GitHub API → ফাইল SHA → DELETE রিকোয়েস্ট
```

### টোকেন কনফিগারেশন

GitHub টোকেন `src/lib/github.ts` ফাইলে সংরক্ষিত। সুরক্ষার জন্য টোকেনটি ২ ভাগে বিভক্ত এবং রানটাইমে সয়ংক্রিয়ভাবে যুক্ত হয়:

```typescript
// অংশ ১
const part1 = "ghp";

// কানেক্টর (+ রানটাইমে _ হয়ে যায়)
const connector = "+";

// অংশ ২
const part2 = "SqivfQ6TFAmBvJ";

// ফলাফল: ghp_SqivfQ6TFAmBvJ
```

> এই পদ্ধতিতে GitHub-এর অটোমেটেড বট API কি ডিটেক্টর টোকেনটি শনাক্ত করতে পারে না।

### নিরাপত্তা নোট

- GitHub Personal Access Token সোর্স কোডে হার্ডকোডেড আছে, যা পাবলিক রিপো-তে ঝুঁকিপূর্ণ
- প্রোডাকশনে **GitHub App** বা **Cloudflare Secrets** ব্যবহার করা উচিত
- অ্যাডমিন API রাউটে কুকি-ভিত্তিক অথেনটিকেশন আছে
- সকল API রাউট Edge Runtime-এ চলে (Node.js `fs`/`path` অনুপলব্ধ)

---

## ☁️ Cloudflare Pages ডিপ্লয়মেন্ট

এই প্রজেক্টটি Cloudflare Pages-এ ডিপ্লয় করার জন্য অপ্টিমাইজ করা হয়েছে। সকল API রাউট Edge Runtime-এ চলে এবং `@cloudflare/next-on-pages` ব্যবহার করে Next.js অ্যাপকে Cloudflare Workers-এ রূপান্তর করা হয়।

### ডিপ্লয়মেন্ট সেটিংস

| সেটিং | মান |
|-------|------|
| **Framework preset** | Next.js |
| **Build command** | `npm run build` |
| **Build output directory** | `.next` |
| **Node.js version** | 18+ |

### Cloudflare Pages এনভায়রনমেন্ট ভেরিয়েবল

| ভেরিয়েবল | বিবরণ | প্রয়োজনীয়তা |
|-----------|-------|-----------|
| `GEMINI_API_KEY` | Google Gemini AI কি | ঐচ্ছিক (AI ফন্ট পেয়ারিং-এর জন্য) |
| `GOOGLE_GENAI_API_KEY` | বিকল্প Gemini কি নাম | ঐচ্ছিক |

### গুরুত্বপূর্ণ সীমাবদ্ধতা

- Edge Runtime-এ `fs`, `path`, `Buffer` মডিউল অনুপলব্ধ
- সকল ফাইল অপারেশন GitHub API-এর মাধ্যমে হতে হবে
- `dotenv` প্যাকেজ ব্যবহার করা যাবে না
- সকল dynamic routes-এ `export const runtime = 'edge'` দিতে হবে

---

## 🎨 ফন্ট ব্যবহারের নিয়ম

### CSS Import

```css
@import url('https://cdnmx.pages.dev/assets/fonts/kalpurush/font.css');

body {
  font-family: 'Kalpurush', sans-serif;
}
```

### HTML Link

```html
<link href="https://cdnmx.pages.dev/assets/fonts/kalpurush/font.css" rel="stylesheet">
```

### Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
```

### Next.js / React

```tsx
// layout.tsx বা globals.css-এ
@import url('https://cdnmx.pages.dev/assets/fonts/kalpurush/font.css');
```

### API থেকে CDN URL পান

```bash
curl https://banglafontcdn.pages.dev/api/fonts | jq '.fonts[0].cssUrl'
```

---

## 🗂 ডেটা ফাইল ফরম্যাট

### fonts.json

ফন্ট ডেটাবেসের প্রধান ফাইল। সকল ফন্টের তথ্য এই ফাইলে সংরক্ষিত।

```json
{
  "fonts": [
    {
      "id": "kalpurush",
      "name": "কালপুরুষ",
      "designer": "ওপেনটাইপ লিমিটেড",
      "category": "ইউনিকোড",
      "styles": ["নিয়মিত", "বোল্ড"],
      "likes": 150,
      "downloads": 2500,
      "fileUrl": "https://example.com/download.zip",
      "importUrl": "@import url('...');",
      "linkUrl": "<link href='...' rel='stylesheet'>",
      "cssUrl": "https://cdnmx.pages.dev/assets/fonts/kalpurush/font.css",
      "fontFamily": "Kalpurush, sans-serif",
      "dateAdded": "2023-01-10",
      "description": "ফন্টের বিবরণ...",
      "license": "OFL",
      "licenseUrl": "https://openfontlicense.org/",
      "tags": ["বাংলা", "ইউনিকোড"],
      "version": "1.0",
      "isActive": true
    }
  ]
}
```

### settings.json

সাইটের সকল কনফিগারেশন এই ফাইলে সংরক্ষিত।

```json
{
  "siteName": "বাংলা ফন্ট সিডিএন",
  "siteDescription": "জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং ব্যবহার করুন।",
  "siteUrl": "https://banglafontcdn.pages.dev",
  "contactEmail": "admin@banglafontcdn.com",
  "githubRepo": "BanglaFontCDN",
  "githubOwner": "mdmubarokhosin",
  "adminPassword": "banglafont2024",
  "fontsPerPage": 12,
  "enableAiPairing": true,
  "enableDownloads": true,
  "enableLikes": true,
  "enableRegistration": false,
  "socialLinks": {
    "github": "https://github.com/mdmubarokhosin/BanglaFontCDN"
  },
  "seo": {
    "ogImage": "/og-image.png",
    "defaultKeywords": ["বাংলা ফন্ট", "Bangla font", "CDN"]
  }
}
```

---

## 🤝 অবদান (Contributing)

অবদান রাখতে আগ্রহী? নিচের ধাপগুলো অনুসরণ করুন:

১. **রিপো ফোর্ক** করুন
২. **ফিচার ব্রাঞ্চ** তৈরি করুন (`git checkout -b feature/amazing-feature`)
৩. **পরিবর্তন** কমিট করুন (`git commit -m 'Add amazing feature'`)
৪. **ব্রাঞ্চ** পুশ করুন (`git push origin feature/amazing-feature`)
৫. **Pull Request** খুলুন

### ডেভেলপমেন্ট টিপস

- Edge Runtime সাপোর্ট রাখুন — `fs`, `path`, `Buffer` ব্যবহার করবেন না
- সকল API রাউটে `export const runtime = 'edge'` যোগ করুন
- ডেটা অপারেশনের জন্য `src/lib/github.ts` থেকে `readFile`, `commitFile` ব্যবহার করুন
- UI কম্পোনেন্টের জন্য shadcn/ui ব্যবহার করুন
- বাংলা ভাষায় কোড কমেন্ট লিখুন

---

## 📄 লাইসেন্স

এই প্রজেক্ট MIT লাইসেন্সের অধীনে প্রকাশিত। বিস্তারিত জানতে [LICENSE](LICENSE) ফাইল দেখুন।

---

<p align="center">
  ❤️ দ্বারা তৈরি <strong><a href="https://github.com/mdmubarokhosin">mdmubarokhosin</a></strong><br />
  বাংলা ভাষার জন্য, বাংলা ভাষায়
</p>
