"use client";

import React, { useState } from "react";

const MODE = {
  BNBUSD: "BNBUSD",
  CAKEUSD: "CAKEUSD",
};

const CoinCurrency: React.FC = () => {
  const [modePage, setmodePage] = useState<string>(MODE.CAKEUSD);

  const handleChangeMode = () => {
    if (modePage === MODE.BNBUSD) return setmodePage(MODE.CAKEUSD);

    return setmodePage(MODE.BNBUSD);
  };

  return (
    <div
      className="bg-[--colors-backgroundAlt] p-1 px-2 rounded-3xl text-[--colors-light-white] flex gap-0 items-baseline cursor-pointer flex-col rounded-br-[3rem] w-[120px] md:w-[170px] md:flex-row md:items-center md:rounded-br-3xl md:gap-2 md:p-2 md:px-3"
      onClick={handleChangeMode}
    >
      <div className="text-base font-semibold md:text-lg">{modePage}</div>
      <div className="text-xs">
        ${modePage === MODE.BNBUSD ? 246.8781 : 1.5122}
      </div>
    </div>
  );
};

export default CoinCurrency;
