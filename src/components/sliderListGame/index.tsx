"use client";
import React, { useState } from "react";

import NAV_HEADER from "@/constants/navConstants";

import classes from "./SliderListGame.module.css";

const SliderListGame: React.FC = () => {
  const [games, setGames] = useState<{ title: string; link: string }[]>(
    NAV_HEADER[0].items
  );

  const renderCardGames = () => {
    return games.map((games, index) => {
      return (
        <div
          key={`${games.title}${index}`}
          className="!w-full px-3 cursor-pointer"
        >
          <div className="!w-full h-[140px] rounded-[60px] bg-[--colors-background-slider] overflow-hidden flex items-center justify-center text-[--colors-textSubtle] font-bold">
            {games.title}
          </div>
        </div>
      );
    });
  };

  return <div className="my-6">List of games</div>;
};

export default SliderListGame;
