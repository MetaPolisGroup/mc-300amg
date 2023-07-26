import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { useAccount } from "wagmi";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";
import { isEmpty } from "lodash";
import { ethers } from "ethers";
import Button from "../ui/Button";

interface IHistoryProps {
  historyRound: string;
  showCollectWinningModal?: (status: boolean, round: string) => void;
}

const HistoryCard: React.FC<IHistoryProps> = ({
  historyRound,
  showCollectWinningModal,
}) => {
  const { isConnected, address } = useAccount();
  const [historyBetted, setHistoryBetted] = useState<DocumentData[]>([]);
  const [historyData, setHistoryData] = useState<DocumentData[]>([]);
  useEffect(() => {
    // Get all round history data
    getDataFileredByOnSnapshot(
      "predictions",
      [["epoch", "==", historyRound]],
      (docs: DocumentData) => {
        setHistoryData(docs as DocumentData[]);
      }
    );

    // Get round history data that user has been betted
    if (isConnected && address && historyRound) {
      getDataFileredByOnSnapshot(
        "bets",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", historyRound],
        ],
        (docs: DocumentData) => {
          setHistoryBetted(docs as DocumentData[]);
        }
      );
    }
  }, [isConnected, address, historyRound]);

  // Determine this round up or down (UP: rate > 0, vice versa)
  const ratePrice =
    (historyData?.[0]?.closePrice - historyData?.[0]?.lockPrice) / 10 ** 8;

  // console.log({ historyBetted });

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
            <div className="text-[--colors-textDisabled]">#{historyRound}</div>
          </div>

          <div className="card-body p-4 opacity-70 group-hover:opacity-100">
            {!isEmpty(historyBetted) &&
              (historyBetted?.[0]?.position === "UP" ? (
                <div className="absolute flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                  <Icons.CheckCircle className="text-[--colors-text]" />
                  <span className="text-[--colors-secondary]">ENTERED</span>
                </div>
              ) : null)}
            <div className="relative -mb-[0.55rem]">
              {ratePrice > 0 ? (
                <div className="h-16 mx-auto w-60">
                  <Icons.PayoutUpSuccess />
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div
                      className={`text-[--colors-white] font-semibold uppercase text-xl`}
                    >
                      UP
                    </div>
                    <div className="text-[--colors-white] font-semibold text-sm">
                      1 Payout
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-16 mx-auto w-60">
                  <Icons.PayoutUp />
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div
                      className={`text-[--colors-success] font-semibold uppercase text-xl`}
                    >
                      UP
                    </div>
                    <div className="text-[--colors-textSubtle] font-semibold text-sm">
                      1 Payout
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`rounded-2xl bg-gradient-to-r from-[${
                ratePrice > 0 ? "--colors-success" : "--colors-failure"
              }] to-[${
                ratePrice > 0 ? "--colors-success" : "--colors-failure"
              }] p-[2px]`}
            >
              <div className="bg-[--colors-backgroundAlt] rounded-xl p-4 flex flex-col gap-1">
                <div className="text-[--colors-textSubtle] font-semibold text-xs uppercase mb-2">
                  Last Price
                </div>
                <div className="flex justify-between items-center">
                  {ratePrice > 0 ? (
                    <div
                      className={`text-[--colors-success] font-semibold text-xl`}
                    >
                      ${(historyData?.[0]?.closePrice / 10 ** 8).toFixed(4)}
                    </div>
                  ) : (
                    <div
                      className={`text-[--colors-failure] font-semibold text-xl`}
                    >
                      ${(historyData?.[0]?.closePrice / 10 ** 8).toFixed(4)}
                    </div>
                  )}
                  {ratePrice > 0 ? (
                    <div
                      className={`flex gap-1 justify-center items-center bg-[--colors-success] py-1 px-1 rounded`}
                    >
                      <Icons.ArrowDown className="text-[--colors-white] rotate-180" />
                      <span className="text-[--colors-white] font-medium text-base uppercase ml-1">
                        ${ratePrice.toFixed(4)}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`flex gap-1 justify-center items-center bg-[--colors-failure] py-1 px-2 rounded`}
                    >
                      <Icons.ArrowDown className="text-[--colors-white]" />
                      <span className="text-[--colors-white] font-medium text-base uppercase ml-1">
                        ${ratePrice.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-[--colors-text]">
                  <span className="font-medium text-sm">Locked Price:</span>
                  <span className="font-medium text-sm">
                    $
                    {historyData?.[0]?.lockPrice
                      ? (historyData?.[0]?.lockPrice / 10 ** 8).toFixed(4)
                      : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[--colors-text] font-semibold text-base">
                  <span>Prize Pool:</span>
                  <span>
                    {/* {historyData?.[0]?.totalAmount
                      ? Number(
                          ethers.formatEther(
                            BigInt(historyData?.[0]?.totalAmount)
                          )
                        )
                          .toFixed(8)
                          .toString()
                      : 0}{" "}
                    BNB */}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative -mt-[0.55rem]">
              {ratePrice > 0 ? (
                <div className="h-16 mx-auto w-60">
                  <Icons.PayoutDown />
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div className="text-[--colors-textSubtle] font-semibold text-sm">
                      1 Payout
                    </div>
                    <div className="text-[--colors-failure] font-semibold uppercase text-xl">
                      DOWN
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-16 mx-auto w-60">
                  <Icons.PayoutDownFailure />
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div className="text-[--colors-white] font-semibold text-sm">
                      1 Payout
                    </div>
                    <div className="text-[--colors-white] font-semibold uppercase text-xl">
                      DOWN
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!isEmpty(historyBetted) &&
              (historyBetted?.[0]?.position === "DOWN" ? (
                <div className="absolute right-0 bottom-2 flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                  <Icons.CheckCircle className="text-[--colors-text]" />
                  <span className="text-[--colors-text]">ENTERED</span>
                </div>
              ) : null)}
            {/* <div className="absolute right-0 bottom-2 flex gap-2 z-20 rounded-2xl bg-[--colors-secondary] px-2 py-[2px] ">
              <Icons.CheckCircle className="text-[--colors-white]" />
              <span className="text-[--colors-white] uppercase">Claimed</span>
            </div> */}
          </div>
          {historyBetted?.[0]?.status === "Win" && (
            <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100 z-30">
              <Icons.TrophyIcon className="text-[--colors-gold]" />
              <Button
                className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
                onClick={() => {
                  if (showCollectWinningModal)
                    showCollectWinningModal(true, historyRound);
                }}
              >
                Collect Winnings
              </Button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HistoryCard;
