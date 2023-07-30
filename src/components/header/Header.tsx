"use client";
import React from "react";
import NetworkSelector from "../NetworkSelector";

import ConnectWallet from "../ConnectWallet";
import { PopupRef } from "../ui/Modal";
import { motion } from "framer-motion";

import NAV_HEADER from "@/constants/navConstants";

import HeaderItem from "./HeaderItem";
import Image from "next/image";
enum EActive {
  "Default" = 1,
  "Stand",
  "Fast",
  "Instand",
}
const buttons = [
  { id: EActive.Default, content: "Default" },
  { id: EActive.Stand, content: "Standard (3)" },
  { id: EActive.Fast, content: "Fast (4)" },
  { id: EActive.Instand, content: "Instant (5)" },
];

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  const renderNavItems = () => {
    return NAV_HEADER.map((nav) => {
      return <HeaderItem key={nav.id} data={nav} />;
    });
  };

  return (
    <header className="w-full z-20 bg-[--colors-backgroundAlt]">
      <nav className="flex justify-between items-center w-full h-full border-b border-[--colors-cardBorder] px-4">
        <div className="navbar p-0 justify-between">
          <div className="navbar-start lg:flex w-auto gap-1">
            <a
              className="normal-case text-xl text-[--colors-textSubtle]"
              href="/"
            >
              <Image src={"./svgs/logo.svg"} width={110} height={40} alt="" />
            </a>
            <ul className="menu menu-horizontal p-0 flex-nowrap gap-1 xl:gap-2 hidden lg:flex items-center">
              {renderNavItems()}
            </ul>
          </div>
          <div className="navbar-end gap-2 p-2 w-auto">
            <NetworkSelector />
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

const ButtonElement: React.FC<{
  content?: React.ReactNode | string;
  action?: () => void;
  isActive?: boolean;
}> = ({ action, content, isActive }) => (
  <button
    className={`rounded-2xl ${
      isActive
        ? "bg-[--colors-primary] text-[--colors-invertedContrast]"
        : " bg-[--colors-tertiary] text-[--colors-primary]"
    } mt-[4px] font-bold text-[16px] py-[5px] px-[12px]`}
    onClick={() => action?.()}
  >
    {content}
  </button>
);

const SwitchElement: React.FC<{
  isOn: boolean;
  toggleSwitch: () => void;
}> = ({ isOn, toggleSwitch }) => (
  <div
    data-ison={isOn}
    onClick={toggleSwitch}
    className={`flex-start flex h-[30px] w-[70px] rounded-[50px]  p-[5px] shadow-inner hover:cursor-pointer  ${
      isOn ? "place-content-end bg-[--colors-success]" : "bg-[--colors-input]"
    }`}
  >
    <motion.div
      className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[--colors-backgroundAlt] hover:shadow-inner hover:shadow-purple-800 transition-shadow duration-150"
      layout
      transition={spring}
    />
  </div>
);
