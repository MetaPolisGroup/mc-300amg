"use client";
import React, { useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { LIST_GAME } from "@/constants/navConstants";

import classes from "./SliderListGame.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const SliderListGame: React.FC = () => {
  const [games, setGames] =
    useState<{ id: string; img: string; link: string }[]>(LIST_GAME);

  const renderCardGames = () => {
    return games.map((games, index) => {
      return (
        <SwiperSlide key={`${games.id}${index}`}>
          <Link href={games.link} className="mx-2">
            <div className="w-[110px] h-[60px] sm:!w-full sm:h-[140px] rounded-[60px] bg-[--colors-background-slider] overflow-hidden flex items-center justify-center text-[--colors-textSubtle] font-bold select-none cursor-pointer">
              <Image
                src={games.img}
                sizes="1000"
                width={100}
                height={50}
                alt={games.id}
                className={clsx(
                  "max-w-fit !w-[560px]",
                  index === 3 && "h-[60px] sm:h-auto"
                )}
              />
            </div>
          </Link>
        </SwiperSlide>
      );
    });
  };

  return (
    <div className={clsx("my-1", classes["list-game"])}>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={24}
        freeMode={false}
        modules={[FreeMode, Pagination]}
        // centeredSlides={true}
        slideToClickedSlide={true}
      >
        {renderCardGames()}
      </Swiper>
    </div>
  );
};

export default SliderListGame;
