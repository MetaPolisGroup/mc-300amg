"use client";
import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Address } from "viem";
import { publicClient } from "@/lib/contract-config";
import { useAccount, useWalletClient } from "wagmi";
import { CONSTANTS } from "@/constants";
import { getEllipsisTxt } from "@/utils/formmater-address";
import toast from "react-hot-toast";
import { Icons } from "../Icons";

const TokenFaucet = () => {
  const [addressValue, setAddressValue] = useState<string>("");
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeAddressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.trim().length !== 0 && value !== undefined) {
      setAddressValue(value);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: CONSTANTS.ADDRESS.FAUCET,
        abi: CONSTANTS.ABI.FAUCET,
        functionName: "drip",
        args: [addressValue],
      });
      if (request) {
        const hash = await walletClient?.writeContract(request);

        if (hash) {
          const transaction = await publicClient.waitForTransactionReceipt({
            hash,
          });
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
                      Transaction Submitted!
                    </p>
                    <p className="mt-1 text-sm text-[--colors-text]">
                      Your transaction has been sent!
                    </p>
                    {/* <a
                          href={`https://testnet.bscscan.com/tx/${transaction.transactionHash}`}
                          className="mt-1 text-sm text-[--colors-primary]"
                          target="_blank"
                        >
                          View on BscScan:{" "}
                          {getEllipsisTxt(transaction.transactionHash)}
                        </a> */}
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

          if (transaction?.status === "success") {
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
                        Mint is successfull!
                      </p>
                      <a
                        href={`https://testnet.bscscan.com/tx/${transaction.transactionHash}`}
                        className="mt-1 text-sm text-[--colors-primary]"
                        target="_blank"
                      >
                        View on BscScan:{" "}
                        {getEllipsisTxt(transaction.transactionHash)}
                      </a>
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
          }
          if (transaction?.status === "reverted") {
            setIsLoading(false);
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-[--colors-backgroundAlt] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex bg-[--colors-failure] p-4 rounded-l-lg">
                  <Icons.XCircle className="text-[--colors-white]" />
                </div>
                <div className="flex-1 w-0 p-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5"></div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-[--colors-text]">
                        Error!
                      </p>
                      <p className="mt-1 text-sm text-[--colors-text]">
                        Mint is failed!
                      </p>
                      <a
                        href={`https://testnet.bscscan.com/tx/${transaction.transactionHash}`}
                        className="mt-1 text-sm text-[--colors-failure]"
                        target="_blank"
                      >
                        View on BscScan:{" "}
                        {getEllipsisTxt(transaction.transactionHash)}
                      </a>
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
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-[--colors-textSub] text-4xl mt-6">Token Faucet</h1>
      <div className=" min-h-[50vh] md:min-h-screen flex flex-col justify-center md:px-96">
        <h2 className="text-[--colors-textSub] text-xl">
          Ethereum ERC20 Token Faucet
        </h2>
        <h1 className="text-4xl text-[--colors-primaryDark]">
          Mint tokens to an address
        </h1>
        <form className="flex flex-col gap-2 mt-7">
          <label htmlFor="address" className="text-[--colors-textSub]">
            Address
          </label>
          <Input
            className="text-[--colors-textSub] px-2"
            placeholder="0x0000"
            onChange={changeAddressHandler}
            value={addressValue}
          />
          <Button
            // variant="success"
            type="button"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            Submits
          </Button>
        </form>
      </div>
    </>
  );
};

export default TokenFaucet;
