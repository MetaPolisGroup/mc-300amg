import React from "react";

const MarketPage = () => {
  return (
    <div className="bg-gradient-to-br py-7 md:py-12 px-3 md:px-6 from-slate-400 to-indigo-800">
      <h1 className="pb-5 text-zinc-100 text-7xl font-bold leading-normal">
        Market
      </h1>

      <div className="flex flex-wrap justify-between gap-y-6">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="w-full lg:w-[48.5%] xl:w-[32.5%] bg-[--colors-backgroundAlt] rounded-[60px] px-6 md:px-10 pt-6 md:pt-10 pb-5 md:pb-7"
            >
              <div className="w-full md:w-[290px] h-12 flex items-center px-4 mb-3 md:mb-5 text-slate-400 text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[20px] border-2 border-slate-400">
                Topic
              </div>

              <div className="mb-5 md:mb-10 text-[--colors-contrast] text-xl font-bold leading-7">
                Lorem ipsum dolor sit amet consectetur. Leo et aliquam imperdiet
                pharetra donec nisl. Et faucibus interdum varius leo eu.
              </div>

              <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
                <div>
                  <div className="text-[--colors-contrast] text-base font-light leading-snug">
                    Total Volumn
                  </div>
                  <div className="text-slate-400 text-[26px] font-bold leading-9">
                    00000000
                  </div>
                </div>

                <div className="w-full sm:w-auto flex flex-wrap gap-y-3 justify-end">
                  <div className="w-full md:max-w-[290px] h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer">
                    <div className="w-auto 2xl:w-[170px] py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                      00000000
                    </div>
                    <div className="flex items-center justify-center text-white text-xl font-bold leading-7">
                      Yes
                    </div>
                  </div>

                  <div className="w-full md:max-w-[290px] h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer">
                    <div className="w-auto 2xl:w-[170px] py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                      00000000
                    </div>
                    <div className="flex items-center justify-center text-white text-xl font-bold leading-7">
                      No
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MarketPage;
