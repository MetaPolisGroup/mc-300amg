import WalletUser from "@/components/referrals/WalletUser";
import React from "react";

const Referrals = () => {
  return (
    <main className="w-full">
      <div className="bg-gradient-to-r from-[--colors-bubblegum1] to-[--colors-bubblegum2] p-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-5xl font-semibold text-[--colors-secondary] md:text-6xl">
            Referrals
          </h1>
        </div>
      </div>
      <div className="bg-[--colors-background] p-6">
        <div className="max-w-[1200px] mx-auto">
          <WalletUser />
        </div>
      </div>
    </main>
  );
};

export default Referrals;