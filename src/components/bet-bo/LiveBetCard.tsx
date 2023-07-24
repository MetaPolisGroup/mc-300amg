import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { isEmpty } from "lodash";
import getDataFileredByOnSnapshot from "@/helpers/getDataByOnSnapshot";
import { DocumentData } from "firebase/firestore";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

interface ILiveBetCardProps {
  liveRound: string;
  nextBetData: DocumentData;
}

const LiveBetCard: React.FC<ILiveBetCardProps> = ({
  liveRound,
  nextBetData,
}) => {
  const { address } = useAccount();
  const [liveBetData, setLiveBetData] = useState<DocumentData[]>();
  const [liveBettedData, setLiveBettedData] = useState<DocumentData[]>();
  const [progressing, setProgressing] = useState<number>(0);
  useEffect(() => {
    getDataFileredByOnSnapshot(
      "predictions",
      [["epoch", "==", liveRound]],
      (docs: DocumentData) => {
        setLiveBetData(docs as DocumentData[]);
      }
    );
    getDataFileredByOnSnapshot(
      "bets",
      [
        ["user_address", "==", address as `0x${string}`],
        ["epoch", "==", liveRound],
      ],
      (docs: DocumentData) => {
        setLiveBettedData(docs as DocumentData[]);
      }
    );
  }, [liveRound, address]);

  useEffect(() => {
    const target = +nextBetData?.lockTimestamp * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const different = target - now;
      setProgressing(Math.floor(different / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextBetData?.lockTimestamp]);

  return (
    <div
      className={`w-full flex justify-center items-center relative transition-transform duration-700 preverve-3d`}
    >
      <div className={"card w-80 z-20 bg-[--colors-backgroundAlt] shadow-xl"}>
        <div className="flex justify-between items-center bg-[--colors-backgroundAlt] h-9 p-2 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.PlayCircle className="text-[--colors-secondary]" />
            <span className="text-[--colors-secondary]">Live</span>
          </div>
          <div className="text-[--colors-secondary]">#{liveRound}</div>
        </div>
        <div className="w-full bg-[--colors-input] h-2.5 ">
          <div
            className="bg-[--colors-secondary] h-2.5"
            style={{ width: `${(progressing * 100) / 300}%` }}
          />
        </div>
        <div className="card-body p-4">
          {!isEmpty(liveBettedData) &&
            (liveBettedData?.[0]?.position === "UP" ? (
              <div className="absolute flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                <Icons.CheckCircle className="text-[--colors-text]" />
                <span className="text-[--colors-secondary]">ENTERED</span>
              </div>
            ) : null)}
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
                  1 Payout
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
                <span className="font-medium text-sm">
                  ${" "}
                  {liveBetData?.[0]?.lockPrice
                    ? ethers.formatEther(liveBetData?.[0].lockPrice)
                    : 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-[--colors-text] font-semibold text-base">
                <span>Prize Pool:</span>
                <span>
                  {liveBetData?.[0]?.totalAmount
                    ? ethers.formatEther(liveBetData?.[0]?.totalAmount)
                    : 0}{" "}
                  BNB
                </span>
              </div>
            </div>
          </div>
          <div className="relative -mt-[0.55rem]">
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
          </div>
          {!isEmpty(liveBettedData) &&
            (liveBettedData?.[0]?.position === "DOWN" ? (
              <div className="absolute right-0 bottom-2 flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                <Icons.CheckCircle className="text-[--colors-text]" />
                <span className="text-[--colors-secondary]">ENTERED</span>
              </div>
            ) : null)}
        </div>
      </div>
    </div>
  );
};

export default LiveBetCard;
