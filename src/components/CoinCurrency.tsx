"use client";
import React from "react";

const CoinCurrency: React.FC = () => {
  return (
    <div className="bg-[--colors-backgroundAlt] p-1 px-2 rounded-3xl text-[--colors-text] flex gap-0 items-baseline cursor-pointer flex-col rounded-br-[3rem] w-[120px] justify-center md:flex-row md:items-center md:rounded-br-3xl md:gap-2 md:p-2 md:px-3">
      <div className="text-base font-semibold md:text-lg">BNB/USD</div>
    </div>
  );
};

export default CoinCurrency;
