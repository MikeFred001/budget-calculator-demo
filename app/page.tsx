"use client";

import { useEffect, useRef, useState } from "react";
import BrandMonogram from "./components/BrandMonogram";
import Breakdown from "./components/Breakdown";
import BudgetItemPanel from "./components/BudgetItemPanel";
import type { Preferences } from "./components/BudgetItemPanel";
import DebtItemPanel from "./components/DebtItemPanel";
import { demoBudget } from "@/utils/demoBudget";
import { formatCalendarDate, monthlyCents, todayDate } from "@/utils/helpers";

export default function Home() {
  const [budget, updateBudget] = useState(demoBudget);
  const nextId = useRef(
    Math.max(
      ...demoBudget.payments.map(({ id }) => id),
      ...demoBudget.debts.map(({ id }) => id),
    ) + 1,
  );
  const [today, setToday] = useState("");
  const [preferences, setPreferences] = useState<Preferences>({
    split: false,
    budgetItemsSorted: true,
  });

  useEffect(() => {
    const updateDate = () => setToday(todayDate());
    updateDate();
    const timer = window.setInterval(updateDate, 30_000);
    window.addEventListener("focus", updateDate);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", updateDate);
    };
  }, []);

  const expenses = budget.payments.reduce(
    (sum, payment) => sum + monthlyCents(payment.cost, payment.freq),
    0,
  );

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <BrandMonogram size={30} color="currentColor" />
          </span>
          <div>
            <h1>Neon Finance</h1>
            <p>Demo · Changes reset on refresh</p>
          </div>
        </div>
        {today && (
          <time className="dashboard-date" dateTime={today}>
            {formatCalendarDate(today)}
          </time>
        )}
      </header>

      {today ? (
        <>
          <Breakdown
            income={budget.income}
            expenses={expenses}
            onIncome={async (income) => {
              updateBudget((current) => ({ ...current, income }));
            }}
          />
          <BudgetItemPanel
            payments={budget.payments}
            today={today}
            preferences={preferences}
            onPreferences={setPreferences}
            onAdd={async (input) => {
              const payment = { ...input, id: nextId.current++ };
              updateBudget((current) => ({
                ...current,
                payments: [...current.payments, payment],
              }));
            }}
            onDelete={async (id) => {
              updateBudget((current) => ({
                ...current,
                payments: current.payments.filter(
                  (payment) => payment.id !== id,
                ),
              }));
            }}
          />
          <DebtItemPanel
            debts={budget.debts}
            onAdd={async (input) => {
              const debt = { ...input, id: nextId.current++ };
              updateBudget((current) => ({
                ...current,
                debts: [...current.debts, debt],
              }));
            }}
            onEdit={async (debt) => {
              updateBudget((current) => ({
                ...current,
                debts: current.debts.map((entry) =>
                  entry.id === debt.id ? debt : entry,
                ),
              }));
            }}
            onDelete={async (id) => {
              updateBudget((current) => ({
                ...current,
                debts: current.debts.filter((debt) => debt.id !== id),
              }));
            }}
          />
        </>
      ) : null}
    </main>
  );
}
