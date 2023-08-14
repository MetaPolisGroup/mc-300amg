"use client";
import BoxingCard from "@/components/bet-boxing/BoxingCard";
import HistoryBoxingCard from "@/components/bet-boxing/HistoryBoxingCard";
import ElectionCard from "@/components/bet-election/ElectionCard";
import { BOXING_START_DATE } from "@/constants";
import { EMarketTypes } from "@/constants/marketsType";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const MarketPage = () => {
  const { isConnected, address } = useAccount();
  const [userBettedBoxing, setUserBettedBoxing] = useState<IBoxingBetted[]>([]);
  const [boxingData, setBoxingData] = useState<IBoxingData[]>([]);
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterBoxingDate = NOW_IN_MS + BOXING_START_DATE;

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "markets",
      [["epoch", "==", EMarketTypes.BOXING]],
      (docs: DocumentData) => {
        setBoxingData(docs as IBoxingData[]);
      }
    );
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "bets_market",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", EMarketTypes.BOXING],
        ],
        (docs) => {
          setUserBettedBoxing(docs as IBoxingBetted[]);
        }
      );
    }
  }, [isConnected, address]);

  return (
    <main className="bg-gradient-to-br py-7 md:py-12 px-3 md:px-6 from-slate-400 to-indigo-800 min-h-[85vh]">
      <h1 className="pb-5 text-zinc-100 text-7xl font-bold leading-normal">
        Market
      </h1>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-2">
        {boxingData?.[0]?.result !== "Waiting" ? (
          <HistoryBoxingCard userBettedData={userBettedBoxing?.[0]} />
        ) : (
          <BoxingCard targetDate={dateTimeAfterBoxingDate} />
        )}
        <ElectionCard />
        {/* <ElectionCard />
        <BoxingCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard /> */}
      </div>
    </main>
  );
};

export default MarketPage;
