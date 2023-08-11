import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { useAccount } from "wagmi";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";
import { isEmpty } from "lodash";
import { ethers } from "ethers";
import Button from "../ui/Button";
import { CURRENCY_UNIT } from "@/constants";
import { toFixedEtherNumber } from "@/utils/format-number";
import CancelCard from "./CancelCard";
import { RESULT_STATUS } from "@/constants/history";

interface IHistoryProps {
  historyRound: number;
  showCollectWinningModal?: (
    status: boolean,
    statusClaim: string,
    title: string,
    round: number
  ) => void;
}

const HistoryCard: React.FC<IHistoryProps> = ({
  historyRound,
  showCollectWinningModal,
}) => {
  const { isConnected, address } = useAccount();
  const [historyBetted, setHistoryBetted] = useState<IHistory[]>([]);
  const [historyData, setHistoryData] = useState<DocumentData[]>([]);
  const [roundPrevious, setRoundPrevious] = useState<number>(historyRound);
  const [isClient, setIsClient] = useState<boolean>(false);

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
    if (isClient && isConnected && address && historyRound) {
      getDataFileredByOnSnapshot(
        "bets",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", historyRound],
        ],
        (docs: DocumentData) => {
          setHistoryBetted(docs as IHistory[]);
        }
      );
    }
  }, [isClient, isConnected, address, historyRound]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (roundPrevious !== historyRound) {
      setRoundPrevious(historyRound);
    }
  }, [historyRound, roundPrevious]);

  // Determine this round up or down (UP: rate > 0, vice versa)
  const ratePrice =
    (historyData?.[0]?.closePrice - historyData?.[0]?.lockPrice) / 10 ** 8;

  console.log({ historyData });

  return (
    <React.Fragment>
      {historyData?.[0]?.cancel !== true ? (
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
              <div className="text-[--colors-textDisabled]">
                #{historyRound}
              </div>
            </div>

            <div className="card-body p-4 opacity-70 group-hover:opacity-100">
              {/* Show CLAIMED  or REFUND UP title when claimed */}
              {!isEmpty(historyBetted) &&
                (historyBetted?.[0]?.position === "UP" &&
                historyBetted?.[0]?.claimed === false ? (
                  <div className="absolute flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                    <Icons.CheckCircle className="text-[--colors-text]" />
                    <span className="text-[--colors-secondary]">ENTERED</span>
                  </div>
                ) : null)}
              {!isEmpty(historyBetted) &&
                historyBetted?.[0]?.position === "UP" &&
                historyBetted?.[0]?.status === "Refund" &&
                historyBetted?.[0]?.claimed === true && (
                  <div className="absolute flex gap-2 z-20 rounded-2xl bg-[--colors-secondary] px-2 py-[2px] ">
                    <Icons.CheckCircle className="text-[--colors-white]" />
                    <span className="text-[--colors-white] uppercase">
                      Refunded
                    </span>
                  </div>
                )}
              {!isEmpty(historyBetted) &&
                historyBetted?.[0]?.position === "UP" &&
                historyBetted?.[0]?.status === "Win" &&
                historyBetted?.[0]?.claimed === true && (
                  <div className="absolute flex gap-2 z-20 rounded-2xl bg-[--colors-secondary] px-2 py-[2px] ">
                    <Icons.CheckCircle className="text-[--colors-white]" />
                    <span className="text-[--colors-white] uppercase">
                      Claimed
                    </span>
                  </div>
                )}

              <div className="relative -mb-[0.55rem]">
                {ratePrice > 0 ? (
                  <div className="h-16 mx-auto w-60">
                    <svg
                      height="65px"
                      width="240px"
                      viewBox="0 0 240 65"
                      color="text"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sc-231a1e38-0 dPwWVs"
                    >
                      <g filter="url(#filter0_i)">
                        <path
                          d="M10.0001 49.2757L10.0003 64H234L234 49.2753C234 42.5136 229.749 36.4819 223.381 34.2077L138.48 3.8859C127.823 0.0796983 116.177 0.0796931 105.519 3.8859L20.6188 34.2076C14.2508 36.4819 10.0001 42.5138 10.0001 49.2757Z"
                          fill="#2ccece"
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
                        {historyData?.[0]?.bullAmount
                          ? toFixedEtherNumber(
                              ethers.formatEther(
                                BigInt(historyData?.[0]?.bullAmount)
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
                    >
                      <g filter="url(#filter0_i)">
                        <path
                          d="M10.0001 49.2757L10.0003 64H234L234 49.2753C234 42.5136 229.749 36.4819 223.381 34.2077L138.48 3.8859C127.823 0.0796983 116.177 0.0796931 105.519 3.8859L20.6188 34.2076C14.2508 36.4819 10.0001 42.5138 10.0001 49.2757Z"
                          fill="#353547"
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
                        {historyData?.[0]?.bullAmount
                          ? toFixedEtherNumber(
                              ethers.formatEther(
                                BigInt(historyData?.[0]?.bullAmount)
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
                      {historyData?.[0]?.totalAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(historyData?.[0]?.totalAmount)
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
                      xmlns="http://www.w3.org/2000/svg"
                      className="sc-231a1e38-0 dPwWVs"
                    >
                      <g filter="url(#filter0_i)">
                        <path
                          d="M10.0001 15.7243L10.0003 1H234L234 15.7247C234 22.4864 229.749 28.5181 223.381 30.7923L138.48 61.1141C127.823 64.9203 116.177 64.9203 105.519 61.1141L20.6188 30.7924C14.2508 28.5181 10.0001 22.4862 10.0001 15.7243Z"
                          fill="#353547"
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
                        {historyData?.[0]?.bearAmount
                          ? toFixedEtherNumber(
                              ethers.formatEther(
                                BigInt(historyData?.[0]?.bearAmount)
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
                      xmlns="http://www.w3.org/2000/svg"
                      className="sc-231a1e38-0 dPwWVs"
                    >
                      <g filter="url(#filter0_i)">
                        <path
                          d="M10.0001 15.7243L10.0003 1H234L234 15.7247C234 22.4864 229.749 28.5181 223.381 30.7923L138.48 61.1141C127.823 64.9203 116.177 64.9203 105.519 61.1141L20.6188 30.7924C14.2508 28.5181 10.0001 22.4862 10.0001 15.7243Z"
                          fill="#ee7e3e"
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
                        {historyData?.[0]?.bearAmount
                          ? toFixedEtherNumber(
                              ethers.formatEther(
                                BigInt(historyData?.[0]?.bearAmount)
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

              {/* Show CLAIMED  or REFUND DOWN title when claimed */}

              {!isEmpty(historyBetted) &&
                (historyBetted?.[0]?.position === "DOWN" &&
                historyBetted?.[0]?.claimed === false ? (
                  <div className="absolute right-0 bottom-2 flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                    <Icons.CheckCircle className="text-[--colors-text]" />
                    <span className="text-[--colors-text]">ENTERED</span>
                  </div>
                ) : null)}
              {!isEmpty(historyBetted) &&
                historyBetted?.[0]?.position === "DOWN" &&
                historyBetted?.[0]?.status === "Win" &&
                historyBetted?.[0]?.claimed === true && (
                  <div className="absolute right-0 bottom-2 flex gap-2 z-20 rounded-2xl bg-[--colors-secondary] px-2 py-[2px] ">
                    <Icons.CheckCircle className="text-[--colors-white]" />
                    <span className="text-[--colors-white] uppercase">
                      Claimed
                    </span>
                  </div>
                )}
              {!isEmpty(historyBetted) &&
                historyBetted?.[0]?.position === "DOWN" &&
                historyBetted?.[0]?.status === "Refund" &&
                historyBetted?.[0]?.claimed === true && (
                  <div className="absolute right-0 bottom-2 flex gap-2 z-20 rounded-2xl bg-[--colors-secondary] px-2 py-[2px] ">
                    <Icons.CheckCircle className="text-[--colors-white]" />
                    <span className="text-[--colors-white] uppercase">
                      Refunded
                    </span>
                  </div>
                )}
            </div>

            {/* Show CLAIM CATEGORIES BTN based on conditional */}

            {historyBetted?.[0]?.status === "Win" &&
              historyBetted?.[0]?.refund === 0 &&
              !historyBetted?.[0]?.claimed && (
                <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100 z-30">
                  <Icons.TrophyIcon className="text-[--colors-gold]" />
                  <Button
                    className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
                    onClick={() => {
                      if (showCollectWinningModal)
                        showCollectWinningModal(
                          true,
                          RESULT_STATUS.WIN,
                          "Collect Winnings",
                          historyRound
                        );
                    }}
                  >
                    Collect Your Winnings
                  </Button>
                </div>
              )}

            {!isEmpty(historyBetted) &&
              historyBetted?.[0]?.status === "Winning Refund" &&
              !historyBetted?.[0]?.claimed && (
                <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100 z-30">
                  <Icons.TrophyIcon className="text-[--colors-gold]" />
                  <Button
                    className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
                    onClick={() => {
                      if (showCollectWinningModal)
                        showCollectWinningModal(
                          true,
                          RESULT_STATUS.WR,
                          "Collect Winnings",
                          historyRound
                        );
                    }}
                  >
                    Collect Your Winnings And Refunds
                  </Button>
                </div>
              )}

            {!isEmpty(historyBetted) &&
              historyBetted?.[0]?.status === "Losing Refund" &&
              !historyBetted?.[0]?.claimed && (
                <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100 z-30">
                  <Icons.TrophyIcon className="text-[--colors-gold]" />
                  <Button
                    className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
                    onClick={() => {
                      if (showCollectWinningModal)
                        showCollectWinningModal(
                          true,
                          RESULT_STATUS.LR,
                          "Refund",
                          historyRound
                        );
                    }}
                  >
                    Collect Your Refund
                  </Button>
                </div>
              )}

            {!isEmpty(historyBetted) &&
              historyBetted?.[0]?.status === "Refund" &&
              historyBetted?.[0]?.refund !== 0 &&
              !historyBetted?.[0]?.claimed && (
                <div className="absolute bottom-[0.05rem] w-full bg-[--colors-secondary] flex justify-between items-center p-4 rounded-b-2xl opacity-100 z-30">
                  <Icons.TrophyIcon className="text-[--colors-gold]" />
                  <Button
                    className="bg-[--colors-primary] hover:bg-[--colors-primary] hover:opacity-70"
                    onClick={() => {
                      if (showCollectWinningModal)
                        showCollectWinningModal(
                          true,
                          RESULT_STATUS.REFUND,
                          "Refund",
                          historyRound
                        );
                    }}
                  >
                    Collect Your Refund
                  </Button>
                </div>
              )}
          </div>
        </div>
      ) : (
        <CancelCard
          historyRound={historyRound}
          historyBetted={historyBetted?.[0]}
          showCollectWinningModal={showCollectWinningModal}
        />
      )}
    </React.Fragment>
  );
};

export default HistoryCard;
