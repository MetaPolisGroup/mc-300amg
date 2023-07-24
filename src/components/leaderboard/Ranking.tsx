import React from "react";
import { Icons } from "../Icons";
import Button from "../ui/Button";

const Ranking = () => {
  return (
    <div className="bg-[--colors-background] pb-10">
      <div className="overflow-x-auto rounded-[--radii-card] max-w-[1200px] mx-auto">
        <table className="hidden bg-[--colors-backgroundAlt] mb-6 lg:table">
          <thead className="border-b-2 border-[--colors-cardBorder]">
            <tr>
              <th></th>
              <th className="text-[--colors-secondary] uppercase text-xs">
                USER
              </th>
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
            <tr className="!border-b-[--colors-cardBorder] border-b-2">
              <td>
                <div className="text-[--colors-secondary] text-base font-bold">
                  #4
                </div>
              </td>
              <td>
                <div className="flex justify-start items-center gap-2">
                  <Icons.AvatarUser className="w-10 h-10" />
                  <span className="text-[--colors-primary] font-bold text-base">
                    0x5332...342423
                  </span>
                </div>
              </td>
              <td>
                <div
                  className={`text-right text-[--colors-success] text-base font-bold`}
                >
                  +0,055435
                </div>
                <div className="text-right text-[--colors-textSubtle] text-xs font-normal">
                  ~$0,03
                </div>
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
            <tr className="!border-b-[--colors-cardBorder] border-b-2">
              <td>
                <div className="text-[--colors-secondary] text-base font-bold">
                  #4
                </div>
              </td>
              <td>
                <div className="flex justify-start items-center gap-2">
                  <Icons.AvatarUser className="w-10 h-10" />
                  <span className="text-[--colors-primary] font-bold text-base">
                    0x5332...342423
                  </span>
                </div>
              </td>
              <td>
                <div
                  className={`text-right text-[--colors-success] text-base font-bold`}
                >
                  +0,055435
                </div>
                <div className="text-right text-[--colors-textSubtle] text-xs font-normal">
                  ~$0,03
                </div>
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
            <tr className="!border-b-[--colors-cardBorder] border-b-2">
              <td>
                <div className="text-[--colors-secondary] text-base font-bold">
                  #4
                </div>
              </td>
              <td>
                <div className="flex justify-start items-center gap-2">
                  <Icons.AvatarUser className="w-10 h-10" />
                  <span className="text-[--colors-primary] font-bold text-base">
                    0x5332...342423
                  </span>
                </div>
              </td>
              <td>
                <div
                  className={`text-right text-[--colors-success] text-base font-bold`}
                >
                  +0,055435
                </div>
                <div className="text-right text-[--colors-textSubtle] text-xs font-normal">
                  ~$0,03
                </div>
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
        <div className="w-full text-center pb-6 hidden lg:block">
          <Button className="bg-transparent border-2 border-[--colors-primary] rounded-2xl p-6 text-[--colors-primary]">
            View More
          </Button>
        </div>
      </div>
      <div className="text-center w-full lg:hidden">
        <div className="bg-[--colors-backgroundAlt] mb-6 lg:hidden">
          <div className="flex flex-col p-4 border-b-[--colors-cardBorder] border-b-2">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="text-[--colors-secondary] font-bold text-base">
                #4
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="text-base text-[--colors-primary] font-bold">
                  0x04...43242
                </div>
                <Icons.AvatarUser className="w-10 h-10" />
              </div>
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
          <div className="flex flex-col p-4 border-b-[--colors-cardBorder] border-b-2">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="text-[--colors-secondary] font-bold text-base">
                #4
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="text-base text-[--colors-primary] font-bold">
                  0x04...43242
                </div>
                <Icons.AvatarUser className="w-10 h-10" />
              </div>
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
          <div className="flex flex-col p-4 border-b-[--colors-cardBorder] border-b-2">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="text-[--colors-secondary] font-bold text-base">
                #4
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="text-base text-[--colors-primary] font-bold">
                  0x04...43242
                </div>
                <Icons.AvatarUser className="w-10 h-10" />
              </div>
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
        <Button className="bg-transparent border-2 border-[--colors-primary] rounded-2xl p-6 text-[--colors-primary]">
          View More
        </Button>
      </div>
    </div>
  );
};

export default Ranking;
