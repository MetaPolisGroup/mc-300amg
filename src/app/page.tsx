"use client";

import { useState } from "react";

import CountDown from "@/components/CountDown";
import BetCard from "@/components/bet/BetCard";
import CoinCurrency from "@/components/CoinCurrency";
import DrawerHistory from "@/components/DrawerHistory";

export default function Home() {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);

  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2]">
      <div className="flex">
        <div
          style={
            isShowDrawer ? { width: "calc(100% - 385px)" } : { width: "100%" }
          }
        >
          <div className="text-[--colors-failure] p-4">
            <div className="flex flex-nowrap justify-between">
              <CoinCurrency />
              <CountDown min={5} title="5m" onAction={{ setIsShowDrawer }} />
            </div>
          </div>
          <BetCard />
        </div>

        {/* <DrawerHistory open={isShowDrawer} onClose={setIsShowDrawer} /> */}
      </div>
    </main>
  );
}
