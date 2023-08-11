import BoxingCard from "@/components/bet-boxing/BoxingCard";
import ElectionCard from "@/components/bet-election/ElectionCard";
import React from "react";

const MarketPage = () => {
  return (
    <main className="bg-gradient-to-br py-7 md:py-12 px-3 md:px-6 from-slate-400 to-indigo-800 min-h-[85vh]">
      <h1 className="pb-5 text-zinc-100 text-7xl font-bold leading-normal">
        Market
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-2">
        <BoxingCard />
        <ElectionCard />
      </div>
    </main>
  );
};

export default MarketPage;
