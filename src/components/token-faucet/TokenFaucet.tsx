"use client";
import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const TokenFaucet = () => {
  return (
    <>
      <h1 className="text-[--colors-textSub] text-xl mt-6">Token Faucet</h1>
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
          <Input className="text-white px-2" />
          <Button variant="success">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default TokenFaucet;
