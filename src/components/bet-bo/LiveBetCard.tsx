import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { isEmpty } from "lodash";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";

import { useAccount } from "wagmi";
import AnimatedNumber from "../AnimatedNumber";
import CalculatingCard from "./CalculatingCard";
import getAllData from "@/helpers/getAllDataByOnSnapshot";
import { CURRENCY_UNIT } from "@/constants";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

interface ILiveBetCardProps {
  liveRound: number;
  nextBetData: DocumentData;
}

const LiveBetCard: React.FC<ILiveBetCardProps> = ({
  liveRound,
  nextBetData,
}) => {
  const { address, isConnected } = useAccount();
  const [liveBetData, setLiveBetData] = useState<DocumentData[]>();
  const [liveBettedData, setLiveBettedData] = useState<IBetData[]>();
  const [chainlinkData, setChainlinkData] = useState<DocumentData[]>();
  const [progressing, setProgressing] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "predictions",
      [["epoch", "==", liveRound]],
      (docs: DocumentData) => {
        setLiveBetData(docs as DocumentData[]);
      }
    );
    if (isClient && isConnected) {
      getDataFileredByOnSnapshot(
        "bets",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", liveRound],
        ],
        (docs) => {
          setLiveBettedData(docs as IBetData[]);
          if (docs?.[0]?.refund > 0) {
            return toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-[--colors-backgroundAlt] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex bg-[--colors-success] p-4 rounded-l-lg">
                  <Icons.CheckCircle className="text-[--colors-white]" />
                </div>
                <div className="flex-1 w-0 p-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5"></div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-[--colors-text]">
                        Refund!
                      </p>
                      <p className="mt-1 text-sm text-[--colors-text]">
                        You has been refunded{" "}
                        {Number(
                          ethers.formatEther(BigInt(docs?.[0]?.refund))
                        ).toFixed(2)}{" "}
                        {CURRENCY_UNIT}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-start justify-end text-sm font-medium focus:outline-none"
                  >
                    <Icons.X className="text-[--colors-primary]" />
                  </button>
                </div>
              </div>
            ));
          }
        }
      );
    }
    getAllData("chainlink", (docs: DocumentData) => {
      setChainlinkData(docs as DocumentData[]);
    });
  }, [isClient, liveRound, address, isConnected]);

  useEffect(() => {
    const target = +nextBetData?.lockTimestamp * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const different = target - now;
      setProgressing(Math.floor(different / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextBetData?.lockTimestamp]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ratePrice =
    (+chainlinkData?.[0]?.price - +liveBetData?.[0]?.lockPrice) / 10 ** 8;

  return (
    <div
      className={`w-full flex justify-center items-center relative transition-transform duration-700 preverve-3d`}
    >
      {progressing > 0 ? (
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
                      {liveBetData?.[0]?.bullAmount
                        ? Number(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bullAmount)
                            )
                          ).toFixed(2)
                        : 0}{" "}
                      {CURRENCY_UNIT}
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
                      {liveBetData?.[0]?.bullAmount
                        ? Number(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bullAmount)
                            )
                          ).toFixed(2)
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`rounded-2xl border-2 border-[${
                ratePrice > 0 ? "--colors-success" : "--colors-failure"
              }] p-[2px]`}
            >
              <div className="bg-[--colors-backgroundAlt] rounded-xl p-4 flex flex-col gap-1">
                <div className="text-[--colors-textSubtle] font-semibold text-xs uppercase mb-2">
                  Last Price
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className={`flex items-center text-[${
                      ratePrice > 0 ? "--colors-success" : "--colors-failure"
                    }] font-semibold text-xl min-h-[36px]`}
                  >
                    <span>$</span>
                    <AnimatedNumber
                      startNumber={
                        +(liveBetData?.[0]?.lockPrice / 10 ** 8).toFixed(4)
                      }
                      endNumber={
                        +(chainlinkData?.[0]?.price / 10 ** 8).toFixed(4)
                      }
                    />
                  </div>
                  {ratePrice > 0 ? (
                    <div
                      className={`flex gap-1 justify-center items-center bg-[--colors-success] py-1 px-2 rounded`}
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
                    {liveBetData?.[0]?.lockPrice
                      ? (liveBetData?.[0].lockPrice / 10 ** 8).toFixed(4)
                      : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[--colors-text] font-semibold text-base">
                  <span>Prize Pool:</span>
                  <span>
                    {liveBetData?.[0]?.totalAmount
                      ? Number(
                          ethers.formatEther(
                            BigInt(liveBetData?.[0]?.totalAmount)
                          )
                        )
                          .toFixed(2)
                          .toString()
                      : 0}{" "}
                    {CURRENCY_UNIT}
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
                      {liveBetData?.[0]?.bearAmount
                        ? Number(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bearAmount)
                            )
                          ).toFixed(2)
                        : 0}{" "}
                      {CURRENCY_UNIT}
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
                      {liveBetData?.[0]?.bearAmount
                        ? Number(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bearAmount)
                            )
                          ).toFixed(2)
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                    <div className="text-[--colors-white] font-semibold uppercase text-xl">
                      DOWN
                    </div>
                  </div>
                </div>
              )}
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
      ) : (
        <CalculatingCard liveRound={liveRound} />
      )}
    </div>
  );
};

export default LiveBetCard;
