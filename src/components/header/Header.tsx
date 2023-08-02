"use client";
import React, { createRef } from "react";
import ConnectWallet from "../ConnectWallet";
import Popup, { PopupRef } from "../ui/Modal";
import NAV_HEADER from "@/constants/navConstants";
import HeaderItem from "./HeaderItem";
import Image from "next/image";
import { Icons } from "../Icons";
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

  const menuModal = createRef<PopupRef>();

  return (
    <header className="w-full z-20 bg-[--colors-backgroundAlt]">
      <nav className="flex justify-between items-center w-full h-full border-b border-[--colors-cardBorder] px-4">
        <div className="navbar p-0 justify-between">
          <div className="navbar-start lg:flex w-auto gap-1">
            <Popup
              ref={menuModal}
              width={300}
              footer={false}
              selector={
                <Icons.MenuIcon
                  className="text-[--colors-textSub]"
                  onClick={() => menuModal.current?.open()}
                />
              }
              closable
              styleContent={{
                background: "var(--colors-backgroundAlt)",
                color: "var(--colors-text)",
              }}
              content={<p>Modal</p>}
            />
            <a
              className="normal-case text-xl text-[--colors-textSubtle]"
              href="/"
            >
              <Image src="/svgs/logo.svg" width={110} height={40} alt="" />
            </a>
            <ul className="menu menu-horizontal p-0 flex-nowrap gap-1 xl:gap-2 hidden lg:flex items-center">
              {renderNavItems()}
            </ul>
          </div>
          <div className="navbar-end gap-2 p-2 w-auto">
            {/* <NetworkSelector /> */}
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
