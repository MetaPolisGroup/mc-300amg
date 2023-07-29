"use client";
import React, { useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import NAV_HEADER from "@/constants/navConstants";

import classes from "./SliderListGame.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

const SliderListGame: React.FC = () => {
  const [games, setGames] = useState<{ title: string; link: string }[]>(
    NAV_HEADER[0].items
  );

  const renderCardGames = () => {
    return games.map((games, index) => {
      // return (
      //   <div
      //     key={`${games.title}${index}`}
      //     className="!w-full px-3 cursor-pointer"
      //   >
      //     <div className="!w-full h-[140px] rounded-[60px] bg-[--colors-background-slider] overflow-hidden flex items-center justify-center text-[--colors-textSubtle] font-bold">
      //       {games.title}
      //     </div>
      //   </div>
      // );

      return (
        <SwiperSlide key={`${games.title}${index}`}>
          <div className="!w-full px-3 cursor-pointer">
            <div className="!w-full h-[140px] rounded-[60px] bg-[--colors-background-slider] overflow-hidden flex items-center justify-center text-[--colors-textSubtle] font-bold">
              {games.title}
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="my-6">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderListGame;
