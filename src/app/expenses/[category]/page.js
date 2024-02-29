"use client";
import { TbCategory2 } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { MdMoneyOff } from "react-icons/md";

export default function Page({ params }) {
  return (
    <>
      <header className="flex justify-start items-center gap-3 py-5  px-[clamp(1rem,5vw,2rem)] lg:px-[clamp(1rem,5vw,4rem)] pl-2">
        <button onClick={() => history.back()}>
          <IoIosArrowBack size={35} />
        </button>
        <h1 className="text-2xl font-extrabold capitalize">
          {params.category} Expenses
        </h1>
      </header>
      <main className="space-y-5 px-[clamp(1rem,5vw,2rem)] lg:px-[clamp(1rem,5vw,4rem)]">
        <section className="space-y-5">
          <select className="bg-black text-white font-semibold p-2 rounded-md outline-none border-r-4 border-r-black">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 60 Days</option>
          </select>
          <div className="space-y-5">
            <div className="flex justify-start items-center gap-4 p-4 rounded-xl bg-sky-50">
              <MdMoneyOff size={30} />
              <div className="flex flex-col grow justify-center items-start">
                <h3 className="text-xl font-bold">Bought wheat</h3>
                <p className="font-medium text-gray-500">Diet</p>
              </div>
              <div className="text-xl font-bold">$4.99</div>
            </div>
            <div className="flex justify-start items-center gap-4 p-4 rounded-xl bg-sky-50">
              <MdMoneyOff size={30} />
              <div className="flex flex-col grow justify-center items-start">
                <h3 className="text-xl font-bold">Bought wheat</h3>
                <p className="font-medium text-gray-500">Diet</p>
              </div>
              <div className="text-xl font-bold">$4.99</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
