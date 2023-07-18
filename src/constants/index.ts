import { AMOUNT_MINIMUM_REQUIRED } from "./amountMinimum";
import { ChainType, chain } from "./chain";
import provider from "./provider";
import { predictionAddr } from "./address/index";
import { predictionABI } from "./abi/index";

const CURRENT_NETWORK = ChainType.BSCTESTNET;

const CURRENCY_UNIT = "BNB";
export const CONSTANTS = {
  ADDRESS: {
    PREDICTION: predictionAddr[CURRENT_NETWORK],
  },
  ABI: {
    PREDICTION: predictionABI[CURRENT_NETWORK],
  },
  AMOUNT_REQUIRED: AMOUNT_MINIMUM_REQUIRED[CURRENCY_UNIT].VALUE,
  CHAIN: chain[CURRENT_NETWORK],
  PROVIDER: provider(CURRENT_NETWORK),
};
