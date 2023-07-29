import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="sticky bg-gradient-to-br from-blue-300 to-green-600 bottom-0 z-50">
      <div className="container md:hidden flex justify-between text-white px-5 py-3">
        <Link
          href={"/prediction/leaderboard"}
          className="flex justify-center flex-col-reverse items-center "
        >
          <span>Leaderboard</span>
          <Icons.Leaderboard />
        </Link>

        <div className="flex justify-center flex-col-reverse items-center">
          <span>Staking</span>
          <Icons.Staking />
        </div>

        <Link
          href={"/referrals"}
          className="flex justify-center flex-col-reverse items-center"
        >
          <span>Referral</span>
          <Icons.Referral />
        </Link>

        {/* <Link
          href={"/"}
          className="flex justify-center flex-col-reverse items-center"
        >
          <span>My Wallet</span>
          <Icons.MyWallet />
        </Link> */}
      </div>
    </div>
  );
};

export default Menu;
