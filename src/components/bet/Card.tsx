import React, { useEffect, useRef, useState } from "react";
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
import SwiperNavButton from "../SwiperNavButton";
import { Swiper as SwiperType } from "swiper";
import { publicClient } from "@/lib/contract-config";
import { CONSTANTS } from "@/constants";

const Card = () => {
  const [currentRound, setCurrentRound] = useState<string>("");

  useEffect(() => {
    getCurrentRound();
  }, []);

  const getCurrentRound = async () => {
    const data = await publicClient.readContract({
      address: CONSTANTS.ADDRESS.PREDICTION,
      abi: CONSTANTS.ABI.PREDICTION,
      functionName: "currentEpoch",
      args: [],
    });
    if (data) {
      setCurrentRound(data.toString());
    }
  };
  const swiperRef = useRef<SwiperType>();
  return (
    <React.Fragment>
      <div className="text-center">
        <SwiperNavButton swiperRef={swiperRef} />
      </div>
      <div className="flex justify-center items-center">
        <Swiper
          modules={[Navigation]}
          slidesPerView={"auto"}
          centeredSlides={true}
          initialSlide={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
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
            <BetCard currentRound={currentRound} />
          </SwiperSlide>
          <SwiperSlide>
            <FutureCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Card;
