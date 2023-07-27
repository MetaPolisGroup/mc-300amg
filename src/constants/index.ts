import { AMOUNT_MINIMUM_REQUIRED } from "./amountMinimum";
import { ChainType, chain } from "./chain";
import provider from "./provider";
import { predictionAddr } from "./address/index";
import { predictionABI } from "./abi/index";
import { tokenAddr } from "./address/token-address";
import { tokenABI } from "./abi/token-abi";

const CURRENT_NETWORK = ChainType.BSCTESTNET;

export const CURRENCY_UNIT = "BNB";
export const CONSTANTS = {
  ADDRESS: {
    TOKEN: tokenAddr[CURRENT_NETWORK],
    PREDICTION: predictionAddr[CURRENT_NETWORK],
  },
  ABI: {
    TOKEN: tokenABI[CURRENT_NETWORK],
    PREDICTION: predictionABI[CURRENT_NETWORK],
  },
  AMOUNT_REQUIRED: AMOUNT_MINIMUM_REQUIRED[CURRENCY_UNIT].VALUE,
  CHAIN: chain[CURRENT_NETWORK],
  PROVIDER: provider(CURRENT_NETWORK),
};
