import React, { useEffect } from "react";
import { Icons } from "../Icons";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { isEmpty } from "lodash";
import Button from "../ui/Button";

interface ICancelCard {
  historyRound: number;
  historyBetted: IHistory;
  showCollectWinningModal?: (
    status: boolean,
    title: string,
    round: number
  ) => void;
}

const CancelCard: React.FC<ICancelCard> = ({
  historyRound,
  historyBetted,
  showCollectWinningModal,
}) => {
  return (
    <div className={`w-full flex justify-center items-center relative`}>
      <div className={"card z-20 w-80 bg-[--colors-backgroundAlt] shadow-xl"}>
        <div className="flex justify-between items-center bg-[--colors-gold] h-9 p-2 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.Ban className="text-[--colors-white]" />
            <span className="text-[--colors-white]">Cancelled</span>
          </div>
          <div className="text-[--colors-white] text-xs">#{historyRound}</div>
        </div>

        <div className="card-body p-4">
          <div className="relative -mb-[0.55rem]">
            <div className="h-16 mx-auto w-60">
              <Icons.PayoutUp />
              <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                <div
                  className={`text-[--colors-textDisabled] font-semibold uppercase text-xl`}
                >
                  UP
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-[--colors-cardBorder] to-[--colors-cardBorder] p-[2px]">
            <div className="bg-[--colors-backgroundAlt] rounded-xl p-4 flex flex-col gap-1">
              <div className="flex flex-col justify-center items-center">
                <span className="text-[--colors-text] font-semibold text-base">
                  Round Cancelled
                </span>
                <span className="text-[--colors-primary] font-semibold text-base">
                  Learn More
                </span>
              </div>
            </div>
          </div>
          <div className="relative -mt-[0.55rem]">
            <div className="h-16 mx-auto w-60">
              <Icons.PayoutDown />
              <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                <div className="text-[--colors-textDisabled] font-semibold uppercase text-xl">
                  DOWN
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isEmpty(historyBetted) &&
          historyBetted?.status !== "Win" &&
          historyBetted?.refund !== 0 &&
          !historyBetted?.claimed && (
            <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100 z-30">
              <Icons.TrophyIcon className="text-[--colors-gold]" />
              <Button
                className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
                onClick={() => {
                  if (showCollectWinningModal)
                    showCollectWinningModal(true, "Refund", historyRound);
                }}
              >
                Collect Your Refund
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default CancelCard;
