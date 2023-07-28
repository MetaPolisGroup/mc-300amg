"use client";
import { getEllipsisTxt } from "@/utils/formmater-address";
import React from "react";
import { useAccount } from "wagmi";
import Button from "../ui/Button";

const ReferralTree = () => {
  const { address } = useAccount();
  return (
    <div className="text-white  p-3 border-2 border-[--colors-secondary] rounded-xl">
      <div>
        <div className="text-xl mb-8 md:text-3xl">Referral Tree</div>
        <div>
          <Button className="bg-gradient-to-r from-[--colors-lightBlueLeft] to-[--colors-lightBlueRight] text-center py-2 rounded-2xl">
            {getEllipsisTxt(address!, 6)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralTree;
