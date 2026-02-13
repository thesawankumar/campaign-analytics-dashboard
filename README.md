

# 📊 Campaign Analytics & Investor Insights Dashboard

> Backend Assessment Project
> Built with **NestJS + TypeScript**
> File-Based Analytics Engine (No Database)

---

# 📌 Project Overview

This project is a modular backend analytics system built using **NestJS**.
It processes structured JSON data for campaigns, investors, transactions, and startups to generate:

* Campaign Performance Analytics
* Investor Behavioral Insights
* Aggregated Analytics Reports
* Chart Visualization URLs

The system follows a clean layered architecture and generates analytics output files inside an `output/` folder.

⚠ No database is used — the system operates entirely using file-based storage as required in the assessment.

---

# 🏗 Architecture Overview

The project follows a **Layered Modular Architecture**.

```
Client (Postman / Swagger)
        ↓
Controllers (HTTP Layer)
        ↓
Services (Business Logic Layer)
        ↓
Helpers & Utilities
        ↓
File System (JSON Storage)
```

---

# 🧩 Modules

| Module   | Responsibility                                 |
| -------- | ---------------------------------------------- |
| Campaign | Campaign analytics & trends                    |
| Investor | Investor insights & segmentation               |
| Reports  | Report generation from precomputed analytics   |
| Charts   | QuickChart URL generation                      |
| Seed     | Data seeding & output file generation          |
| Common   | Shared helpers (file, formula, date utilities) |

---

# 📁 Project Structure

```
src/
 ├── app.module.ts
 ├── main.ts
 ├── common/
 │     ├── helpers/
 │     │     ├── file.helper.ts
 │     │     └── formula.helper.ts
 │     └── utils/
 │           └── date.util.ts
 ├── campaign/
 ├── investor/
 ├── reports/
 ├── charts/
 ├── seed/
output/ (auto-generated)
campaigns.json
investors.json
transactions.json
startups.json
```

---

# 📥 Input Files (Read-Only)

The system reads:

* `campaigns.json`
* `investors.json`
* `transactions.json`
* `startups.json`

⚠ Only transactions with:

```
status = "invested"
```

are used in all calculations.

---

# 📤 Generated Output Files

After running:

```
POST /seed-data
```

The system generates:

| File                           | Records |
| ------------------------------ | ------- |
| output/campaign-analytics.json | 100     |
| output/investor-insights.json  | 100     |
| output/analytics-reports.json  | 100     |

All files are saved inside the `output/` folder.

---

# 📐 Business Logic Implementation

---

## 1️⃣ Campaign Analytics

For each campaign:

* Unique investors count
* Total amount raised
* Average investment
* Funding progress percentage
* Performance score (capped at 100)

### Formula

```
Funding Progress = (total_amount_raised / minimum_amt_commitment) × 100

Investor Component = (total_investors / 50) × 100 (max 100)

Performance Score =
  (FundingProgress × 0.6) +
  (InvestorComponent × 0.4)

Capped at 100
```

---

## 2️⃣ Investor Insights

For each investor:

* Total investments
* Total investment amount
* Average investment
* Preferred sector
* Engagement score
* Investor segment
* Last investment date

### Engagement Score Formula

```
count_component = MIN(total_investments / 10, 1) × 50
amount_component = MIN(total_amount / 1000000, 1) × 50

engagement_score = count_component + amount_component
(max 100)
```

---

### Investor Segmentation

| Condition       | Segment    |
| --------------- | ---------- |
| ≥ 5,000,000     | Whale      |
| ≥ 5 investments | Regular    |
| ≥ 2 investments | Occasional |
| Else            | New        |

---

## 3️⃣ Analytics Reports

Reports are generated from precomputed analytics files:

* Campaign Reports
* Investor Reports

Includes:

* Date filtering
* Aggregated totals
* Summary data
* Report metadata

This simulates real-world reporting pipelines using pre-aggregated datasets.

---

# 🚀 How To Run

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Start Development Server

```bash
npm run start:dev
```

Server runs at:

```
http://localhost:3000
```

---

Includes:

* All 10 endpoints
* Request body examples
* Parameter documentation
* Try-it-out feature

---

# 🌱 Generate Sample Data

Call:

```
POST /seed-data
```

This will:

* Create `output/` folder if not exists
* Generate 100 campaign analytics records
* Generate 100 investor insights records
* Generate 100 analytics reports

---

# 📡 API Endpoints

---

## 🟢 Campaign APIs

| Method | Endpoint                                                  |
| ------ | --------------------------------------------------------- |
| GET    | `/campaign-analytics/campaign/:campaignId`                |
| GET    | `/campaign-analytics/campaign/:campaignId/trends?days=30` |
| POST   | `/campaign-analytics/campaign/:campaignId/calculate`      |

---

## 🟢 Investor APIs

| Method | Endpoint                                             |
| ------ | ---------------------------------------------------- |
| GET    | `/campaign-analytics/investor/:investorId`           |
| GET    | `/campaign-analytics/investors/top?limit=10`         |
| POST   | `/campaign-analytics/investor/:investorId/calculate` |

---

## 🟢 Reports APIs

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/reports/generate`  |
| GET    | `/reports/:reportId` |

---

## 🟢 Charts API

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/charts/generate` |

---

## 🟢 Seed API

| Method | Endpoint     |
| ------ | ------------ |
| POST   | `/seed-data` |

---

# 🧪 Testing

Run unit tests:

```bash
npm run test
```

Run coverage:

```bash
npm run test:cov
```

Target coverage: 60%+

---

# 📊 Example Campaign Output

```json
{
  "id": 1,
  "campaign_id": 1,
  "analytics_date": "2026-01-15",
  "total_investors": 25,
  "total_amount_raised": 2500000,
  "average_investment_amount": 100000,
  "funding_progress_percentage": 50,
  "campaign_performance_score": 72
}
```

---

# 🧠 Design Decisions

### ✔ Clean Modular Architecture

Each domain isolated into its own module.

### ✔ DRY Principle

SeedService reuses CampaignService & InvestorService.

### ✔ File Abstraction Layer

FileHelper centralizes file read/write logic.

### ✔ Defensive Programming

* Division by zero handled
* Scores capped at 100
* Null-safe access
* Folder auto-creation

### ✔ Production-Ready Structure

Controllers → Services → Helpers separation maintained.



# 📌 Assessment Compliance

✔ All formulas implemented exactly as specified
✔ Only `status = "invested"` transactions used
✔ 100 records generated per output file
✔ Output stored inside `output/` folder
✔ 12 endpoints implemented
✔ Swagger documentation added
✔ Tests included
✔ Follows NestJS best practices

---

# 👨‍💻 Author

**Sawan Kumar**
Backend Developer | Full Stack Engineer

---

# 🏆 Final Statement

This project demonstrates:

* Backend architecture design
* Modular NestJS implementation
* Financial analytics calculations
* Investor behavioral modeling
* File-based data processing
* Clean code principles
* Professional API documentation
* Assessment-grade compliance

