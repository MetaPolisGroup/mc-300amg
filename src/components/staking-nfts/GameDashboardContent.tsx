"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import LayoutItemContent from "./LayoutItemContent";
import ListNFTs from "./ListNFTs";

interface IGameDashboardContent {
  isShowListNFTsMobile: boolean;
}

const GameDashboardContent: React.FC<IGameDashboardContent> = ({
  isShowListNFTsMobile,
}) => {
  const [reward, setReward] = useState<string>("0.0");
  const claimReward = () => {};

  const renderContent = () => {
    if (isShowListNFTsMobile)
      return (
        <div className="block md:hidden">
          <ListNFTs />
        </div>
      );

    return (
      <div className="flex flex-wrap max-h-[656px] overflow-y-auto pt-3 gap-2">
        {Array(3)
          .fill(0)
          .map((item, index) => (
            <LayoutItemContent
              key={index}
              // image={item.image}
              // description={item.description}
              // title={item.title}
              // dna={item.dna}
              // date={item.date}
              // tokenId={item.tokenId}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="md:px-24 md:grow md:pt-10">
      <div className="hidden md:block text-4xl text-[--colors-textSub] font-bold">
        Staking
      </div>
      <div>
        <div className="flex items-center justify-center text-[--colors-textSub] gap-2 mt-2">
          <div className="flex-1">
            <p>Total Rewards</p>
            <div className="flex items-center justify-center h-10 bg-black rounded-xl text-white">
              {reward ? reward : 0.0}
            </div>
          </div>
          <div className="flex-1">
            <p>Daily NFTs Staking</p>
            <Button
              disabled={+reward <= 0}
              className="w-full"
              onClick={() => claimReward()}
            >
              Claim
            </Button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default GameDashboardContent;
