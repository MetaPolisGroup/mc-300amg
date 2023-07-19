"use client";
import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { formatInputField } from "@/utils/format-inputField";
import { nanoid } from "nanoid";
import { isEmpty } from "lodash";
import { publicClient } from "@/lib/contract-config";
import { CONSTANTS } from "@/constants";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SetBetPosition from "./SetBetPosition";
import Tooltip from "../ui/Tooltip";

interface IBetCard {
  currentRound: string;
}

const BetCard: React.FC<IBetCard> = ({ currentRound }) => {
  const [showSetBetCard, setShowSetBetCard] = useState<boolean>(false);
  const [upOrDownStatus, setUpOrDownStatus] = useState<string>("");
  const [dataBetted, setDataBetted] = useState<IBetData | null>(null);

  const enterUpOrDownHandler = (status: string) => {
    setShowSetBetCard(true);
    if (status === "UP") setUpOrDownStatus("UP");
    if (status === "DOWN") setUpOrDownStatus("DOWN");
  };

  const changeUpOrDownHandler = (status: string) => {
    setUpOrDownStatus(status);
  };

  const backwardHandler = (status: boolean) => {
    setShowSetBetCard(status);
  };

  const placeBetHandler = (id: string, status: any, value: string) => {
    setDataBetted({
      id,
      status,
      value,
    });
    if (!isEmpty(id)) setShowSetBetCard(false);
  };

  return (
    <div
      className={`w-full flex h-[485px] justify-center items-center relative transition-transform duration-700 preverve-3d ${
        showSetBetCard === true && "rotateY-180"
      }`}
    >
      <div
        className={`card z-20 w-80 shadow-xl backface-hidden ${
          showSetBetCard && "z-10"
        }`}
      >
        <div className="flex justify-between items-center bg-[--colors-secondary] h-9 p-2 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.PlayCircle className="text-[--colors-white]" />
            <span className="text-[--colors-white]">Next</span>
          </div>
          <div className="text-[--colors-white]">#{currentRound}</div>
        </div>
        <div className="card-body p-4">
          {!isEmpty(dataBetted) &&
            (dataBetted?.status === "UP" ? (
              <div className="absolute flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                <Icons.CheckCircle className="text-[--colors-text]" />
                <span className="text-[--colors-secondary]">ENTERED</span>
              </div>
            ) : null)}
          <div className="relative -mb-[0.55rem]">
            <div className="h-16 mx-auto w-60">
              <Icons.PayoutUp />
              <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full">
                <div className="text-[--colors-success] font-semibold uppercase text-xl">
                  UP
                </div>
                <div className="text-[--colors-textSubtle] font-semibold text-sm">
                  1.41x Payout
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-[#53dee9] to-[#7645d9] p-[2px]">
            <div className="bg-[--colors-backgroundAlt] rounded-xl p-4 flex flex-col gap-2">
              {!isEmpty(dataBetted) &&
                (dataBetted?.status === "UP" ? (
                  <Tooltip tooltipTitle={`${dataBetted.value} BNB`}>
                    <Button
                      className="flex relative group w-full gap-1 bg-[--colors-success] text-[--colors-white] hover:bg-[--colors-success] hover:opacity-[0.8] rounded-2xl"
                      type="button"
                      disabled={true}
                    >
                      <Icons.ArrowDown className="rotate-180" />
                      <span>UP Entered</span>
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip tooltipTitle={`${dataBetted.value} BNB`}>
                    <Button
                      className="flex relative group w-full gap-1 bg-[--colors-failure] text-[--colors-white] hover:bg-[--colors-failure] hover:opacity-[0.8] rounded-2xl"
                      type="button"
                      disabled={true}
                    >
                      <Icons.ArrowDown />
                      <span>DOWN Entered</span>
                    </Button>
                  </Tooltip>
                ))}

              <div className="flex items-center justify-between text-[--colors-text] font-semibold text-base">
                <span>Prize Pool:</span>
                <span>0.00005 BNB</span>
              </div>
              {isEmpty(dataBetted) ? (
                <>
                  <Button
                    className="bg-[--colors-success] text-[--colors-white] hover:bg-[--colors-success] hover:opacity-[0.8] rounded-2xl"
                    type="button"
                    onClick={() => enterUpOrDownHandler("UP")}
                  >
                    Enter UP
                  </Button>
                  <Button
                    className="bg-[--colors-failure] text-[--colors-white] hover:bg-[--colors-failure] hover:opacity-[0.8] rounded-2xl"
                    type="button"
                    onClick={() => enterUpOrDownHandler("DOWN")}
                  >
                    Enter DOWN
                  </Button>
                </>
              ) : null}
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
          {!isEmpty(dataBetted) &&
            (dataBetted?.status === "DOWN" ? (
              <div className="absolute right-0 bottom-2 flex gap-2 z-20 border-2 rounded-2xl border-[--colors-secondary] px-2 py-[2px] ">
                <Icons.CheckCircle className="text-[--colors-text]" />
                <span className="text-[--colors-secondary]">ENTERED</span>
              </div>
            ) : null)}
        </div>
      </div>

      <div
        className={`card absolute z-10 w-80 shadow-xl backface-hidden translate-rotateY bg-[--colors-backgroundAlt] ${
          showSetBetCard && "z-20"
        }`}
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-[--colors-gradientCardHeaderFrom] to-[--colors-gradientCardHeaderTo] p-4 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.ArrowLeft
              className="text-[--colors-text] cursor-pointer"
              onClick={() => {
                setShowSetBetCard(false);
                setUpOrDownStatus("");
              }}
            />
            <span className="text-[--colors-text]">Set Position</span>
          </div>
          {upOrDownStatus === "UP" ? (
            <Button
              className="text-[--colors-white] bg-[--colors-success] hover:bg-[--colors-success] hover:opacity-[0.8]"
              type="button"
              onClick={() => setUpOrDownStatus("DOWN")}
            >
              <Icons.ArrowDown className="rotate-180" />
              <span>UP</span>
            </Button>
          ) : (
            <Button
              className="text-[--colors-white] bg-[--colors-failure] hover:bg-[--colors-failure] hover:opacity-[0.8]"
              type="button"
              onClick={() => setUpOrDownStatus("UP")}
            >
              <Icons.ArrowDown />
              <span>DOWN</span>
            </Button>
          )}
        </div>
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <span className="text-[--colors-textSubtle] font-medium text-base">
              Commit:
            </span>
            <div className="flex items-center gap-1">
              <Icons.BNBIcon />
              <span className="text-[--colors-text] font-semibold text-base">
                BNB
              </span>
            </div>
          </div>
          <div className="px-4 py-2 bg-[--colors-input] rounded-2xl">
            <Input
              className="text-[--colors-white] text-right"
              placeholder="0.0"
              onKeyDown={formatInputField}
            />
          </div>
          <div className="text-[--colors-textSubtle] font-medium text-sm text-right">
            Balance: 0.00703629299999992
          </div>
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
              45%
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            {BUTTONS_PERCENT.map((button_precent) => (
              <Button
                key={button_precent.id}
                className="flex items-center rounded-2xl font-semibold justify-center h-5 py-0 px-2 bg-[--colors-tertiary] text-[--colors-primary] text-xs flex-1 hover:bg-[--colors-tertiary] hover:opacity-80 focus:ring-offset-0 focus:ring-0"
              >
                {button_precent.name}
              </Button>
            ))}
          </div>
          <div>
            {/* <Button
              className="w-full bg-[--colors-primary] text-[--colors-white] hover:bg-[--colors-primary] hover:opacity-[0.8] rounded-2xl"
              type="button"
            >
              Connect Wallet
            </Button> */}
            <Button
              className="w-full bg-[--colors-primary] text-[--colors-white] hover:bg-[--colors-primary] hover:opacity-[0.8] rounded-2xl"
              type="button"
            >
              Confirm
            </Button>
          </div>
          <p className="text-[--colors-textSubtle] font-medium text-xs">
            You won&apos;t be able to remove or change your position once you
            enter it.
          </p>
        </div>
      </div>

      <SetBetPosition
        showSetBetCard={showSetBetCard}
        upOrDownStatus={upOrDownStatus}
        onEnterUpOrDown={changeUpOrDownHandler}
        onBackward={backwardHandler}
        onPlaceBet={placeBetHandler}
      />
    </div>
  );
};

const BUTTONS_PERCENT = [
  {
    id: nanoid(),
    name: "10%",
    value: 10,
  },
  {
    id: nanoid(),
    name: "25%",
    value: 25,
  },
  {
    id: nanoid(),
    name: "50%",
    value: 50,
  },
  {
    id: nanoid(),
    name: "75%",
    value: 75,
  },
  {
    id: nanoid(),
    name: "Max",
    value: 100,
  },
];

export default BetCard;
