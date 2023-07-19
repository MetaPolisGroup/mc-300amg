import React, { FC } from "react";
import { Icons } from "./Icons";

interface ISwiperNavButtonProps {
  swiperRef: any;
}

const SwiperNavButton: FC<ISwiperNavButtonProps> = ({ swiperRef }) => {
  return (
    <div className="flex m-auto items-center justify-between w-32 bg-[--colors-backgroundAlt] rounded-2xl relative">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="w-8 h-8 p-[2px]"
      >
        <Icons.ArrowLeft className="text-[--colors-primary]" />
      </button>
      <div
        className="absolute left-1/2 -m-8 cursor-pointer"
        onClick={() => swiperRef?.current?.slideTo(3)}
      >
        <Icons.PancakeIcon />
      </div>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="w-8 h-8 p-[2px]"
      >
        <Icons.ArrowRight className="text-[--colors-primary]" />
      </button>
    </div>
  );
};

export default SwiperNavButton;
