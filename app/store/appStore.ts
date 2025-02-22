import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const exampleBudgetItems = [
  {
    id: 1,
    name: "Rent",
    cost: 1200.0,
    freq: "Monthly",
    startDate: "2023-01-01T12:00:00Z",
  },
  {
    id: 2,
    name: "utilities",
    cost: 200.27,
    freq: "Monthly",
    startDate: "2024-01-11T12:00:00Z",
  },
  {
    id: 3,
    name: "car insurance",
    cost: 1200.0,
    freq: "Yearly",
    startDate: "2025-02-22T12:00:00Z",
  },
  {
    id: 4,
    name: "gym membership",
    cost: 250.55,
    freq: "Yearly",
    startDate: "2022-06-15T12:00:00Z",
  },
  {
    id: 5,
    name: "groceries",
    cost: 200.0,
    freq: "BiWeekly",
    startDate: "2023-12-10T12:00:00Z",
  },
  {
    id: 6,
    name: "Utilities",
    cost: 150.0,
    freq: "Monthly",
    startDate: "2025-01-31T12:00:00Z",
  },
];

const exampleDebtItems = [
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

const storage =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : undefined;

interface IAppState {
  budgetItems: IBudgetItem[];
  debtItems: IDebtItem[];
  monthlyIncome: number;
  split: boolean;
  budgetItemsSorted: boolean;
  editingIncome: boolean;
  addingDebtItem: boolean;
  addingBudgetItem: "Default" | "BiWeekly" | "Monthly" | "Yearly" | "";
  nearestPaymentDate?: string;
  loading: boolean;
  setAppState: (payload: Partial<IAppState>) => void;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}

const useAppStore = create<IAppState>()(
  persist(
    (set) => ({
      budgetItems: exampleBudgetItems,
      debtItems: exampleDebtItems,
      monthlyIncome: 5000,
      split: false,
      budgetItemsSorted: false,
      editingIncome: false,
      addingDebtItem: false,
      addingBudgetItem: "",
      nextPaymentDate: "",
      loading: true,
      setAppState: (payload) => set((state) => ({ ...state, ...payload })),
    }),
    {
      name: "app-storage",
      storage,
    }
  )
);

export default useAppStore;
