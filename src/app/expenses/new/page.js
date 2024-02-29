"use client";
import { IoIosArrowBack } from "react-icons/io";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";

export default function Page() {
  const [expense, setExpense] = useState({
    amount: 0,
    name: "",
    note: "",
    category: [],
    date: new Date().toISOString().split("T")[0],
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const expensesJSON = localStorage.getItem("expenses");
    const expenses = expensesJSON ? JSON.parse(expensesJSON) : [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    alert("Your expense has been added");
  };

  const options = [
    { value: "Groceries", label: "Groceries" },
    { value: "Dining", label: "Dining" },
    { value: "Transportation", label: "Transportation" },
    { value: "Housing", label: "Housing" },
    { value: "Utilities", label: "Utilities" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Health", label: "Health" },
    { value: "Shopping", label: "Shopping" },
    { value: "Travel", label: "Travel" },
    { value: "Education", label: "Education" },
    { value: "Personal", label: "Personal" },
    { value: "Debts", label: "Debts" },
    { value: "Insurance", label: "Insurance" },
    { value: "Gifts", label: "Gifts" },
    { value: "Savings", label: "Savings" },
  ];

  return (
    <>
      <header className="flex justify-start items-center gap-3 py-5 mb-4 px-[clamp(1rem,5vw,2rem)] lg:px-[clamp(1rem,5vw,4rem)] pl-2">
        <button onClick={() => history.back()}>
          <IoIosArrowBack size={35} />
        </button>
        <h1 className="text-2xl font-extrabold">Add Expense</h1>
      </header>
      <main className="space-y-5 px-[clamp(1rem,5vw,2rem)] lg:px-[clamp(1rem,5vw,4rem)]">
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <label className="font-semibold">Amount</label>
            <input
              type="Number"
              placeholder="$0"
              className="w-full border border-gray-200 p-4 rounded-md outline-none"
              name="amount"
              required
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter expense name"
              className="w-full border border-gray-200 p-4 rounded-md outline-none"
              name="name"
              value={expense.name}
              required
              onChange={(e) => setExpense({ ...expense, name: e.target.value })}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label className="font-semibold">Category</label>
            <CreatableSelect
              isMulti
              isClearable
              options={options}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: ".7rem",
                  border: "1px solid #e5e7eb",
                }),
              }}
              onChange={(e) => setExpense({ ...expense, category: e })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Note</label>
            <textarea
              placeholder="Write a note"
              className="w-full border border-gray-200 p-4 rounded-md outline-none"
              value={expense.note}
              onChange={(e) => setExpense({ ...expense, note: e.target.value })}
            ></textarea>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Date</label>
            <input
              type="date"
              placeholder="Enter expense name"
              className="bg-white w-full p-4 border border-gray-200 rounded-md outline-none"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              required
            />
          </div>
          <button className="bg-blue-500 text-white w-full p-4 font-bold rounded-md hover:bg-blue-400">
            Add
          </button>
        </form>
      </main>
    </>
  );
}
