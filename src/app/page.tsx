import CoinCurrency from "@/components/CoinCurrency";

import CountDown from "@/components/CountDown";
import BetCard from "@/components/bet/BetCard";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2] relative">
      <div className="text-[--colors-failure] p-4">
        <div className="flex flex-nowrap justify-between">
          <CoinCurrency />
          <CountDown min={5} title="5m" />
        </div>
      </div>

      <BetCard />
    </main>
  );
}
