"use client";
import CoinCurrency from "@/components/CoinCurrency";
import CountDown from "@/components/CountDown";
import SubNav from "@/components/SubNav";
import Card from "@/components/bet-bo/Card";
import ClaimModal from "@/components/bet-bo/ClaimModal";
import Chart from "@/components/chart/Chart";
import DrawerHistory from "@/components/drawer-history/DrawerHistory";
import Popup, { PopupRef } from "@/components/ui/Modal";
import clsx from "clsx";
import React, { createRef, useState } from "react";

const Prediction = () => {
  const collectWinningsRef = createRef<PopupRef>();
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
  const [collectWinning, setCollectWinning] = useState<number>();

  const handlerToggleCollectWinning = (status: boolean, round: number) => {
    setCollectWinning(round);

    if (status === true) {
      return collectWinningsRef.current?.open();
    }
    return collectWinningsRef.current?.close();
  };

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
              <CountDown title="5m" onAction={{ setIsShowDrawer }} />
            </div>
          </div>
          <Card />
          <Chart />
        </div>
        <DrawerHistory
          open={isShowDrawer}
          onClose={setIsShowDrawer}
          onCollect={handlerToggleCollectWinning}
        />
      </div>
      <SubNav isShowHistory={isShowDrawer} onShowHistory={setIsShowDrawer} />

      <Popup
        ref={collectWinningsRef}
        width={300}
        footer={false}
        closable
        title="Collect Winnnings"
        styleContent={{
          background: "var(--colors-backgroundAlt)",
          color: "var(--colors-text)",
        }}
        content={
          <ClaimModal
            winningRound={collectWinning}
            onCancel={() => {
              handlerToggleCollectWinning(false, 0);
            }}
          />
        }
      />
    </main>
  );
};

export default Prediction;
