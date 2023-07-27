"use client";
import CoinCurrency from "@/components/CoinCurrency";
import CountDown from "@/components/CountDown";
import SubNav, { MODE } from "@/components/SubNav";
import Card from "@/components/bet-bo/Card";
import ClaimModal from "@/components/bet-bo/ClaimModal";
import Chart from "@/components/chart/Chart";
import DrawerHistory from "@/components/drawer-history/DrawerHistory";
import Popup, { PopupRef } from "@/components/ui/Modal";
import clsx from "clsx";
import React, { createRef, useEffect, useState } from "react";

const Prediction = () => {
  const [modeSubNavMobile, setModeSubNavMobile] = useState<string>(MODE.CHART);

  const collectWinningsRef = createRef<PopupRef>();
  const [collectWinning, setCollectWinning] = useState<number>();

  const isScreenMoblie = 1024 > screen.width;
  const isShowDrawer = modeSubNavMobile === MODE.HISTORY;

  useEffect(() => {
    let timeSet = setTimeout(() => {
      if (!isScreenMoblie) return;

      return setModeSubNavMobile(MODE.CARD);
    }, 1000);

    return () => {
      clearTimeout(timeSet);
    };
  }, [isScreenMoblie]);

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
              <CountDown
                title="5m"
                onAction={{
                  setIsShowDrawer: () => {
                    setModeSubNavMobile(MODE.HISTORY);
                  },
                }}
              />
            </div>
          </div>

          <div
            className={clsx(
              modeSubNavMobile !== MODE.CARD && isScreenMoblie && "hidden"
            )}
          >
            <Card />
          </div>

          <div
            className={clsx(
              modeSubNavMobile !== MODE.CHART && isScreenMoblie && "hidden"
            )}
          >
            <Chart />
          </div>
        </div>
        <DrawerHistory
          open={isShowDrawer}
          onClose={() => setModeSubNavMobile(MODE.CARD)}
          onCollect={handlerToggleCollectWinning}
        />
      </div>
      <SubNav modeMobile={modeSubNavMobile} onAction={setModeSubNavMobile} />

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
