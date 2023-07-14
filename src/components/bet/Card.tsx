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
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        autoHeight={true}
        // centeredSlides={true}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
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
