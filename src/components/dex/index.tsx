"use client";
import React, { use, useEffect, useState } from "react";

import classes from "./dex.module.css";
import { Icons } from "@/components/Icons";
import { Popover, Radio, Input, Modal } from "antd";
import tokenList from "./tokenList.json";
import Image from "next/image";

const INDEX_TOKEN = {
  ONE: 0,
  TWO: 1,
};

const Dex = () => {
  const [slippage, setSlippage] = useState<number>(2.5);
  const [tokenOne, setTokenOne] = useState<any>(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState<any>(tokenList[1]);
  const [tokenOneAmount, setTokenOneAmount] = useState<number>();
  const [tokenTwoAmount, setTokenTwoAmount] = useState<number>();

  const [tokenChange, setTokenChange] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleChangeSlippage = (e: any) => {
    setSlippage(e.target.value);
  };

  const handleChangeAmount = (e: any) => {
    setTokenOneAmount(e.target.value);
  };

  const handleSwitchToken = () => {
    const one = tokenOne;
    setTokenOne(tokenTwo);
    setTokenTwo(one);
  };

  const handleOpenModal = (indexToken: number) => {
    setTokenChange(indexToken);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setTokenChange(null);
    setIsOpenModal(false);
  };

  const modifyToken = (token: any) => {
    if (tokenChange === INDEX_TOKEN.ONE) {
      setTokenOne(token);
      return handleCloseModal();
    }

    setTokenTwo(token);
    return handleCloseModal();
  };

  const popoverSetting = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleChangeSlippage}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      <section className="w-[90%] md:w-[500px] bg-[--colors-backgroundAlt3] rounded-2xl p-4 text-[--colors-contrast] border-[2px] border-solid border-[--colors-silver]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold">Swap</h4>

          <Popover
            title="Setting"
            trigger="click"
            placement="bottomRight"
            content={popoverSetting}
          >
            <Icons.Settings className="cursor-pointer hover:rotate-90" />
          </Popover>
        </div>

        <div className={classes.boxInput}>
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={handleChangeAmount}
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled />

          <div className={classes.switchButton}>
            <Icons.ArrowDown onClick={handleSwitchToken} />
          </div>

          <div className="text-sm font-semibold opacity-60 absolute top-[6px] left-[15px] select-none">
            Your pay
          </div>
          <div
            className={classes.assetOne}
            onClick={() => handleOpenModal(INDEX_TOKEN.ONE)}
          >
            <Image
              src={tokenOne.img}
              alt="assetOneLogo"
              width={22}
              height={22}
              className="h-[22px] !w-auto ml-1"
            />
            {tokenOne.ticker}
            <Icons.ChevronDown />
          </div>

          <div className="text-sm font-semibold opacity-60 absolute top-[108px] left-[15px] select-none">
            Your receive
          </div>
          <div
            className={classes.assetTwo}
            onClick={() => handleOpenModal(INDEX_TOKEN.TWO)}
          >
            <Image
              src={tokenTwo.img}
              alt="assetOneLogo"
              width={22}
              height={22}
              className="h-[22px] !w-auto ml-1"
            />
            {tokenTwo.ticker}
            <Icons.ChevronDown />
          </div>
        </div>

        <div
          className={`${classes.swapButton} ${
            !tokenOneAmount ? classes.swapButtonDisabled : ""
          }`}
        >
          Connect Wallet
        </div>
      </section>

      {isOpenModal ? (
        <Modal
          title="Select a token"
          open
          onCancel={() => {
            setIsOpenModal(false);
            setTokenChange(null);
          }}
          footer={null}
        >
          <div className={classes.modalContent}>
            {tokenList.map((token: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className={classes.tokenChoice}
                  onClick={() => modifyToken(token)}
                >
                  <Image
                    src={token.img}
                    alt="assetOneLogo"
                    width={22}
                    height={22}
                    className="h-[22px] !w-auto ml-1"
                  />
                  <div className="tokenChoiceNames">
                    <div className={classes.tokenName}>{token.name}</div>
                    <div className={classes.tokenTicker}>{token.ticker}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Dex;
