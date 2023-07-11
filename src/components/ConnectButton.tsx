import React from "react";

const ConnectButton = () => {
  return (
    <button className="btn btn-info min-h-8 h-8 px-4 rounded-2xl">
      <span className="hidden lg:flex">Connect Wallet</span>
      <span className="lg:hidden">Connect</span>
    </button>
  );
};

export default ConnectButton;
