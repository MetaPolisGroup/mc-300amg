"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import Button from "../ui/Button";
import Image from "next/image";

const BetCard = () => {
  const [showSetBetCard, setShowSetBetCard] = useState<boolean>(false);
  const [upOrDownStatus, setUpOrDownStatus] = useState<string>("");

  const enterUpOrDownHandler = (status: string) => {
    setShowSetBetCard(true);
    if (status === "UP") setUpOrDownStatus("UP");
    if (status === "DOWN") setUpOrDownStatus("DOWN");
  };

  return (
    <div
      className={`w-full h-[100vh] flex justify-center items-center relative transition-transform duration-700 preverve-3d ${
        showSetBetCard === true && "rotateY-180"
      }`}
    >
      <div
        className={`card absolute z-20 w-80 shadow-xl backface-hidden ${
          showSetBetCard && "z-10"
        }`}
      >
        <div className="flex justify-between items-center bg-[--colors-secondary] h-9 p-2 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.PlayCircle className="text-[--colors-white]" />
            <span className="text-[--colors-white]">Next</span>
          </div>
          <div className="text-[--colors-white]">#187808</div>
        </div>
        <div className="card-body p-4">
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
              <div className="flex items-center justify-between text-[--colors-white] font-semibold text-base">
                <span>Prize Pool:</span>
                <span>0.00005 BNB</span>
              </div>
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
              className="text-[--colors-white] cursor-pointer"
              onClick={() => {
                setShowSetBetCard(false);
                setUpOrDownStatus("");
              }}
            />
            <span className="text-[--colors-white]">Set Position</span>
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
            <div>
              <Icons.BNBIcon />
              <span>BNB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetCard;
