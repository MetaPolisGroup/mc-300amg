"use client";
import React from "react";
import NetworkSelector from "./NetworkSelector";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SubMenu from "./SubMenu";
import { Icons } from "./Icons";
import Popup, { PopupRef } from "./ui/Modal";
import style from "./header.module.css";
import { motion } from "framer-motion";
import ChangeMode from "./ui/ChangeMode";
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
  const settingPopup = React.createRef<PopupRef>();
  const [isOn, setIsOn] = React.useState(false);
  const [isButton, setIsButton] = React.useState<EActive>();
  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

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
            <Popup
              ref={settingPopup}
              className={style["custom-modal"]}
              footer={false}
              width={485}
              title="Settings"
              closable
              styleContent={{
                background: "var(--colors-backgroundAlt)",
                color: "var(--colors-text)",
              }}
              content={
                <React.Fragment>
                  <span className="text-[--colors-secondary] text-sm font-bold">
                    GLOBAL
                  </span>
                  <div className="leading-[3.5]">
                    <div className="flex justify-between items-center">
                      <span>Dark mode</span>
                      <div>
                        <ChangeMode
                          HWrapper="30px"
                          WWrapper="70px"
                          H="20px"
                          W="20px"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Subgraph Health Indicator</span>
                        <TooltipElement title="?" content="Tooltip" />
                      </div>
                      <SwitchElement isOn={isOn} toggleSwitch={toggleSwitch} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Show username</span>
                        <TooltipElement title="?" content="Tooltip" />
                      </div>
                      <SwitchElement isOn={isOn} toggleSwitch={toggleSwitch} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Token Risk Scanning</span>
                        <TooltipElement title="?" content="Tooltip" />
                      </div>
                      <SwitchElement isOn={isOn} toggleSwitch={toggleSwitch} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Default Transaction Speed (GWEI)</span>
                        <TooltipElement title="?" content="Tooltip" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    {buttons.map((button) => (
                      <ButtonElement
                        key={button.id}
                        content={button.content}
                        isActive={button.id === isButton}
                        action={() => setIsButton(button.id)}
                      />
                    ))}
                  </div>
                </React.Fragment>
              }
              selector={
                <Icons.Settings
                  onClick={() => settingPopup.current?.open()}
                  className="hover:cursor-pointer text-[--colors-textSubtle]"
                />
              }
            />
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
    data-isOn={isOn}
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

const TooltipElement: React.FC<{
  title: React.ReactNode | string;
  content: React.ReactNode | string;
}> = ({ content, title }) => (
  <div className="group max-w-max relative mx-1 flex flex-col items-center justify-center rounded-full">
    <p className="text-xs text-center py-[1px] px-[5px] border rounded-full">
      {title}
    </p>
    <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom  rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
      <div className="flex max-w-xs flex-col items-center">
        <div className="rounded bg-[--colors-tertiary] text-[--colors-text-special] p-2 text-xs text-center shadow-lg">
          {content}
        </div>
        <div
          className=" h-2 w-4 bg-[--colors-tertiary]"
          style={{
            clipPath: "polygon(100% 50%, 0 0, 100% 0, 50% 100%, 0 0)",
          }}
        />
      </div>
    </div>
  </div>
);
