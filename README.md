# 💎 FinanceFlow — Executive Wealth & Cashflow Intelligence OS

[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite&style=flat-square)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.8-22c55e?style=flat-square)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.3-ff0055?logo=framer&style=flat-square)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> A modern, production-grade FinTech OS designed for executive cash flow management, granular transaction auditing, and heuristic financial intelligence. Built with **React 19, Vite, Tailwind CSS, Recharts, and Framer Motion**.

---

## 🌐 Live Demo & Deployment

- **Live URL:** [https://finance-dashboard-eight-snowy.vercel.app/](https://finance-dashboard-eight-snowy.vercel.app/)
- **GitHub Repository:** [https://github.com/vinay7376/finance-dashboard](https://github.com/vinay7376/finance-dashboard)

---

## ⚡ Key Engineering & Architecture Highlights

### 1. 📊 Executive Control Center (Dashboard)
- **MoM Delta Analytics:** Real Month-over-Month percentage changes calculated dynamically across periods (Inflow, Outflow, Net Balance).
- **Cash Flow Velocity Area Chart:** Recharts dual-gradient Spline/Area chart with responsive timeframe filters (`3M`, `6M`, `All Time`).
- **Donut Expense Allocation:** Interactive SVG slice hovering with live percentage labels and centralized total expenditure.
- **Monthly Budget Guard:** Dynamic monthly budget tracking with visual thresholds (Healthy `< 70%`, Warning `70-90%`, Over Budget `> 90%`) and admin budget adjustment.
- **Recent Activity Ledger:** Real-time transaction feed with category badges, date timestamps, and payment method indicators.

### 2. 🧾 Enterprise Transaction Ledger
- **Debounced Live Search:** Multi-attribute filtering across description, notes, payment mode, and category tags.
- **Multi-Dimensional Filters:** Filter by Inflow/Outflow, Category dropdown, and custom Date Ranges (`From` / `To`).
- **Smart Sorting & Pagination:** Sort by newest/oldest and amount (high/low) with customizable rows per page (`5`, `8`, `15`, `25`).
- **Full Non-Destructive CRUD:**
  - Create & Edit modals with inline validation and animated state management.
  - Safe Delete operations protected by confirmation dialogs.
  - UUID transaction identification preventing index-mismatch corruption during filtering.

### 3. 🧠 Financial Intelligence & Strategic Advisory
- **100% Dynamic Aggregations:** Zero mock/randomized numbers. All savings rates, burnout velocities, and averages compute directly from ledger data.
- **Period Comparison Bar Chart:** Period-by-period side-by-side inflow vs outflow breakdown.
- **Categorical Matrix:** Ranked table with percentage share, entry frequency, and proportional CSS visual progress bars.
- **Heuristic Advisory Suite:** Built-in financial audits including 50/30/20 budget compliance, discretionary expenditure warnings, and emergency capital runway projection.

### 4. 🛡️ Role-Based Access Control (RBAC Simulation)
- **Admin Role:** Full permissions to Add, Edit, Delete, Import, and Reset demo data.
- **Viewer Role:** Safe read-only mode with disabled actions and permission tooltips.

### 5. 🌍 Multi-Currency & Data Portability
- **Instant Currency Switcher:** Toggle between **INR (₹)**, **USD ($)**, **EUR (€)**, and **GBP (£)** with global re-formatting.
- **Export & Backup Engine:** Single-click export to standard CSV (`.csv`) and structured JSON backup (`.json`).
- **One-Click Demo Data Reset:** Instantly load a comprehensive 6-month realistic financial dataset for testing.

---

## 🛠️ Tech Stack & Tooling

| Domain | Technology |
|---|---|
| **Framework & Runtime** | React 19, Vite 8 (Rolldown / ESM) |
| **Styling & Design System** | Tailwind CSS 3.4, PostCSS, Lucide React Icons |
| **Data Visualization** | Recharts 3.8 (AreaCharts, BarCharts, PieCharts) |
| **Micro-Animations** | Framer Motion 12 |
| **Routing & Navigation** | React Router DOM 7 |
| **State & Persistence** | React Context API, Custom Hooks, LocalStorage |
| **Code Quality** | ESLint 9 (Strict Hooks & Refresh Rules), Prettier |

---

## 📁 Architecture & File Structure

```text
src/
├── components/
│   ├── common/
│   │   ├── ConfirmModal.jsx     # Reusable confirmation dialog
│   │   └── Toast.jsx            # Framer-motion floating notification toast
│   ├── dashboard/
│   │   ├── BudgetProgress.jsx   # Budget threshold tracking widget
│   │   ├── CategoryChart.jsx    # Interactive donut expense breakdown
│   │   ├── MetricCards.jsx      # MoM metrics & quick action buttons
│   │   ├── RecentTransactions.jsx # Latest activity stream
│   │   └── TrendChart.jsx       # Cash flow AreaChart with timeframe selector
│   ├── insights/
│   │   └── InsightCards.jsx     # Runway & burnout velocity cards
│   ├── layout/
│   │   ├── Sidebar.jsx          # Collapsible responsive sidebar with RBAC indicator
│   │   └── Topbar.jsx           # Currency switcher, export menu & theme toggle
│   └── transactions/
│       ├── Filters.jsx          # Search, category, date & sort filter bar
│       ├── TransactionModal.jsx # Add/Edit modal with validation
│       └── TransactionTable.jsx # Responsive transaction data grid
├── data/
│   └── defaultData.js           # 6-month seed transactions & categories
├── hooks/
│   └── useFinance.jsx           # Global finance context, CRUD, RBAC, analytics
├── pages/
│   ├── Dashboard.jsx            # Overview analytics page
│   ├── Insights.jsx             # Deep intelligence & advice page
│   └── Transactions.jsx         # Full ledger management page
├── utils/
│   └── formatters.js            # Currency, date, themes & CSV/JSON export
├── App.jsx
├── main.jsx
└── index.css                    # Typography & glassmorphism theme tokens
```

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vinay7376/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local dev server:**
   ```bash
   npm run dev
   ```

4. **Verify production build & linting:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 👨‍💻 Author

**Vinay Pal**  
- **GitHub:** [@vinay7376](https://github.com/vinay7376)  
- **Role:** Frontend Developer / Full Stack Software Engineer  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).