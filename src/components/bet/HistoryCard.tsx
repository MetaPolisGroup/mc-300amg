import React, { createRef, useEffect, useState } from "react";
import { Icons } from "../Icons";
import Button from "../ui/Button";
import { publicClient } from "@/lib/contract-config";
import { CONSTANTS } from "@/constants";

interface IHistoryProps {
  currentRound: string;
  showCollectWinningModal?: (status: boolean, round: string) => void;
}

const HistoryCard: React.FC<IHistoryProps> = ({
  currentRound,
  showCollectWinningModal,
}) => {
  useEffect(() => {
    if (+currentRound > 0) {
      getHistoryRound();
    }
  }, [currentRound]);

  const getHistoryRound = async () => {
    const data = await publicClient.readContract({
      address: CONSTANTS.ADDRESS.PREDICTION,
      abi: CONSTANTS.ABI.PREDICTION,
      functionName: "rounds",
      args: [currentRound],
    });
    if (data) {
      console.log({ data });
      // setHistoryRound(data.toString());
    }
  };

  return (
    <React.Fragment>
      <div className={`w-full flex justify-center items-center relative`}>
        <div
          className={
            "card z-20 w-80 bg-[--colors-backgroundAlt] group shadow-xl transition-all hover:opacity-100"
          }
        >
          <div className="flex justify-between items-center opacity-70 bg-[--colors-cardBorder] h-9 p-2 rounded-t-2xl group-hover:opacity-100">
            <div className="flex items-center gap-2">
              <Icons.Ban className="text-[--colors-textDisabled]" />
              <span className="text-[--colors-textDisabled]">Expired</span>
            </div>
            <div className="text-[--colors-textDisabled]">#{currentRound}</div>
          </div>

          <div className="card-body p-4 opacity-70 group-hover:opacity-100">
            {/* {!isEmpty(dataBetted) &&
            (dataBetted?.status === "UP" ? (
              <div className="absolute flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                <Icons.CheckCircle className="text-[--colors-text]" />
                <span className="text-[--colors-secondary]">ENTERED</span>
              </div>
            ) : null)} */}
            <div className="relative -mb-[0.55rem]">
              <div className="h-16 mx-auto w-60">
                <Icons.PayoutUpSuccess />
                <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                  <div
                    className={`text-[--colors-white] font-semibold uppercase text-xl`}
                  >
                    UP
                  </div>
                  <div className="text-[--colors-white] font-semibold text-sm">
                    1.41x Payout
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-[--colors-success] to-[--colors-success] p-[2px]">
              <div className="bg-[--colors-backgroundAlt] rounded-xl p-4 flex flex-col gap-1">
                <div className="text-[--colors-textSubtle] font-semibold text-xs uppercase mb-2">
                  Last Price
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className={`text-[--colors-success] font-semibold text-2xl min-h-[36px]`}
                  >
                    $257.5794
                  </div>
                  <div
                    className={`flex gap-1 justify-center items-center bg-[--colors-success] py-1 px-2 rounded`}
                  >
                    <Icons.ArrowDown className="text-[--colors-white] rotate-180" />
                    <span className="text-[--colors-white] font-medium text-base uppercase ml-1">
                      $0.1508
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[--colors-text]">
                  <span className="font-medium text-sm">Locked Price:</span>
                  <span className="font-medium text-sm">$0.00005</span>
                </div>
                <div className="flex items-center justify-between text-[--colors-text] font-semibold text-base">
                  <span>Prize Pool:</span>
                  <span>0.00005 BNB</span>
                </div>
              </div>
            </div>
            <div className="relative -mt-[0.55rem]">
              <div className="h-16 mx-auto w-60">
                <Icons.PayoutDown />
                <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                  <div className="text-[--colors-textSubtle] font-semibold text-sm">
                    1.41x Payout
                  </div>
                  <div className="text-[--colors-failure] font-semibold uppercase text-xl">
                    DOWN
                  </div>
                </div>
              </div>
            </div>
            {/* {!isEmpty(dataBetted) &&
            (dataBetted?.status === "DOWN" ? (
              <div className="absolute right-0 bottom-2 flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                <Icons.CheckCircle className="text-[--colors-text]" />
                <span className="text-[--colors-secondary]">ENTERED</span>
              </div>
            ) : null)} */}
          </div>
          <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100">
            <Icons.TrophyIcon className="text-[--colors-gold]" />
            <Button
              className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
              onClick={() => {
                if (showCollectWinningModal)
                  showCollectWinningModal(true, currentRound);
              }}
            >
              Collect Winnings
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HistoryCard;
