import React from "react";

import classes from "./SliderBannerGame.module.css";

const SliderBannerGame: React.FC = () => {
  return (
    <div className="mb-9 pb-[80px] px-[0px] sm:px-[10px] lg:px-[96px]">
      <div>
        <div className="h-[480px] bg-[--colors-background-slider] rounded-[60px] overflow-hidden flex items-center justify-center m-3">
          banner 1
        </div>
      </div>
    </div>
  );
};

export default SliderBannerGame;
