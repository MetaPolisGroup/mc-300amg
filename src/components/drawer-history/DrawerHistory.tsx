"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import HistoryItem from "./HistoryItem";
import { isEmpty } from "lodash";
import { Icons } from "../Icons";

import {
  LIST_MODE,
  LIST_RADIO,
  MODE,
  RADIO,
  RESULT_STATUS,
} from "@/constants/history";
import { useAccount } from "wagmi";
import getDataFileredByOnSnapshot from "@/helpers/getDataByOnSnapshot";
import { DocumentData } from "firebase/firestore";

interface IDrawerHistory {
  open: boolean;
  onClose: (value: boolean) => void;
}

const DrawerHistory: React.FC<IDrawerHistory> = ({ open, onClose }) => {
  const { isConnected, address } = useAccount();
  const [mode, setMode] = useState<any>(LIST_MODE[0]);
  const [dataHistory, setDataHistory] = useState<DocumentData[]>([]);
  const [radioChecked, setRadioChecked] = useState<string>(RADIO.ALL);

  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "bets",
        [["user_address", "==", address as `0x${string}`]],
        (docs: DocumentData) => {
          setDataHistory(docs as DocumentData[]);
        }
      );
    }
  }, [isConnected, address]);

  const handleSelectRadio = (value: string) => {
    setRadioChecked(value);

    if (value === RADIO.COLLECTED) {
      return setDataHistory(
        FAKE_DATA.filter(
          (item) =>
            item.is_collected === true && item.result === RESULT_STATUS.WIN
        )
      );
    }

    if (value === RADIO.UNCOLECTED) {
      return setDataHistory(
        FAKE_DATA.filter(
          (item) =>
            item.is_collected === false && item.result === RESULT_STATUS.WIN
        )
      );
    }

    return setDataHistory(FAKE_DATA);
  };

  const renderMode = () => {
    return (
      <div className="flex justify-between bg-[--colors-input] h-8 rounded-2xl border-[1px] border-solid border-[--colors-inputSecondary] mb-4">
        {LIST_MODE.map((btn) => {
          return (
            <button
              key={btn.id}
              className={clsx(
                "w-1/2 text-base font-bold",
                btn.id !== mode.id && "text-[--colors-textSubtle]",
                btn.id === mode.id &&
                  "bg-[--colors-textSubtle] text-[--colors-backgroundAlt] rounded-2xl"
              )}
              onClick={() => {
                setMode(btn);
              }}
            >
              {btn.title}
            </button>
          );
        })}
      </div>
    );
  };

  const renderFilter = () => {
    if (mode.id === MODE.PNL) return null;

    const renderListRadio = () => {
      return LIST_RADIO.map((radio) => {
        return (
          <div key={radio} className="flex gap-1">
            <div
              className={clsx(
                "relative w-6 h-6 cursor-pointer  rounded-full border-2 border-solid",
                radio === radioChecked &&
                  "border-[--colors-success] bg-[--colors-success]",
                radio !== radioChecked &&
                  "border-[--colors-disabled] bg-[--colors-cardBorder]"
              )}
              onClick={() => handleSelectRadio(radio)}
            >
              <div
                className={clsx(
                  radio === radioChecked &&
                    "absolute w-3 h-3 bg-[--colors-backgroundAlt]  rounded-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                )}
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleSelectRadio(radio)}
            >
              {radio}
            </div>
          </div>
        );
      });
    };

    return (
      <div>
        <div className="text-[--colors-textSubtle] text-xs font-medium">
          Filter
        </div>
        <div className="flex gap-4 text-[--colors-text] text-base font-medium">
          {renderListRadio()}
        </div>
      </div>
    );
  };

  const renderHeaderContent = () => {
    if (mode.id === MODE.PNL) {
      return null;
    }

    return (
      <div>
        <div className="p-4 cursor-pointer border-b-2 border-solid border-[--colors-cardBorder] font-medium">
          <p>Showing history for Prediction v0.2</p>
          <p className="flex gap-1 items-center text-[--colors-primary] text-base">
            Check for unclaimed v0.1 winnings{" "}
            <Icons.ChevronRight className="w-5 h-5" />
          </p>
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (mode.id === MODE.ROUNDS && !isEmpty(dataHistory)) {
      return dataHistory
        .sort((a, b) => b.epoch - a.epoch)
        .map((data) => <HistoryItem key={data.id} data={data} />);
    }

    return (
      <div className="text-center p-6">
        <p className="mb-2 text-xl font-bold">
          No prediction history available
        </p>
        <p className="text-base font-medium">
          If you are sure you should see history here, make sure you’re
          connected to the correct wallet and try again.
        </p>
      </div>
    );
  };

  const renderMainContent = () => {
    if (!open) return null;

    return (
      <>
        <div
          className="p-4"
          style={{ background: "var(--colors-gradientBubblegum)" }}
        >
          <div className="flex justify-between mb-8">
            <div className="text-[--colors-text] text-xl font-bold">
              History
            </div>
            <button
              className="text-[--colors-primary] flex items-center gap-2 text-base font-bold"
              onClick={() => onClose(false)}
            >
              Close <Icons.ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {renderMode()}
          {renderFilter()}
        </div>

        <div className="h-full bg-[--colors-backgroundAlt] text-[--colors-text]">
          <div className="overflow-y-auto max-h-[90vh] lg:max-h-[75vh]">
            {renderHeaderContent()}

            {renderHistory()}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={clsx(
        open && "w-[100%] lg:w-[385px] transition-transform translate-x-0",
        !open && "w-0 transition-transform transform translate-x-full"
      )}
    >
      {renderMainContent()}
    </div>
  );
};

export default DrawerHistory;

const FAKE_DATA = [
  {
    id: "FAKE_DATA1",
    result: "WIN",
    round: 188576,
    is_collected: true,
    winning_amount: "+0,0011",
    user_history: {
      direction: "DOWN",
      position: "0,0010",
      about: "0.26",
      amount_to_collect: "0,0021",
    },
    round_history: {
      closed_price: "259,2748",
      result: "DOWN",
      result_price: "-0,0835",
      locked_price: "259,3582",
      prize_pool: "12,6345",
      up: "1,78",
      up_value: "6,7620",
      down: "2,15",
      down_value: "5,8725",
    },
  },
  {
    id: "FAKE_DATA3",
    result: "WIN",
    round: 188576,
    is_collected: false,
    winning_amount: "+0,0011",
    user_history: {
      direction: "DOWN",
      position: "0,0010",
      about: "0.26",
      amount_to_collect: "0,0021",
    },
    round_history: {
      closed_price: "259,2748",
      result: "DOWN",
      result_price: "-0,0835",
      locked_price: "259,3582",
      prize_pool: "12,6345",
      up: "1,78",
      up_value: "6,7620",
      down: "2,15",
      down_value: "5,8725",
    },
  },
  {
    id: "FAKE_DATA2",
    result: "LOSE",
    round: 187792,
    is_collected: true,
    winning_amount: "-0,0010",
    user_history: {
      direction: "UP",
      position: "0,0010",
      about: "0.24",
      amount_to_collect: "0,0021",
    },
    round_history: {
      closed_price: "248,1627",
      result: "DOWN",
      result_price: "-0,1863",
      locked_price: "248,3490",
      prize_pool: "20,5997",
      up: "3,16",
      up_value: "6,5227",
      down: "1,46",
      down_value: "14,0770",
    },
  },
];
