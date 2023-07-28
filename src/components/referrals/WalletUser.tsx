"use client";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { getEllipsisTxt } from "@/utils/formmater-address";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Icons } from "../Icons";
import ClipboardCopy from "../ui/ClipboardCopy";

const WalletUser = () => {
  const { isConnected, address } = useAccount();
  const [linkReferral, setLinkReferral] = useState<string>("");

  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "users",
        [["user_address", "==", address as `0x${string}`]],
        (docs) => {
          setLinkReferral(docs?.[0]?.ref);
        }
      );
    }
  }, [isConnected, address]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-[--colors-text] p-3 font-medium">
          Link Referral
        </span>
        <div className="flex justify-between p-3 border-2 border-[--colors-secondary] rounded-xl">
          <span className="text-[--colors-primary] font-bold text-[9px] lg:text-base">
            {linkReferral}
          </span>
          <span>
            <ClipboardCopy copyText={linkReferral} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletUser;
