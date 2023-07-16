import React from "react";
import BetCard from "./BetCard";
import LiveBetCard from "./LiveBetCard";
import HistoryCard from "./HistoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import FutureCard from "./FutureCard";

const Card = () => {
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Swiper
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        // autoHeight={true}
        centeredSlides={true}
        initialSlide={3}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
      >
        <SwiperSlide>
          <HistoryCard />
        </SwiperSlide>
        <SwiperSlide>
          <HistoryCard />
        </SwiperSlide>
        <SwiperSlide>
          <HistoryCard />
        </SwiperSlide>
        <SwiperSlide>
          <LiveBetCard />
        </SwiperSlide>
        <SwiperSlide>
          <BetCard />
        </SwiperSlide>
        <SwiperSlide>
          <FutureCard />
        </SwiperSlide>
        <SwiperSlide>
          <FutureCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Card;
