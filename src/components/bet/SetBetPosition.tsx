"use client";
import React, { useEffect, useState } from "react";
import { formatInputField } from "@/utils/format-inputField";
import { nanoid } from "nanoid";
import { Icons } from "../Icons";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { isEmpty } from "lodash";
import { CONSTANTS } from "@/constants";
import { toast } from "react-hot-toast";
import { WalletClient, useAccount, useBalance, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import provider from "@/constants/provider";

interface ISetBetPositionProps {
  showSetBetCard?: boolean;
  upOrDownStatus?: string;
  onEnterUpOrDown?: (status: string) => void;
  onBackward?: (status: boolean) => void;
  onPlaceBet?: (
    id: string,
    status: Pick<IBetData, "status"> | undefined | string,
    value: string
  ) => void;
}

const SetBetPosition: React.FC<ISetBetPositionProps> = ({
  showSetBetCard,
  upOrDownStatus,
  onEnterUpOrDown,
  onBackward,
  onPlaceBet,
}) => {
  const { isConnected, address } = useAccount();

  const signer = CONSTANTS.PROVIDER.getSigner(address);
  const contract = new ethers.Contract(
    CONSTANTS.ADDRESS.PREDICTION,
    CONSTANTS.ABI.PREDICTION,
    signer as any
  );
  // Fix hydrate by using isClient
  const [isClient, setIsClient] = useState(false);
  const { data } = useBalance({
    address: address,
    formatUnits: "ether",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const balance = isClient ? +ethers.formatEther(data?.value!) : 0;
  const [amount, setAmount] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const changePercentageHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;

    const amountModified = ((balance! * +value) / 100).toString();

    setPercentage(+value);
    setAmount(amountModified);
  };

  const validatorInputField = () => {
    let errorMessage = "";
    if (+amount < CONSTANTS.AMOUNT_REQUIRED && !isEmpty(amount))
      return (errorMessage = `A minimum amount of ${CONSTANTS.AMOUNT_REQUIRED} BNB is required`);
    if (balance! < +amount) return (errorMessage = "Insufficient BNB balance");
    return errorMessage;
  };

  const choosePercentageAmountHandler = (value: number) => {
    const amountModified = ((balance! * value) / 100).toString();
    setPercentage(value);
    setAmount(amountModified);
  };

  const buttonName = () => {
    let name = "Confirm";

    if (balance! < +amount || balance! === 0)
      return (name = "Insufficient BNB balance");

    if (Number(amount) === 0 || +amount < CONSTANTS.AMOUNT_REQUIRED)
      return (name = "Enter an amount");
    return name;
  };

  const activeButton = () => {
    let inActive = true;
    if (+amount < balance!) inActive = false;
    if (+amount === 0 || +amount < CONSTANTS.AMOUNT_REQUIRED) inActive = true;
    return inActive;
  };

  const placeBetHandler = async () => {
    setIsLoading(true);
    try {
      // betBull is Bet up

      const currentRound = await contract?.currentEpoch();
      if (currentRound) {
        if (upOrDownStatus === "UP") {
          const betBull = await contract?.betBull(currentRound.toString(), {
            value: ethers.parseUnits(amount, "ether").toString(),
          });
          await betBull.wait();
          console.log("done");
          setIsLoading(false);
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-[--colors-backgroundAlt] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex bg-[--colors-success] p-4 rounded-l-lg">
                <Icons.CheckCircle className="text-[--colors-white]" />
              </div>
              <div className="flex-1 w-0 p-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5"></div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-[--colors-text]">
                      Success!
                    </p>
                    <p className="mt-1 text-sm text-[--colors-text]">
                      {upOrDownStatus} position entered
                    </p>
                    <p className="mt-1 text-sm text-[--colors-primary]">
                      View on BscScan: 0x8439...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-start justify-end text-sm font-medium focus:outline-none"
                >
                  <Icons.X className="text-[--colors-primary]" />
                </button>
              </div>
            </div>
          ));
          if (onPlaceBet)
            onPlaceBet(currentRound.toString(), upOrDownStatus, amount);
        }
        if (upOrDownStatus === "DOWN") {
          const betBear = await contract?.betBear(currentRound.toString(), {
            value: ethers.parseUnits(amount, "ether").toString(),
          });
          await betBear.wait();
          setIsLoading(false);
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-[--colors-backgroundAlt] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex bg-[--colors-success] p-4 rounded-l-lg">
                <Icons.CheckCircle className="text-[--colors-white]" />
              </div>
              <div className="flex-1 w-0 p-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5"></div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-[--colors-text]">
                      Success!
                    </p>
                    <p className="mt-1 text-sm text-[--colors-text]">
                      {upOrDownStatus} position entered
                    </p>
                    <p className="mt-1 text-sm text-[--colors-primary]">
                      View on BscScan: 0x8439...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-start justify-end text-sm font-medium focus:outline-none"
                >
                  <Icons.X className="text-[--colors-primary]" />
                </button>
              </div>
            </div>
          ));
          if (onPlaceBet)
            onPlaceBet(currentRound.toString(), upOrDownStatus, amount);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
              {isClient && data?.symbol}
            </span>
          </div>
        </div>
        <div className="px-4 py-2 bg-[--colors-input] rounded-2xl">
          <Input
            className="text-[--colors-white] text-right"
            placeholder="0.0"
            onKeyDown={formatInputField}
            disabled={isClient && (isConnected ? false : true)}
            onChange={changeAmountHandler}
            value={amount}
          />
        </div>
        <span className="text-[--colors-failure] font-medium mt-1 text-right text-xs">
          {validatorInputField()}
        </span>
        {isClient &&
          (isConnected ? (
            <div className="text-[--colors-textSubtle] font-medium text-sm text-right">
              Balance: {data?.formatted} {data?.symbol}
            </div>
          ) : null)}
        <div className="w-full h-12 relative mb-6">
          <div className="h-8">
            <Icons.HeartIcon />
          </div>

          <input
            type="range"
            min={1}
            max={100}
            step={0.1}
            value={percentage}
            disabled={isClient && (isConnected ? false : true)}
            onChange={changePercentageHandler}
            className="w-full bg-transparent disabled:cursor-not-allowed"
          />

          <div
            className={`-bottom-6 text-[--colors-text] text-xs absolute text-center min-w-[24px]`}
            style={{
              left:
                percentage === 100
                  ? `calc(${percentage}% - 5%)`
                  : `${percentage}%`,
            }}
          >
            {percentage}%
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          {BUTTONS_PERCENT.map((buttonPrecent) => (
            <Button
              key={buttonPrecent.id}
              className="flex items-center rounded-2xl font-semibold justify-center h-5 py-0 px-2 bg-[--colors-tertiary] text-[--colors-primary] text-xs flex-1 hover:bg-[--colors-tertiary] hover:opacity-80 focus:ring-offset-0 focus:ring-0"
              disabled={isClient && (isConnected ? false : true)}
              onClick={() => choosePercentageAmountHandler(buttonPrecent.value)}
            >
              {buttonPrecent.name}
            </Button>
          ))}
        </div>
        <div>
          {isClient &&
            (!isConnected ? (
              <Button
                className="w-full bg-[--colors-primary] text-[--colors-white] hover:bg-[--colors-primary] hover:opacity-[0.8] rounded-2xl"
                type="button"
                disabled
              >
                Please Connect Wallet
              </Button>
            ) : (
              <Button
                className="w-full bg-[--colors-primary] text-[--colors-white] hover:bg-[--colors-primary] hover:opacity-[0.8] rounded-2xl"
                type="button"
                disabled={activeButton() || isLoading}
                onClick={placeBetHandler}
                isLoading={isLoading}
              >
                {buttonName()}
              </Button>
            ))}
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
