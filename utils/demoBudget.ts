import type { Debt, Payment } from "./helpers";

const payments: Payment[] = [
  {
    id: 1,
    name: "Rent",
    cost: 1200.0,
    freq: "Monthly",
    startDate: "2023-01-01",
  },
  {
    id: 2,
    name: "utilities",
    cost: 200.27,
    freq: "Monthly",
    startDate: "2024-01-11",
  },
  {
    id: 3,
    name: "car insurance",
    cost: 1200.0,
    freq: "Yearly",
    startDate: "2025-02-22",
  },
  {
    id: 4,
    name: "gym membership",
    cost: 250.55,
    freq: "Yearly",
    startDate: "2022-06-15",
  },
  {
    id: 5,
    name: "groceries",
    cost: 200.0,
    freq: "BiWeekly",
    startDate: "2023-12-10",
  },
  {
    id: 6,
    name: "spotify",
    cost: 10.99,
    freq: "BiWeekly",
    startDate: "2025-01-31",
  },
];

const debts: Debt[] = [
  {
    id: 1,
    name: "Credit Card",
    amount: 5000.0,
  },
  {
    id: 2,
    name: "Student Loan",
    amount: 14800.5,
  },
  {
    id: 3,
    name: "Car Loan",
    amount: 9987.23,
  },
];

export const demoBudget = { payments, debts, income: 5000 };
