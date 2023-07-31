import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { useAccount } from "wagmi";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { toFixedEtherNumber } from "@/utils/format-number";
import { ethers } from "ethers";

const MyRanking = () => {
  const [userInfo, setUserInfo] = useState<IUser[]>([]);
  const { isConnected, address } = useAccount();
  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "users",
        [["user_address", "==", address as `0x${string}`]],
        (docs) => {
          setUserInfo(docs as IUser[]);
        }
      );
    }
  }, [isConnected, address]);

  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-[--colors-secondary] mb-4 md:text-xl">
        My Ranking
      </h2>
      <div className="overflow-x-auto border-2 border-[--colors-secondary] rounded-[--radii-card]">
        <table className="hidden bg-[--colors-backgroundAlt] lg:table">
          <thead className="border-b-2 border-[--colors-cardBorder]">
            <tr>
              <th></th>
              <th className="text-[--colors-secondary] uppercase text-xs"></th>
              <th className="text-[--colors-secondary] uppercase text-xs text-right">
                NET WINNINGS (BNB)
              </th>
              <th className="text-[--colors-secondary] uppercase text-xs text-center">
                WIN RATE
              </th>
              <th className="text-[--colors-secondary] uppercase text-xs text-center">
                ROUNDS WON
              </th>
              <th className="text-[--colors-secondary] uppercase text-xs text-center">
                ROUNDS PLAYED
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <div className="flex justify-start items-center gap-2">
                  <Icons.AvatarUser className="w-10 h-10" />
                  <span className="text-[--colors-primary] font-bold text-base">
                    {userInfo?.[0]?.nickname}
                  </span>
                </div>
              </td>
              <td>
                <div
                  className={`text-right text-[--colors-success] text-base font-bold`}
                >
                  {userInfo?.[0]?.leaderboard.net_winnings > 0 ? "+" : ""}
                  {userInfo?.[0]?.leaderboard.net_winnings ? Number() : 0}
                </div>
                {/* <div className="text-right text-[--colors-textSubtle] text-xs font-normal">
                  ~$0,03
                </div> */}
              </td>
              <td className="text-[--colors-text] text-center font-medium">
                50%
              </td>
              <td className="text-[--colors-text] text-center font-medium">
                1
              </td>
              <td className="text-[--colors-text] text-center font-medium">
                2
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col p-4 lg:hidden">
          <div className="flex items-center justify-end gap-2 mb-4">
            <div className="text-base text-[--colors-primary] font-bold">
              0x04...43242
            </div>
            <Icons.AvatarUser className="w-10 h-10" />
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[--colors-textSubtle] font-normal text-xs">
              Win Rate
            </span>
            <span className="text-[--colors-text] text-base font-bold">
              50%
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[--colors-textSubtle] font-normal text-xs">
              Net Winnings (BNB)
            </span>
            <div className="flex flex-col justify-between items-end">
              <span className={`text-[--colors-success] font-bold text-base`}>
                +0,00234
              </span>
              <span className="text-[--colors-textSubtle] font-normal text-xs">
                ~$0,03
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[--colors-textSubtle] font-normal text-xs">
              Rounds Won
            </span>
            <span className="text-[--colors-text] text-base font-bold">
              1/2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRanking;
