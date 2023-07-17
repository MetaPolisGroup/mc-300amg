import React from "react";
import ConnectButton from "./ConnectButton";
import NetworkSelector from "./NetworkSelector";
import SubMenu from "./SubMenu";
import { Icons } from "./Icons";

const Header = () => {
  return (
    <header className="w-full z-20 bg-[--colors-backgroundAlt]">
      <nav className="flex justify-between items-center w-full h-full border-b border-[--colors-cardBorder] px-4">
        <div className="navbar">
          <div className="navbar-start lg:flex">
            <a
              className="normal-case text-xl text-[--colors-textSubtle]"
              href="/"
            >
              daisyUI
            </a>
            <ul className="menu menu-horizontal px-5 gap-2 hidden lg:flex">
              <li className="text-[--colors-textSubtle] font-medium">
                <a>Trade</a>
              </li>
              <li
                tabIndex={0}
                className="text-[--colors-textSubtle] font-medium"
              >
                <details>
                  <summary>Earn</summary>
                  {/* <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul> */}
                </details>
              </li>
              <li className="text-[--colors-textSubtle] font-medium">
                <a>Win</a>
              </li>
              <li className="text-[--colors-textSubtle] font-medium">
                <a>NFT</a>{" "}
              </li>
              <li className="text-[--colors-textSubtle] font-medium">
                <a>Game</a>
              </li>
              <li className="text-[--colors-textSubtle] font-medium">
                <a>...</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-2">
            <Icons.Settings className="hover:cursor-pointer text-[--colors-textSubtle]" />
            <NetworkSelector />
            <ConnectButton />
          </div>
        </div>
      </nav>
      <SubMenu />
    </header>
  );
};

export default Header;
