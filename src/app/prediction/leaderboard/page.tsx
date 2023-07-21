import { Icons } from "@/components/Icons";
import Input from "@/components/ui/Input";
import React from "react";

const LeaderBoard = () => {
  return (
    <main className="w-full">
      <div className="bg-gradient-to-r from-[--colors-bubblegum1] to-[--colors-bubblegum2] p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <ul className="flex items-center flex-wrap">
              <li>
                <a href="/" className="text-[--colors-primary] font-semibold">
                  Home
                </a>
              </li>
              <li className="p-2 md:p-4">
                <Icons.ChevronRightIcon className="text-[--colors-textDisabled]" />
              </li>
              <li>
                <a
                  href="/prediction"
                  className="text-[--colors-primary] font-semibold"
                >
                  Prediction
                </a>
              </li>
              <li className="p-2 md:p-4">
                <Icons.ChevronRightIcon className="text-[--colors-textDisabled]" />
              </li>
              <li>
                <p className="text-[--colors-text] font-semibold text-base">
                  Leaderboard
                </p>
              </li>
            </ul>
          </div>
          <h1 className="text-5xl font-semibold text-[--colors-secondary] md:text-6xl">
            Leaderboard
          </h1>
        </div>
      </div>
      <div className="bg-[--colors-background] p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[--colors-textSubtle]">
            <p className="mb-2">Rank by</p>
            <div className="flex flex-col-reverse gap-2 lg:flex-row lg:justify-between">
              <select className="select select-bordered w-full max-w-xs">
                <option>Normal</option>
                <option>Normal Apple</option>
                <option>Normal Orange</option>
                <option>Normal Tomato</option>
              </select>
              <Input
                className="w-full px-4 md:w-80 rounded-2xl"
                placeholder="Search address"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeaderBoard;
