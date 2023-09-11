import DashboardLayout from "@/components/staking-nfts/DashboardLayout";
import GameDashboardContent from "@/components/staking-nfts/GameDashboardContent";
import React from "react";

const StakingNFTs = () => {
  return (
    <div className="flex flex-col-reverse justify-end md:flex-row min-h-screen bg-[--colors-background]">
      <GameDashboardContent />
      <DashboardLayout />
    </div>
  );
};

export default StakingNFTs;
