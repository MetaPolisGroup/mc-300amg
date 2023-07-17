"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

const NetworkSelector = () => {
  const { chain } = useNetwork();
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="dropdown dropdown-hover">
      <label
        tabIndex={0}
        className="flex w-20 gap-2 items-center justify-center bg-[--colors-tertiary] rounded-2xl pr-4 lg:w-full"
      >
        <Image src="/images/bnb.png" width={32} height={32} alt="bnb icon" />
        <span className="hidden text-[--colors-text-special] font-semibold lg:flex">
          {isClient && chain && chain.network}
        </span>
        {/* <Icons.ArrowDown className="text-[--colors-text]" /> */}
      </label>
    </div>
  );
};

export default NetworkSelector;
