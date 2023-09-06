"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import { CONSTANTS } from "@/constants";
import Input from "../ui/Input";
import { formatInputField } from "@/utils/format-inputField";

const MintNFTs = () => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleClick = () => {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuantity(+value);
  };

  const updateQuantity = (operator: string) => {
    if (operator === "+") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="metaportal_fn_mintbox">
      <div className="mint_right">
        {/* <Card
            hoverable
            cover={
              <Image
                className="imageBox"
                width={600}
                height={425}
                alt="example"
                src="/manahubs-box.gif"
              />
            }
          /> */}
      </div>
      <div className="mint_left">
        <div className="mint_title">
          <span>Public Mint is Live</span>
        </div>
        <div className="mint_list">
          <ul>
            <li>
              <div className="item">
                <h4>Price</h4>
                <div className="text-2xl flex justify-between">
                  <span>{CONSTANTS.COLLECTIONS?.statistics.floorPrice}</span>
                  <span>BNB</span>
                  {/* <select style={{ border: "none" }} onChange={selectCurrent}>
                        <option value="BNB">BNB</option>
                        <option value="BUSD">BUSD</option>
                        <option value="USDT">USDT</option>
                      </select> */}
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <h4>Remaining</h4>
                <h3>{CONSTANTS.COLLECTIONS?.statistics?.totalItems}</h3>
              </div>
            </li>
            <li>
              <div className="item">
                <h4>Quantity</h4>
                <div className="flex items-center">
                  <span
                    className="decrease cursor-pointer"
                    onClick={() => updateQuantity("-")}
                  >
                    -
                  </span>
                  <Input
                    min={0}
                    placeholder="0.0"
                    onKeyDown={formatInputField}
                    onChange={handleChange}
                    className="mx-4 text-right px-2"
                    value={quantity}
                  />

                  <span
                    className="increase cursor-pointer"
                    onClick={() => updateQuantity("+")}
                  >
                    +
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <h4>Total Price</h4>
                <h3>
                  <span className="total_price">
                    {(
                      (CONSTANTS.COLLECTIONS?.statistics
                        ? +CONSTANTS.COLLECTIONS.statistics.floorPrice
                        : 0) * quantity
                    ).toFixed(2)}
                  </span>
                  <span> BNB + GAS</span>
                </h3>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="mint_desc"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={handleClick}
            className="metaportal_fn_button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ margin: "0 10px" }}>UNBOX</span>
          </Button>
          <p
            style={{ marginTop: "0", marginLeft: "20px" }}
            className="text-[--colors-textSub]"
          >
            By clicking UNBOX button, you agree to our{" "}
            <a href="#">Terms of Service</a> and our{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MintNFTs;
