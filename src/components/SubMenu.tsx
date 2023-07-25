import Link from "next/link";
import React from "react";

const SubMenu = () => {
  return (
    <div className="nav bg-[--colors-backgroundAlt2]">
      <div className="navbar-center flex justify-center">
        <ul className="menu menu-horizontal px-1 overflow-x-auto flex-nowrap lg:flex-wrap">
          <li className="text-[--colors-textSubtle] font-normal">
            <Link href="/">Prediction (BETA)</Link>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <Link href="/chinese-dice">Chinese Dice</Link>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <Link href="/">Trading Reward</Link>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <Link href="/">Trading Competition</Link>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <Link href="/">Lottery</Link>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <Link href="/">Pottery (BETA)</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubMenu;
