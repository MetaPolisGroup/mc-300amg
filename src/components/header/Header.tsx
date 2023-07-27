"use client";
import React, { useEffect } from "react";
import NetworkSelector from "../NetworkSelector";
import SubMenu from "../SubMenu";
import ConnectWallet from "../ConnectWallet";
import Button from "../ui/Button";
import { publicClient } from "@/lib/contract-config";
import { CONSTANTS } from "@/constants";
import { privateKeyToAccount as privateKey } from "viem/accounts";
import Popup, { PopupRef } from "../ui/Modal";
import { motion } from "framer-motion";
import ChangeMode from "../ui/ChangeMode";
import { Icons } from "../Icons";

import NAV_HEADER from "@/constants/navConstants";

import { createWalletClient, custom } from "viem";
import TooltipElement from "../ui/Tooltip";
import HeaderItem from "./HeaderItem";
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

const isBrowser = () => typeof window !== "undefined";

const Header = () => {
  const settingPopup = React.createRef<PopupRef>();
  const [isOn, setIsOn] = React.useState(false);
  const [isButton, setIsButton] = React.useState<EActive>();

  let walletClient: any = null;
  if (isBrowser()) {
    walletClient = createWalletClient({
      chain: CONSTANTS.CHAIN,
      transport: custom(window.ethereum as any),
    });
  }

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  //   const gasPrice = await publicClient.getGasPrice();
  //   const gas = await publicClient.estimateContractGas({
  //     type: "eip1559",
  //     address: CONSTANTS.ADDRESS.PREDICTION,
  //     abi: CONSTANTS.ABI.PREDICTION,
  //     functionName: "executeRound",
  //     args: ["11", "100000"],
  //     account: privateKey(
  //       "0x7476c8c08f10b30ac5aead18e090ff99549c4f28d1b90efde543eb1158e41493"
  //     ),
  //   });
  //   const { request } = await publicClient.simulateContract({
  //     account: privateKey(
  //       "0x7476c8c08f10b30ac5aead18e090ff99549c4f28d1b90efde543eb1158e41493"
  //     ),

  //     address: CONSTANTS.ADDRESS.PREDICTION,
  //     abi: CONSTANTS.ABI.PREDICTION,
  //     functionName: "executeRound",
  //     args: ["11", "100000"],
  //     gas,
  //     type: "eip1559",
  //     maxFeePerGas: gasPrice,
  //     maxPriorityFeePerGas: gasPrice,
  //   });
  //   const hash = await walletClient.writeContract(request);
  //   if (hash) {
  //     const transaction = await publicClient.waitForTransactionReceipt({
  //       hash,
  //     });
  //     if (transaction?.status === "success") {
  //       console.log("success");
  //     }
  //   }
  // };

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
              daisyUI
            </a>
            <ul className="menu menu-horizontal p-0 flex-nowrap gap-1 xl:gap-2 hidden lg:flex items-center">
              {renderNavItems()}
            </ul>
          </div>
          <div className="navbar-end gap-2 p-2 w-auto">
            <div className="hidden xl:block">
              <ChangeMode HWrapper="30px" WWrapper="70px" H="20px" W="20px" />
            </div>
            {/* <Button onClick={callRound}>Call Round</Button> */}
            <Popup
              ref={settingPopup}
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
                    {/* <div className="flex justify-between items-center">
                      <span>Dark mode</span>
                      <div>
                        <ChangeMode
                          HWrapper="30px"
                          WWrapper="70px"
                          H="20px"
                          W="20px"
                        />
                      </div>
                    </div> */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Subgraph Health Indicator</span>
                        <TooltipElement title="Tooltip">
                          <Icons.HelpCircleIcon />
                        </TooltipElement>
                      </div>
                      <SwitchElement isOn={isOn} toggleSwitch={toggleSwitch} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Show username</span>

                        <TooltipElement title="Tooltip">
                          <Icons.HelpCircleIcon />
                        </TooltipElement>
                      </div>
                      <SwitchElement isOn={isOn} toggleSwitch={toggleSwitch} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Token Risk Scanning</span>
                        <TooltipElement title="Tooltip">
                          <Icons.HelpCircleIcon />
                        </TooltipElement>
                      </div>
                      <SwitchElement isOn={isOn} toggleSwitch={toggleSwitch} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>Default Transaction Speed (GWEI)</span>
                        <TooltipElement title="Tooltip">
                          <Icons.HelpCircleIcon />
                        </TooltipElement>
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
                <div className="w-[30px]">
                  <Icons.Settings
                    onClick={() => settingPopup.current?.open()}
                    className="hover:cursor-pointer text-[--colors-textSubtle]"
                  />
                </div>
              }
            />
            <NetworkSelector />
            <ConnectWallet />
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
