import React from "react";
import { Icons } from "../Icons";

const InfoReferral = () => {
  return (
    <div className="gap-5 md:gap-0 flex justify-between text-[--colors-text] my-5 flex-col md:flex-row">
      <div className="border-2 border-[--colors-secondary] rounded-xl w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
        <span>Level</span>
        <Icons.MedalIcon />
      </div>
      <div className="border-2 border-[--colors-secondary] rounded-xl w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
        <span>Deposit Amount</span>
        <span>$00.00</span>
      </div>
      <div className="border-2 border-[--colors-secondary] rounded-xl w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
        <span>Direct Referrals</span>
        <div className="flex items-center gap-2 ">
          <span>0</span>
          <Icons.UserIcon />
        </div>
      </div>
      <div className="border-2 border-[--colors-secondary] rounded-xl w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
        <span>Total Referrals</span>
        <Icons.UserIcon />
      </div>
      <div className="border-2 border-[--colors-secondary] rounded-xl w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
        <span>Total Group Sale</span>
        <span>$00.00</span>
      </div>
    </div>
  );
};

export default InfoReferral;
