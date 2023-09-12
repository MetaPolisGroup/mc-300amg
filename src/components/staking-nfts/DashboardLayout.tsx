"use client";
import React, { useState } from "react";

import LayoutItem from "./LayoutItem";
import DashboardLayoutHeader from "./DashboardLayoutHeader";

export interface metadata {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date?: number;
}

const DashboardLayout = () => {
  const [NFTs, setNFTs] = useState<metadata[]>([]);

  return (
    <div className="md:shrink-0 md:w-[400px] bg-[#333]">
      <DashboardLayoutHeader />
      {NFTs?.length ? (
        <div
          className="max-h-[800px] overflow-y-auto mx-[10px]"
          // className={clsx(styles.gameLayoutBody, styles.dashboardLayoutBody)}
        >
          {NFTs.map((items, index) => (
            <LayoutItem
              key={index}
              image={items.image}
              description={items.description}
              name={items.name}
              dna={items.dna}
              edition={items.edition}
            />
          ))}
        </div>
      ) : (
        <div className="text-[#fff] ml-2 text-lg">
          Looks like you do not have any NFTs
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
