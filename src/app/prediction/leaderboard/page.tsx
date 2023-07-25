"use client";
import { Icons } from "@/components/Icons";
import FilterLeaderboard from "@/components/leaderboard/FilterLeaderboard";
import MyRanking from "@/components/leaderboard/MyRanking";
import Ranking from "@/components/leaderboard/Ranking";
import TopRanking from "@/components/leaderboard/TopRanking";
import getAllData from "@/helpers/getAllDataByOnSnapshot";
import React, { useEffect } from "react";

const LeaderBoard = () => {
  useEffect(() => {}, []);
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
          <FilterLeaderboard />
          <MyRanking />
          <TopRanking />
        </div>
      </div>
      <Ranking />
    </main>
  );
};

export default LeaderBoard;
