import React, { useEffect } from "react";
import { Icons } from "../Icons";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { isEmpty } from "lodash";
import Button from "../ui/Button";
import { RESULT_STATUS } from "@/constants/history";

interface ICancelCard {
  historyRound: number;
  historyBetted: IHistory;
  showCollectWinningModal?: (
    status: boolean,
    statusClaim: string,
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
                      result="BacgroundImageFix"
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
                <div className="text-[--colors-textDisabled] font-semibold uppercase text-xl">
                  DOWN
                </div>
              </div>
            </div>
          </div>
        </div>
        {historyBetted?.status === "Win" &&
          historyBetted?.refund === 0 &&
          !historyBetted?.claimed && (
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
          historyBetted?.status === "Winning Refund" &&
          !historyBetted?.claimed && (
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
          historyBetted?.status === "Losing Refund" &&
          !historyBetted?.claimed && (
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
          historyBetted?.status === "Refund" &&
          historyBetted?.refund !== 0 &&
          !historyBetted?.claimed && (
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
  );
};

export default CancelCard;
