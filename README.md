Bilkul bhai 🔥
Ab main tumhe **real-world, professional, recruiter-impressing README.md** bana ke de raha hoon — jo sirf assessment pass karne ke liye nahi, balki production-grade project jaisa lage.

Ye README tum directly copy-paste karke GitHub me daal sakte ho.

---

# 📊 Campaign Analytics & Investor Insights Dashboard

> Backend Assessment Project
> Built with NestJS + TypeScript
> File-Based Analytics System (No Database)

---

## 📌 Project Overview

This project is a modular backend system built using **NestJS** that processes campaign, investor, and transaction data from JSON files and generates analytics insights and summary reports.

The system:

* Reads structured input JSON files
* Applies financial and engagement formulas
* Generates 3 analytics output files
* Exposes REST APIs for analytics, reports, and charts
* Follows clean architecture and modular design

No database is used — the entire system operates on file-based storage as required.

---

# 🏗 Architecture Overview

The system follows a **layered modular architecture**:

```
Client
   ↓
Controllers (HTTP Layer)
   ↓
Services (Business Logic Layer)
   ↓
Helpers (Reusable Utilities)
   ↓
JSON Storage (File-Based Data Layer)
```

### 🧩 Modules

* Campaign Module
* Investor Module
* Reports Module
* Charts Module
* Seed Module
* Common (Helpers & Utilities)

---

# 📁 Folder Structure

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
output/ (generated automatically)
campaigns.json
investors.json
transactions.json
startups.json
```

---

# 📥 Input Data (Read-Only)

The system reads the following files:

* `campaigns.json`
* `investors.json`
* `transactions.json`
* `startups.json`

⚠ Only transactions with `status = "invested"` are used in calculations.

---

# 📤 Generated Output Files

After running the seed endpoint, the following files are generated inside the `output/` folder:

| File                    | Records |
| ----------------------- | ------- |
| campaign-analytics.json | 100     |
| investor-insights.json  | 100     |
| analytics-reports.json  | 100     |

---

# 📐 Implemented Business Logic

## 1️⃣ Campaign Analytics

For each campaign:

* Total unique investors
* Total amount raised
* Average investment
* Funding progress percentage
* Performance score (capped at 100)

Formula:

```
Performance = (FundingProgress × 0.6) + (InvestorComponent × 0.4)
```

---

## 2️⃣ Investor Insights

For each investor:

* Total investments
* Total invested amount
* Preferred sector
* Engagement score
* Investor segment
* Last investment date

Segmentation:

| Condition       | Segment    |
| --------------- | ---------- |
| ≥ 5,000,000     | Whale      |
| ≥ 5 investments | Regular    |
| ≥ 2 investments | Occasional |
| Else            | New        |

---

## 3️⃣ Analytics Reports

Reports are built from precomputed analytics files.

Two types:

* Campaign Reports
* Investor Reports

Reports include:

* Date range filtering
* Aggregated totals
* Summary statistics

This simulates real-world reporting pipelines using pre-aggregated data.

---

# 🚀 How To Run

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Start Development Server

```bash
npm run start:dev
```

Server runs on:

```
http://localhost:3000
```

---

# 🌱 Generate Analytics Files

Call:

```
POST /seed-data
```

This will:

* Create `output/` folder (if not exists)
* Generate 100 campaign analytics
* Generate 100 investor insights
* Generate 100 analytics reports

---

# 📡 API Endpoints

## Campaign

```
GET /campaign-analytics/campaign/:campaignId
```

## Investor

```
GET /campaign-analytics/investor/:investorId
```

## Reports

```
POST /reports/generate
GET  /reports/:reportId
```

## Charts

```
POST /charts/generate
```

## Seed

```
POST /seed-data
```


---

| Method | Endpoint                                   | Description                     |
| ------ | ------------------------------------------ | ------------------------------- |
| GET    | `/campaign-analytics/campaign/:campaignId` | Get campaign analytics          |
| GET    | `/campaign-analytics/investor/:investorId` | Get investor insights           |
| POST   | `/reports/generate`                        | Generate report by date range   |
| POST   | `/charts/generate`                         | Generate QuickChart URL         |
| POST   | `/seed-data`                               | Generate analytics output files |


# 🧠 Design Decisions

### ✔ Modular Architecture

Each domain is isolated into its own module.

### ✔ Separation of Concerns

* Controllers → HTTP layer
* Services → Business logic
* Helpers → Reusable utilities

### ✔ DRY Principle

SeedService reuses CampaignService and InvestorService.

### ✔ Scalable Structure

The architecture is database-ready. JSON storage can be replaced with PostgreSQL without changing controllers.

### ✔ Edge Case Handling

* Division by zero handled
* Scores capped at 100
* Missing sector defaults to "General"
* Null-safe mapping

---

# 🧪 Testing

Run:

```bash
npm run test
npm run test:cov
```

Target coverage: 60%+

---

# 📊 Example Output Record

### Campaign Analytics

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

# 🔮 Future Improvements

If this were production:

* Replace JSON with PostgreSQL
* Add Redis caching
* Add background jobs for report generation
* Add authentication & authorization
* Add pagination for large datasets
* Add structured logging and monitoring

---

# 📌 Submission Notes

* All formulas implemented exactly as specified
* Only `status = "invested"` transactions used
* 100 records generated per output file
* Output saved in `output/` folder
* Clean Git commit structure followed
* Code adheres to NestJS best practices

---

# 👨‍💻 Author

Sawan Kumar
Backend Developer
Full Stack Engineer

---

# 🏆 Final Statement

This project demonstrates:

* Backend architecture design
* Modular NestJS implementation
* Financial metric calculations
* File-based data processing
* Clean code principles
* Production-ready structure


