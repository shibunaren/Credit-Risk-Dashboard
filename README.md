![Screenshot 2025-04-23 at 4 42 01 PM](https://github.com/user-attachments/assets/d3689047-a77d-463a-8b98-2137ec7aee80)# Credit Risk & Financial Insights Dashboard


Live Demo  [credit-risk-dashboard-e5o55agrt-shibunarens-projects.vercel.app](https://credit-risk-dashboard-e5o55agrt-shibunarens-projects.vercel.app)

##  Overview
This dashboard provides interactive visualizations and insights into customers’ financial health and credit risk for fintech platforms. Built using **React**, **TypeScript**, **Ant Design**, and **Recharts**, it enables risk officers to make informed decisions.

## Tech Stack
- **Frontend**: React, TypeScript, Ant Design, Recharts
- **State Management**: React Hooks (`useState`, `useEffect`)
- **AI Tools Used**: ChatGPT, GitHub Copilot

## Features
- **Dashboard Overview**
  - Financial metrics cards (income, expenses, account balance)
  - Line chart: Income vs Expenses over time
  - Pie chart: Risk score distribution
  - Sortable, filterable customer table

- **Risk Assessment & Scoring**
  - Custom risk score algorithm
  - Visual scoring with AntD Progress & color codes
  - Alerts for high-risk customers (score > 70)

- **Workflow Automation**
  - Status update via dropdown (`Review`, `Approved`, `Rejected`)
  - UI-only state persistence (no backend required)

- **Extras**
  - Responsive design
  - Dark mode toggle
  - Search and filter in customer table

##  Risk Scoring Logic
The risk score is calculated using a simple weighted formula:
- Higher outstanding loans relative to income → higher risk.
- More missed repayments → higher risk.
- Lower credit score → higher risk.
If risk score > 70, the user is flagged as **high risk**.

## AI Tools Usage
### ChatGPT
- Used to design risk scoring formula.
- Helped debug logic in risk assessment component.
- Guided structure for README and video script.

### GitHub Copilot
- Assisted with:
  - Code scaffolding (e.g., customer table layout)
  - Autocomplete for Ant Design components
  - Writing tests and handling edge cases


## UI Preview
Screenshot 2025-04-23 at 4.42.01 PM.png
Screenshot 2025-04-23 at 4.42.36 PM.png
Screenshot 2025-04-23 at 4.42.52 PM.png


