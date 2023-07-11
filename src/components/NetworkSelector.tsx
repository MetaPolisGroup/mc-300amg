import Image from "next/image";
import React from "react";
import { Icons } from "./Icons";

const NetworkSelector = () => {
  return (
    <div className="dropdown dropdown-hover">
      <label
        tabIndex={0}
        className="flex w-20 gap-2 items-center justify-center bg-[--colors-tertiary] rounded-2xl pr-4 lg:w-full"
      >
        <Image src="/images/bnb.png" width={32} height={32} alt="bnb icon" />
        <span className="hidden text-[--colors-text] font-semibold lg:flex">
          BNB Smart Chain
        </span>
        <Icons.ArrowDown />
      </label>
    </div>
  );
};

export default NetworkSelector;
