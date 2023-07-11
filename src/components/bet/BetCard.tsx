"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import Button from "../ui/Button";

const BetCard = () => {
  const [showSetBetCard, setShowSetBetCard] = useState(false);

  return (
    <div
      className={`w-full h-[100vh] flex justify-center items-center relative rotate-0 transition-transform duration-700 ${
        showSetBetCard === true && "rotate-180"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`card absolute z-20 w-80 shadow-xl ${
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
        <div className="card-body p-4 ">
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
                onClick={() => setShowSetBetCard(true)}
              >
                Enter UP
              </Button>
              <Button className="bg-[--colors-failure] text-[--colors-white] hover:bg-[--colors-failure] hover:opacity-[0.8] rounded-2xl">
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
        className={`card absolute z-10 w-80 shadow-xl ${
          showSetBetCard && "z-20"
        }`}
      >
        <div className="flex justify-between items-center bg-[--colors-secondary] h-9 p-2 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Icons.PlayCircle className="text-[--colors-white]" />
            <span className="text-[--colors-white]">Set Position</span>
          </div>
          <div className="text-[--colors-white]">#187808</div>
        </div>
        <div className="card-body p-4 ">
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
              <Button className="bg-[--colors-success] text-[--colors-white] hover:bg-[--colors-success] hover:opacity-[0.8] rounded-2xl">
                Enter UP
              </Button>
              <Button className="bg-[--colors-failure] text-[--colors-white] hover:bg-[--colors-failure] hover:opacity-[0.8] rounded-2xl">
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
    </div>
  );
};

export default BetCard;
