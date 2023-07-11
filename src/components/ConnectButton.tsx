import React from "react";

const ConnectButton = () => {
  return (
    <button className="btn bg-[--colors-primary] min-h-8 h-8 px-4 rounded-2xl border-transparent hover:bg-[--colors-primary] text-[--colors-white] hover:opacity-[0.65]">
      <span className="hidden lg:flex">Connect Wallet</span>
      <span className="lg:hidden">Connect</span>
    </button>
  );
};

export default ConnectButton;
