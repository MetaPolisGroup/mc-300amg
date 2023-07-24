import { getEllipsisTxt } from "@/utils/formmater-address";
import React from "react";

const WalletUser = () => {
  return (
    <div className="flex justify-between items-center p-3 border-2 border-[--colors-secondary] rounded-[--radii-card]">
      <span className="text-[--colors-text] font-medium">Wallet</span>
      <span className="text-[--colors-primary] font-bold text-base">
        {getEllipsisTxt("0x5f84f858895BCC8261f1723B93D2C26a8cF16738")}
      </span>
    </div>
  );
};

export default WalletUser;
