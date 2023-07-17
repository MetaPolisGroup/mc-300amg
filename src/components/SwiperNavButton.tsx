import React from "react";
import { useSwiper } from "swiper/react";
import { Icons } from "./Icons";

const SwiperNavButton = () => {
  const swiper = useSwiper();
  console.log(swiper);
  return (
    <div>
      <button onClick={() => swiper.slidePrev()}>
        <Icons.ArrowLeft />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <Icons.ArrowRight />
      </button>
    </div>
  );
};

export default SwiperNavButton;
