import { AMOUNT_MINIMUM_REQUIRED } from "./amountMinimum";
import { ChainType, chain } from "./chain";
import provider from "./provider";
import { predictionAddr, marketAddr, tokenAddr } from "./address/index";
import { predictionABI, marketABI, tokenABI } from "./abi/index";

const CURRENT_NETWORK = ChainType.BSCTESTNET;

export const CURRENCY_UNIT = "PRX";

export const BOXING_START_DATE = 10 * 24 * 60 * 60 * 1000;

export const CONSTANTS = {
  ADDRESS: {
    TOKEN: tokenAddr[CURRENT_NETWORK],
    PREDICTION: predictionAddr[CURRENT_NETWORK],
    MARKET: marketAddr[CURRENT_NETWORK],
  },
  ABI: {
    TOKEN: tokenABI[CURRENT_NETWORK],
    PREDICTION: predictionABI[CURRENT_NETWORK],
    MARKET: marketABI[CURRENT_NETWORK],
  },
  AMOUNT_REQUIRED: AMOUNT_MINIMUM_REQUIRED[CURRENCY_UNIT].VALUE,
  CHAIN: chain[CURRENT_NETWORK],
  PROVIDER: provider(CURRENT_NETWORK),
};
