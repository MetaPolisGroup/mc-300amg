import { AMOUNT_MINIMUM_REQUIRED } from "./amountMinimum";
import { ChainType, chain } from "./chain";
import provider from "./provider";
import {
  predictionAddr,
  marketAddr,
  tokenAddr,
  diceAddr,
} from "./address/index";
import { predictionABI, marketABI, tokenABI, diceABI } from "./abi/index";

const CURRENT_NETWORK = ChainType.BSCTESTNET;

export const CURRENCY_UNIT = "PRX";

export const BOXING_START_DATE = new Date("2023-09-10");

export const CONSTANTS = {
  ADDRESS: {
    TOKEN: tokenAddr[CURRENT_NETWORK],
    PREDICTION: predictionAddr[CURRENT_NETWORK],
    MARKET: marketAddr[CURRENT_NETWORK],
    DICE: diceAddr[CURRENT_NETWORK],
  },
  ABI: {
    TOKEN: tokenABI[CURRENT_NETWORK],
    PREDICTION: predictionABI[CURRENT_NETWORK],
    MARKET: marketABI[CURRENT_NETWORK],
    DICE: diceABI[CURRENT_NETWORK],
  },
  AMOUNT_REQUIRED: AMOUNT_MINIMUM_REQUIRED[CURRENCY_UNIT].VALUE,
  CHAIN: chain[CURRENT_NETWORK],
  PROVIDER: provider(CURRENT_NETWORK),
};
