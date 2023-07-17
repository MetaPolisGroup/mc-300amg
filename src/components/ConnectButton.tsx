import React from "react";

const ConnectButton = () => {
  return (
    <button className="btn bg-[--colors-primary] min-h-8 h-8 px-4 rounded-2xl border-transparent hover:bg-[--colors-primary]  hover:opacity-[0.65]">
      <span className="hidden text-[--colors-invertedContrast] lg:flex">
        Connect Wallet
      </span>
      <span className="lg:hidden text-[--colors-invertedContrast]">
        Connect
      </span>
    </button>
  );
};

export default ConnectButton;
