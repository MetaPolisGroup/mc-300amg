import CoinCurrency from "@/components/CoinCurrency";

import { clsx } from "clsx";
import Button from "@/components/ui/Button";
import CountDown from "@/components/CountDown";
import BetCard from "@/components/bet/BetCard";

import { Trophy } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { HelpCircle } from "lucide-react";

const LIST_BTN_FEATURE = [
  {
    id: "question",
    icon: <HelpCircle />,
    disabled: false,
    onAction: () => {},
  },
  {
    id: "cup",
    icon: <Trophy />,
    disabled: false,
    onAction: () => {},
  },
  {
    id: "loop",
    icon: <RotateCcw />,
    disabled: true,
    onAction: () => {},
  },
];

export default function Home() {
  const renderListFeature = () => {
    return LIST_BTN_FEATURE.map((feature) => {
      return (
        <Button
          key={feature.id}
          className={clsx(
            "w-12 h-12 !rounded-2xl !p-2",
            feature.disabled &&
              "cursor-no-drop !active:border-none focus:!border-none hidden md:flex",
            !feature.disabled &&
              "bg-[--colors-textSubtle] hover:bg-[--colors-textSubtle] hover:opacity-80"
          )}
        >
          {feature.icon}
        </Button>
      );
    });
  };

  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2]">
      <div className="text-[--colors-failure] p-4">
        <div className="flex flex-nowrap justify-between">
          <CoinCurrency />
          <div className="flex items-center gap-2">
            <CountDown min={5} title="5m" />

            {renderListFeature()}
          </div>
        </div>
      </div>
      <BetCard />
    </main>
  );
}
