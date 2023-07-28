"use client";

import React, { useState } from "react";

const MODE = {
  BNBUSD: "BNB/USD",
  CAKEUSD: "CAKEUSD",
};

const CoinCurrency: React.FC = () => {
  const [modePage, setmodePage] = useState<string>(MODE.CAKEUSD);

  return (
    <div className="bg-[--colors-backgroundAlt] p-1 px-2 rounded-3xl text-[--colors-text] flex gap-0 items-baseline cursor-pointer flex-col rounded-br-[3rem] w-[120px] justify-center md:flex-row md:items-center md:rounded-br-3xl md:gap-2 md:p-2 md:px-3">
      <div className="text-base font-semibold md:text-lg">{modePage}</div>
    </div>
  );
};

export default CoinCurrency;
