import React from "react";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./SliderBannerGame.module.css";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const SliderBannerGame: React.FC = () => {
  return (
    <div className={classes["banner-game"]}>
      <Swiper
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {Array(3)
          .fill(0)
          .map((_, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Link href={"/prediction"}>
                  <div className="mb-9 px-[0px] sm:px-[12px] lg:px-[96px]">
                    <div className=" bg-[--colors-background-slider] rounded-[40px] sm:rounded-[60px] overflow-hidden flex items-center justify-center m-3">
                      <Image
                        src={"/svgs/banner/PRX_prediction_banner-01.svg"}
                        width={1000}
                        height={500}
                        alt=""
                        className="!w-[100%]"
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default SliderBannerGame;
