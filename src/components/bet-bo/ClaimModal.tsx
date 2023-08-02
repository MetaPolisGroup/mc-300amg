import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { getEllipsisTxt } from "@/utils/formmater-address";
import { publicClient } from "@/lib/contract-config";
import { useAccount, useWalletClient } from "wagmi";
import { CONSTANTS, CURRENCY_UNIT } from "@/constants";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { toFixedEtherNumber } from "@/utils/format-number";
import { ethers } from "ethers";
import { isEmpty } from "lodash";

interface IClaimProps {
  titleClaim: string;
  winningRound: number | undefined;
  onCancel: () => void;
}

const ClaimModal: React.FC<IClaimProps> = ({
  winningRound,
  titleClaim,
  onCancel,
}) => {
  const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roundClaimedData, setRoundClaimedData] = useState<IBetData[]>([]);

  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "bets",
        [
          ["user_address", "==", address as `0x${string}`],
          ["epoch", "==", Number(winningRound!)],
        ],
        (docs) => {
          setRoundClaimedData(docs as IBetData[]);
        }
      );
    }
  }, [isConnected, address]);

  const claimHandler = async () => {
    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: CONSTANTS.ADDRESS.PREDICTION,
        abi: CONSTANTS.ABI.PREDICTION,
        functionName: "claim",
        args: [[winningRound]],
      });
      if (request) {
        const hash = await walletClient?.writeContract(request);
        if (hash) {
          const transaction = await publicClient.waitForTransactionReceipt({
            hash,
          });
          if (transaction?.status === "success") {
            setIsLoading(false);
            onCancel();
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
                        {titleClaim}
                      </p>
                      <p className="mt-1 text-sm text-[--colors-text]">
                        Your prizes have been sent to your wallet
                      </p>
                      <a
                        href={`https://testnet.bscscan.com/tx/${0x344324234}`}
                        className="mt-1 text-sm text-[--colors-primary]"
                        target="_blank"
                      >
                        View on BscScan: {getEllipsisTxt("0x4324234")}
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
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      onCancel();
    }
  };

  return (
    <div className="w-full">
      <Icons.Trophy className="m-auto w-14 h-14 text-[--colors-gold] my-10" />
      <div className="flex justify-between font-semibold">
        <span>Collecting</span>
        {}
        <span>
          {!isEmpty(roundClaimedData)
            ? toFixedEtherNumber(
                +ethers.formatEther(BigInt(roundClaimedData?.[0]?.refund)) +
                  +ethers.formatEther(
                    BigInt(roundClaimedData?.[0]?.winning_amount)
                  ),
                2
              )
            : 0}{" "}
          {CURRENCY_UNIT}
        </span>
      </div>
      <p className="text-center text-[--colors-text99] my-2">
        From round {winningRound}
      </p>
      <Button
        variant={"success"}
        isLoading={isLoading}
        className="w-full"
        onClick={claimHandler}
      >
        Confirm
      </Button>
    </div>
  );
};

export default React.memo(ClaimModal);
