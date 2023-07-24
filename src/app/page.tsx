"use client";
import { useEffect, useState } from "react";
import CountDown from "@/components/CountDown";
import CoinCurrency from "@/components/CoinCurrency";
import DrawerHistory from "@/components/drawer-history/DrawerHistory";
import Card from "@/components/bet-bo/Card";
import SubNav from "@/components/SubNav";
import clsx from "clsx";
import { DocumentData } from "firebase/firestore";

export default function Home() {
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
}
