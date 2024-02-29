"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbCategory2 } from "react-icons/tb";
import { LuLayoutList } from "react-icons/lu";

import { MdMoneyOff } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";

export default function Page() {
  const [expenses, setExpenses] = useState([]);
  const [timeline, setTimeline] = useState("this month");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const filterExpensesByTimeline = (expenses, timeline) => {
    const currentDate = new Date();
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(currentDate.getDate() - 60);

    switch (timeline) {
      case "this month":
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === currentDate.getMonth() &&
            expenseDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "last month":
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        const lastMonthEndDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate >= lastMonthDate && expenseDate <= lastMonthEndDate
          );
        });
      case "last 60 days":
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= sixtyDaysAgo && expenseDate <= currentDate;
        });
      default:
        return expenses;
    }
  };

  useEffect(() => {
    let expensesJSON = localStorage.getItem("expenses");
    expensesJSON = JSON.parse(expensesJSON);
    if (expensesJSON) {
      const filteredExpenses = filterExpensesByTimeline(
        expensesJSON,
        timeline
      ).sort((a, b) => new Date(b.date) - new Date(a.date));

      const totalFilteredExpenses = filteredExpenses.reduce(
        (total, expense) => total + parseInt(expense.amount),
        0
      );

      setTotalExpenses(totalFilteredExpenses);

      const uniqueCategories = new Set();
      filteredExpenses.forEach((expense) => {
        expense.category.forEach((cat) => uniqueCategories.add(cat));
      });

      setCategories(Array.from(uniqueCategories));

      setExpenses(filteredExpenses);
    }

    setIsLoading(false);
  }, [timeline]);

  return (
    <>
      <header className="flex justify-between items-center py-4 px-[clamp(1rem,5vw,2rem)] lg:px-[clamp(1rem,20vw,24rem)]">
        <h1 className="text-2xl font-black">Home</h1>
        <select
          className="bg-black text-white font-semibold p-2 rounded-md outline-none border-r-4 border-r-black"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        >
          <option value="this month">This Month</option>
          <option value="last month">Last Month</option>
          <option value="last 60 days">Last 60 Days</option>
        </select>
      </header>

      {isLoading ? (
        <p className="text-center p-4">Loading</p>
      ) : (
        <main className="space-y-5 px-[clamp(1rem,5vw,2rem)] lg:px-[clamp(1rem,20vw,24rem)]">
          <section className="bg-blue-950 text-white flex flex-col justify-start items-start gap-2 p-5 rounded-2xl">
            <p>
              {timeline.charAt(0).toUpperCase() + timeline.slice(1)} expenses:
            </p>
            <span className="font-black text-4xl">${totalExpenses}</span>
          </section>
          <section className="space-y-5">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Expenses</h2>
            </div>
            {showCategories == false ? (
              <div className="space-y-5">
                {expenses &&
                  expenses.map((expense, index) => (
                    <div
                      className="flex justify-start items-center gap-4 p-4 rounded-xl bg-sky-50"
                      key={index}
                    >
                      <MdMoneyOff size={30} />
                      <div className="flex flex-col grow justify-center items-start">
                        <h3 className="text-xl font-bold">{expense.name}</h3>
                        <p className="font-medium text-gray-500">
                          {formatDate(expense.date)}
                        </p>
                      </div>
                      <div className="text-xl font-bold">${expense.amount}</div>
                    </div>
                  ))}
                <div className=""></div>
              </div>
            ) : (
              <div className="space-y-5">
                {categories.map((category, index) => (
                  <Link
                    href={`/expenses/${category.value}`}
                    key={index}
                    className="flex justify-start items-center gap-4 p-4 rounded-xl bg-sky-50"
                  >
                    <CiHashtag size={30} />
                    <h3 className="text-xl font-bold grow">{category.value}</h3>
                    <div className="text-xl font-bold">
                      {/* ${calculateTotalExpensesByCategory(category)} */}
                      200
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
          <Link
            href="/expenses/new"
            className="fixed bottom-7 right-7 bg-white flex justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full w-16 h-16"
          >
            <IoAdd size={40} />
          </Link>
        </main>
      )}
    </>
  );
}
