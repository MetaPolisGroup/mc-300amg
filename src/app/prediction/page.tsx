"use client";
import CoinCurrency from "@/components/CoinCurrency";
import CountDown from "@/components/CountDown";
import SubNav from "@/components/SubNav";
import Card from "@/components/bet/Card";
import DrawerHistory from "@/components/drawer-history/DrawerHistory";
import clsx from "clsx";
import React, { useState } from "react";

const Prediction = () => {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);

  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2] overflow-hidden">
      <div className="flex overflow-hidden">
        <div
          className={clsx(
            "overflow-hidden",
            isShowDrawer ? "w-[0px] lg:w-[calc(100%-385px)]" : "w-[100%]"
          )}
        >
          <div className="text-[--colors-failure] p-4">
            <div className="flex flex-nowrap justify-between">
              <CoinCurrency />
              <CountDown min={5} title="5m" onAction={{ setIsShowDrawer }} />
            </div>
          </div>
          <Card />
        </div>
        <DrawerHistory open={isShowDrawer} onClose={setIsShowDrawer} />
      </div>
      <SubNav isShowHistory={isShowDrawer} onShowHistory={setIsShowDrawer} />
    </main>
  );
};

export default Prediction;
