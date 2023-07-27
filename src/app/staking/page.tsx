import React from "react";
import Left from "../../components/staking/Left";
import Right from "../../components/staking/Right";

const Staking = () => {
  return (
    <main className="w-full">
      <div className="bg-[--colors-background] text-white p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="items-center p-3 border-2 border-[--colors-secondary] rounded-md">
            <div className="flex justify-between flex-wrap items-center">
              <span className="text-3xl">Logo≈$1.793297</span>
              <div className="flex flex-wrap items-center gap-5">
                <div className="border my-3 md:my-0 bg-[#222121] rounded px-3 py-2 flex items-center gap-5">
                  <span>Total Staked:</span>
                  <span>2,490,093.91 ≈ 4,467,810.78</span>
                </div>
                <div className="border bg-[#222121] rounded px-3 py-2 flex items-center gap-5">
                  <span>Total Staked:</span>
                  <span>2,490,093.91 ≈ 4,467,810.78</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-y-5 md:gap-5 grid-cols-1 md:grid-cols-3 mt-4">
            <Left />
            <Right />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Staking;
