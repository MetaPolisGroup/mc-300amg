"use client";
import React, { useEffect, useState } from "react";
import SetElectionBetPostion from "./SetElectionBetPostion";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { EMarketTypes } from "@/constants/marketsType";
import { DocumentData } from "firebase/firestore";
import { toFixedEtherNumber } from "@/utils/format-number";
import { ethers } from "ethers";
import { CURRENCY_UNIT } from "@/constants";

const ElectionCard = () => {
  const [showSetBetCard, setShowSetBetCard] = useState<boolean>(false);
  const [yesOrNoStatus, setYesOrNoStatus] = useState<string>("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [electionData, setElectionData] = useState<IElectionData[]>([]);

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "markets",
      [["epoch", "==", EMarketTypes.ELECTION]],
      (docs: DocumentData) => {
        setElectionData(docs as IElectionData[]);
      }
    );
  }, []);

  const enterYesOrNoHandler = (status: string) => {
    setShowSetBetCard(true);
    if (status === "YES") setYesOrNoStatus("YES");
    if (status === "NO") setYesOrNoStatus("NO");
  };

  const changeYesOrNoHandler = (status: string) => {
    setYesOrNoStatus(status);
    inputRef.current?.focus();
  };

  const placedBetHandler = (status: boolean) => {
    setShowSetBetCard(status);
  };

  const backwardHandler = (status: boolean) => {
    setShowSetBetCard(status);
  };

  return (
    <div
      className={`w-full flex h-[485px] justify-center items-center relative transition-transform duration-700 preverve-3d ${
        showSetBetCard === true && "rotateY-180"
      }`}
    >
      <div
        className={`card z-20 w-96 md:w-[505px] shadow-xl backface-hidden ${
          showSetBetCard && "z-10"
        }`}
      >
        <div className="card-body rounded-2xl p-4 bg-[--colors-backgroundAlt]">
          <div className="relative -mb-[0.55rem]">
            <div className="h-16 mx-auto w-60">
              <div className="flex flex-col justify-start absolute top-0 left-0 w-full h-full">
                <div className="w-full md:w-[290px] h-12 flex items-center px-4 mb-3 md:mb-5 text-slate-400 text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[20px] border-2 border-slate-400">
                  Topic
                </div>
                <div className="text-[--colors-textSubtle] font-semibold text-sm"></div>
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-10 text-[--colors-contrast] text-xl font-bold leading-7">
            Lorem ipsum dolor sit amet consectetur. Leo et aliquam imperdiet
            pharetra donec nisl. Et faucibus interdum varius leo eu.
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="flex gap-2 items-center md:flex-col md:items-start md:w-1/3">
              <div className="text-[--colors-contrast] text-base font-light leading-snug">
                Total Volumn
              </div>
              <div className="text-slate-400 text-[26px] font-bold leading-9">
                {electionData?.[0]?.totalAmount
                  ? toFixedEtherNumber(
                      ethers.formatEther(
                        BigInt(electionData?.[0]?.totalAmount)
                      ),
                      2
                    )
                  : 0}{" "}
                {CURRENCY_UNIT}
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-wrap gap-y-3 justify-end">
              <div
                className="w-full md:max-w-[290px] h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer"
                onClick={() => enterYesOrNoHandler("YES")}
              >
                <div className="w-36 py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                  {electionData?.[0]?.bullAmount
                    ? toFixedEtherNumber(
                        ethers.formatEther(
                          BigInt(electionData?.[0]?.bullAmount)
                        ),
                        2
                      )
                    : 0}{" "}
                  {CURRENCY_UNIT}
                </div>
                <div className="flex items-center justify-center text-white text-sm font-bold leading-7">
                  YES
                </div>
              </div>

              <div
                className="w-full md:max-w-[290px] h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer"
                onClick={() => enterYesOrNoHandler("NO")}
              >
                <div className="w-36 py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                  {electionData?.[0]?.bearAmount
                    ? toFixedEtherNumber(
                        ethers.formatEther(
                          BigInt(electionData?.[0]?.bearAmount)
                        ),
                        2
                      )
                    : 0}{" "}
                  {CURRENCY_UNIT}
                </div>
                <div className="flex items-center justify-center text-white text-sm font-bold leading-7">
                  NO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SetElectionBetPostion
        showSetBetCard={showSetBetCard}
        yesOrNoStatus={yesOrNoStatus}
        onEnterYesOrNo={changeYesOrNoHandler}
        onBackward={backwardHandler}
        currentRound={EMarketTypes.ELECTION.toString()}
        onPlacedBet={placedBetHandler}
        inputRef={inputRef}
      />
    </div>
  );
};

export default ElectionCard;
