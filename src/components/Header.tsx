"use client";
import React from "react";
import NetworkSelector from "./NetworkSelector";
import SubMenu from "./SubMenu";
import { Icons } from "./Icons";
import ConnectWallet from "./ConnectWallet";
import Button from "./ui/Button";
import { publicClient, walletClient } from "@/lib/contract-config";
import { CONSTANTS } from "@/constants";
import { privateKeyToAccount as privateKey } from "viem/accounts";

const Header = () => {
  const callRound = async () => {
    const gasPrice = await publicClient.getGasPrice();
    const gas = await publicClient.estimateContractGas({
      type: "eip1559",
      address: CONSTANTS.ADDRESS.PREDICTION,
      abi: CONSTANTS.ABI.PREDICTION,
      functionName: "executeRound",
      args: ["11", "100000"],
      account: privateKey(
        "0x7476c8c08f10b30ac5aead18e090ff99549c4f28d1b90efde543eb1158e41493"
      ),
    });
    const { request } = await publicClient.simulateContract({
      account: privateKey(
        "0x7476c8c08f10b30ac5aead18e090ff99549c4f28d1b90efde543eb1158e41493"
      ),

      address: CONSTANTS.ADDRESS.PREDICTION,
      abi: CONSTANTS.ABI.PREDICTION,
      functionName: "executeRound",
      args: ["11", "100000"],
      gas,
      type: "eip1559",
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: gasPrice,
    });
    const hash = await walletClient.writeContract(request);
    if (hash) {
      const transaction = await publicClient.waitForTransactionReceipt({
        hash,
      });
      if (transaction?.status === "success") {
        console.log("success");
      }
    }
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
            <Button onClick={callRound}>Call Round</Button>
            <Icons.Settings className="hover:cursor-pointer text-[--colors-textSubtle]" />
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
function privateKeyToAccount(
  arg0: string
): `0x${string}` | import("viem").Account | undefined {
  throw new Error("Function not implemented.");
}
