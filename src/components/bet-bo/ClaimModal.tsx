import React from "react";
import { Icons } from "../Icons";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { getEllipsisTxt } from "@/utils/formmater-address";

interface IClaimProps {
  winningRound: string;
}

const ClaimModal: React.FC<IClaimProps> = ({ winningRound }) => {
  const claimHandler = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-[--colors-backgroundAlt] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex bg-[--colors-success] p-4 rounded-l-lg">
          <Icons.XCircle className="text-[--colors-white]" />
        </div>
        <div className="flex-1 w-0 p-2">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5"></div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-[--colors-text]">
                Winning collected!
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
  };

  return (
    <div className="w-full">
      <Icons.Trophy className="m-auto w-14 h-14 text-[--colors-gold] my-10" />
      <div className="flex justify-between font-semibold">
        <span>Collecting</span>
        <span>0.0453 BNB</span>
      </div>
      <p className="w-full text-right text-[--colors-text99]">~10.93$</p>
      <p className="text-center text-[--colors-text99] my-2">
        From round {winningRound}
      </p>
      <Button variant={"success"} className="w-full" onClick={claimHandler}>
        Confirm
      </Button>
    </div>
  );
};

export default ClaimModal;
