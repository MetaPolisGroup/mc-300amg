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
import { toFixedEtherNumber } from "@/utils/format-number";

interface ILiveBetCardProps {
  liveRound: number;
  nextBetData: DocumentData;
  liveBettedData: IBetData | undefined;
}

const LiveBetCard: React.FC<ILiveBetCardProps> = ({
  liveRound,
  nextBetData,
  liveBettedData,
}) => {
  const { address, isConnected } = useAccount();
  const [liveBetData, setLiveBetData] = useState<DocumentData[]>();
  const [chainlinkData, setChainlinkData] = useState<DocumentData[]>();
  const [progressing, setProgressing] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [liveBetted, setLiveBetted] = useState<IBetData | undefined>(
    liveBettedData
  );

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "predictions",
      [["epoch", "==", liveRound]],
      (docs: DocumentData) => {
        setLiveBetData(docs as IBetData[]);
      }
    );

    getAllData("chainlink", (docs: DocumentData) => {
      setChainlinkData(docs as DocumentData[]);
    });
  }, [liveRound]);

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
    if (
      isConnected &&
      address &&
      liveBettedData?.epoch !== liveBetted?.epoch &&
      !isEmpty(liveBettedData)
    ) {
      getDataFileredByOnSnapshot(
        "bets",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", liveBettedData.epoch],
        ],
        (docs) => {
          setLiveBetted(docs?.[0] as IBetData);
        }
      );
    }
    if (isEmpty(liveBettedData)) {
      return setLiveBetted(undefined);
    }
    if (
      isConnected &&
      address &&
      !isEmpty(liveBettedData) &&
      liveBettedData?.epoch !== liveRound
    ) {
      getDataFileredByOnSnapshot(
        "bets",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", liveRound],
        ],
        (docs) => {
          setLiveBetted(docs?.[0] as IBetData);
        }
      );
    }
  }, [isConnected, liveBettedData?.epoch, address, liveBettedData, liveRound]);

  useEffect(() => {
    setIsClient(true);
    if (liveBetted?.refund && liveBetted?.refund > 0)
      toast.custom((t) => (
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
                  {toFixedEtherNumber(
                    ethers.formatEther(BigInt(liveBetted?.refund)),
                    2
                  )}{" "}
                  {CURRENCY_UNIT}
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-non2e rounded-r-lg p-4 flex items-start justify-end text-sm font-medium focus:outline-none"
            >
              <Icons.X className="text-[--colors-primary]" />
            </button>
          </div>
        </div>
      ));
  }, []);

  const ratePrice =
    (+chainlinkData?.[0]?.price - +liveBetData?.[0]?.lockPrice) / 10 ** 8;

  // console.log({ roundPrevious });
  // console.log({ liveRound });
  // console.log({ liveBettedData });
  // console.log({ liveBetted });

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
            {!isEmpty(liveBetted) &&
              (liveBetted?.position === "UP" ? (
                <div className="absolute flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                  <Icons.CheckCircle className="text-[--colors-text]" />
                  <span className="text-[--colors-secondary]">ENTERED</span>
                </div>
              ) : null)}
            <div className="relative -mb-[0.55rem]">
              {ratePrice > 0 ? (
                <div className="h-16 mx-auto w-60">
                  <svg
                    height="65px"
                    width="240px"
                    viewBox="0 0 240 65"
                    color="text"
                    fill="var(--colors-success)"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-231a1e38-0 dPwWVs"
                  >
                    <g filter="url(#filter0_i)">
                      <path
                        d="M10.0001 49.2757L10.0003 64H234L234 49.2753C234 42.5136 229.749 36.4819 223.381 34.2077L138.48 3.8859C127.823 0.0796983 116.177 0.0796931 105.519 3.8859L20.6188 34.2076C14.2508 36.4819 10.0001 42.5138 10.0001 49.2757Z"
                        fill="var(--colors-success)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="filter0_i"
                        x="10.0001"
                        y="1.03125"
                        width="224"
                        height="62.9688"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset></feOffset>
                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        ></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div
                      className={`text-[--colors-white] font-semibold uppercase text-xl`}
                    >
                      UP
                    </div>
                    <div className="text-[--colors-white] font-semibold text-sm">
                      {liveBetData?.[0]?.bullAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bullAmount)
                            ),
                            2
                          )
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-16 mx-auto w-60">
                  <svg
                    height="65px"
                    width="240px"
                    viewBox="0 0 240 65"
                    color="text"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-231a1e38-0 dPwWVs"
                    fill="var(--colors-tertiary)"
                  >
                    <g filter="url(#filter0_i)">
                      <path
                        d="M10.0001 49.2757L10.0003 64H234L234 49.2753C234 42.5136 229.749 36.4819 223.381 34.2077L138.48 3.8859C127.823 0.0796983 116.177 0.0796931 105.519 3.8859L20.6188 34.2076C14.2508 36.4819 10.0001 42.5138 10.0001 49.2757Z"
                        fill="var(--colors-tertiary)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="filter0_i"
                        x="10.0001"
                        y="1.03125"
                        width="224"
                        height="62.9688"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset></feOffset>
                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        ></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div
                      className={`text-[--colors-success] font-semibold uppercase text-xl`}
                    >
                      UP
                    </div>
                    <div className="text-[--colors-textSubtle] font-semibold text-sm">
                      {liveBetData?.[0]?.bullAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bullAmount)
                            ),
                            2
                          )
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
                      ? toFixedEtherNumber(
                          ethers.formatEther(
                            BigInt(liveBetData?.[0]?.totalAmount)
                          ),
                          2
                        )
                      : 0}{" "}
                    {CURRENCY_UNIT}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative -mt-[0.55rem]">
              {ratePrice > 0 ? (
                <div className="h-16 mx-auto w-60">
                  <svg
                    height="65px"
                    width="240px"
                    viewBox="0 0 240 65"
                    color="text"
                    fill="var(--colors-tertiary)"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-231a1e38-0 dPwWVs"
                  >
                    <g filter="url(#filter0_i)">
                      <path
                        d="M10.0001 15.7243L10.0003 1H234L234 15.7247C234 22.4864 229.749 28.5181 223.381 30.7923L138.48 61.1141C127.823 64.9203 116.177 64.9203 105.519 61.1141L20.6188 30.7924C14.2508 28.5181 10.0001 22.4862 10.0001 15.7243Z"
                        fill="var(--colors-tertiary)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="filter0_i"
                        x="10.0001"
                        y="1"
                        width="224"
                        height="62.9688"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset></feOffset>
                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        ></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div className="text-[--colors-textSubtle] font-semibold text-sm">
                      {liveBetData?.[0]?.bearAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bearAmount)
                            ),
                            2
                          )
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
                  <svg
                    height="65px"
                    width="240px"
                    viewBox="0 0 240 65"
                    color="text"
                    fill="var(--colors-failure)"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-231a1e38-0 dPwWVs"
                  >
                    <g filter="url(#filter0_i)">
                      <path
                        d="M10.0001 15.7243L10.0003 1H234L234 15.7247C234 22.4864 229.749 28.5181 223.381 30.7923L138.48 61.1141C127.823 64.9203 116.177 64.9203 105.519 61.1141L20.6188 30.7924C14.2508 28.5181 10.0001 22.4862 10.0001 15.7243Z"
                        fill="var(--colors-failure)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="filter0_i"
                        x="10.0001"
                        y="1"
                        width="224"
                        height="62.9688"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        ></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset></feOffset>
                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        ></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                  <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                    <div className="text-[--colors-white] font-semibold text-sm">
                      {liveBetData?.[0]?.bearAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(liveBetData?.[0]?.bearAmount)
                            ),
                            2
                          )
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
            {!isEmpty(liveBetted) &&
              (liveBetted?.position === "DOWN" ? (
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
