import React from "react";

import dayjs from "dayjs";

interface IHeaderChart {
  time: string;
  price: number;
}

const HeaderChart: React.FC<IHeaderChart> = ({ time, price }) => {
  const data = new Date();
  return (
    <div className="flex items-center gap-3 pt-5 px-3">
      <div className="flex items-center gap-2">
        <div className="text-[40px] text-[--colors-text] font-bold">
          {price}
        </div>
        <div className="text-xl font-bold text-[--colors-textSubtle]">
          BNB/USD
        </div>
      </div>

      {time ? (
        <div className="text-[--colors-textSubtle]">
          {dayjs(data).format("MMMM D, YYYY")} {time}
        </div>
      ) : null}
    </div>
  );
};

export default HeaderChart;
