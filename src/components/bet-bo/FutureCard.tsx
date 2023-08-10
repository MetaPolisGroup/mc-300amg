import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";

interface IFutureCard {
  futureRound: number;
  plusMinute?: number;
}

const FutureCard: React.FC<IFutureCard> = ({ futureRound, plusMinute }) => {
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [nextBetData, setNextBetData] = useState<DocumentData[]>([]);
  useEffect(() => {
    getDataFileredByOnSnapshot(
      "predictions",
      [["locked", "==", false]],
      (docs: DocumentData) => {
        setNextBetData(docs as DocumentData[]);
      }
    );
  }, []);

  useEffect(() => {
    const target = plusMinute
      ? +nextBetData?.[0]?.lockTimestamp * 1000 + 5 * 60 * 1000
      : +nextBetData?.[0]?.lockTimestamp * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const different = target - now;
      const m = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((different % (1000 * 60)) / 1000);
      setMinute(m);
      setSecond(s);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextBetData, plusMinute]);
  const renderTime = () => {
    const _minute = minute < 10 ? `0${minute}` : minute;
    const _second = second < 10 ? `0${second}` : second;
    return (
      <>
        {+_minute >= 0 && +_second >= 0 ? `~${_minute}:${_second}` : "Closing"}
      </>
    );
  };
  return (
    <div className={`w-full flex justify-center items-center relative`}>
      <div className={"card z-20 w-80 bg-[--colors-backgroundAlt] shadow-xl"}>
        <div className="flex justify-between items-center bg-[--colors-cardBorder] h-9 p-2 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.Clock3 className="text-[--colors-text]" />
            <span className="text-[--colors-text]">Later</span>
          </div>
          <div className="text-[--colors-textSubtle] text-xs">
            #{futureRound}
          </div>
        </div>

        <div className="card-body p-4">
          <div className="relative -mb-[0.55rem]">
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
                  Entry starts
                </span>
                <span className="text-[--colors-text] font-semibold text-base">
                  {renderTime()}
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
                <div className="text-[--colors-textDisabled] font-semibold uppercase text-xl">
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
      </div>
    </div>
  );
};

export default FutureCard;
