"use client";
import React, { useState } from "react";
import { debounceInput, formatInputField } from "@/lib/utils";
import { nanoid } from "nanoid";
import { Icons } from "../Icons";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isEmpty } from "lodash";

interface ISetBetPositionProps {
  showSetBetCard?: boolean;
  upOrDownStatus?: string;
  onEnterUpOrDown?: (status: string) => void;
  onBackward?: (status: boolean) => void;
}

const SetBetPosition: React.FC<ISetBetPositionProps> = ({
  showSetBetCard,
  upOrDownStatus,
  onEnterUpOrDown,
  onBackward,
}) => {
  const isConnected = true;
  const balance = 0.00703629299999992;

  const [amount, setAmount] = useState<string>("");

  const changeUpOrDownHandler = (status: string) => {
    if (onEnterUpOrDown) return onEnterUpOrDown(status);
  };

  const backwardHandler = () => {
    if (onBackward) return onBackward(false);
  };

  const changeAmountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setAmount(value);
  };

  const validatorInputField = () => {
    let errorMessage = "";
    if (+amount < 0.001 && !isEmpty(amount))
      return (errorMessage = "A minimum amount of 0.001 BNB is required");
    if (balance < +amount) return (errorMessage = "Insufficient BNB balance");
    return errorMessage;
  };

  const buttonName = () => {
    let name = "Confirm";

    if (Number(amount) === 0 || +amount < 0.001)
      return (name = "Enter an amount");
    if (balance < +amount) return (name = "Insufficient BNB balance");
    return name;
  };

  const activeButton = () => {
    let inActive = true;
    if (+amount < balance) inActive = false;
    if (+amount === 0 || +amount < 0.001) inActive = true;
    return inActive;
  };

  return (
    <div
      className={`card absolute z-10 w-80 shadow-xl backface-hidden translate-rotateY bg-[--colors-backgroundAlt] ${
        showSetBetCard && "z-20"
      }`}
    >
      <div className="flex justify-between items-center bg-gradient-to-r from-[--colors-gradientCardHeaderFrom] to-[--colors-gradientCardHeaderTo] p-4 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Icons.ArrowLeft
            className="text-[--colors-text] cursor-pointer"
            onClick={backwardHandler}
          />
          <span className="text-[--colors-text]">Set Position</span>
        </div>
        {upOrDownStatus === "UP" ? (
          <Button
            className="text-[--colors-white] bg-[--colors-success] hover:bg-[--colors-success] hover:opacity-[0.8]"
            type="button"
            onClick={() => changeUpOrDownHandler("DOWN")}
          >
            <Icons.ArrowDown className="rotate-180" />
            <span>UP</span>
          </Button>
        ) : (
          <Button
            className="text-[--colors-white] bg-[--colors-failure] hover:bg-[--colors-failure] hover:opacity-[0.8]"
            type="button"
            onClick={() => changeUpOrDownHandler("UP")}
          >
            <Icons.ArrowDown />
            <span>DOWN</span>
          </Button>
        )}
      </div>
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <span className="text-[--colors-textSubtle] font-medium text-base">
            Commit:
          </span>
          <div className="flex items-center gap-1">
            <Icons.BNBIcon />
            <span className="text-[--colors-text] font-semibold text-base">
              BNB
            </span>
          </div>
        </div>
        <div className="px-4 py-2 bg-[--colors-input] rounded-2xl">
          <Input
            className="text-[--colors-white] text-right"
            placeholder="0.0"
            onKeyDown={formatInputField}
            disabled={isConnected ? false : true}
            onChange={changeAmountHandler}
            value={amount}
          />
        </div>
        <span className="text-[--colors-failure] font-medium mt-1 text-right text-xs">
          {validatorInputField()}
        </span>
        {isConnected ? (
          <div className="text-[--colors-textSubtle] font-medium text-sm text-right">
            Balance: {balance}
          </div>
        ) : null}
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
            45%
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          {BUTTONS_PERCENT.map((button_precent) => (
            <Button
              key={button_precent.id}
              className="flex items-center rounded-2xl font-semibold justify-center h-5 py-0 px-2 bg-[--colors-tertiary] text-[--colors-primary] text-xs flex-1 hover:bg-[--colors-tertiary] hover:opacity-80 focus:ring-offset-0 focus:ring-0"
              disabled={isConnected ? false : true}
            >
              {button_precent.name}
            </Button>
          ))}
        </div>
        <div>
          {!isConnected ? (
            <Button
              className="w-full bg-[--colors-primary] text-[--colors-white] hover:bg-[--colors-primary] hover:opacity-[0.8] rounded-2xl"
              type="button"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              className="w-full bg-[--colors-primary] text-[--colors-white] hover:bg-[--colors-primary] hover:opacity-[0.8] rounded-2xl"
              type="button"
              disabled={activeButton()}
            >
              {buttonName()}
            </Button>
          )}
        </div>
        <p className="text-[--colors-textSubtle] font-medium text-xs">
          You won&apos;t be able to remove or change your position once you
          enter it.
        </p>
      </div>
    </div>
  );
};

export default React.memo(SetBetPosition);

const BUTTONS_PERCENT = [
  {
    id: nanoid(),
    name: "10%",
    value: 10,
  },
  {
    id: nanoid(),
    name: "25%",
    value: 25,
  },
  {
    id: nanoid(),
    name: "50%",
    value: 50,
  },
  {
    id: nanoid(),
    name: "75%",
    value: 75,
  },
  {
    id: nanoid(),
    name: "Max",
    value: 100,
  },
];
