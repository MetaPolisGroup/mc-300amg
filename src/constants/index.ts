import { AMOUNT_MINIMUM_REQUIRED } from "./amountMinimum";
import { ChainType, chain } from "./chain";
import provider from "./provider";

const CURRENT_NETWORK = ChainType.SEPOLIA;

const CURRENCY_UNIT = "BNB";
export const CONSTANTS = {
  AMOUNT_REQUIRED: AMOUNT_MINIMUM_REQUIRED[CURRENCY_UNIT].VALUE,
  CHAIN: chain[CURRENT_NETWORK],
  PROVIDER: provider(CURRENT_NETWORK),
};
