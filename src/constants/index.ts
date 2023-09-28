import { AMOUNT_MINIMUM_REQUIRED } from "./amountMinimum";
import { ChainType, chain } from "./chain";
import provider from "./provider";
import {
  predictionAddr,
  marketAddr,
  tokenAddr,
  diceAddr,
  nftAddr,
  faucetAddr,
} from "./address/index";
import {
  predictionABI,
  marketABI,
  tokenABI,
  diceABI,
  nftABI,
  faucetABI,
} from "./abi/index";
import { COLLECTIONS } from "./collections-data";

const CURRENT_NETWORK = ChainType.BASETESTNET;

export const CURRENCY_UNIT = "PRX";

export const BOXING_START_DATE = new Date("2023-10-30");

export const CONSTANTS = {
  ADDRESS: {
    TOKEN: tokenAddr[CURRENT_NETWORK],
    PREDICTION: predictionAddr[CURRENT_NETWORK],
    MARKET: marketAddr[CURRENT_NETWORK],
    DICE: diceAddr[CURRENT_NETWORK],
    NFT: nftAddr[CURRENT_NETWORK],
    FAUCET: faucetAddr[CURRENT_NETWORK],
  },
  ABI: {
    TOKEN: tokenABI[CURRENT_NETWORK],
    PREDICTION: predictionABI[CURRENT_NETWORK],
    MARKET: marketABI[CURRENT_NETWORK],
    DICE: diceABI[CURRENT_NETWORK],
    NFT: nftABI[CURRENT_NETWORK],
    FAUCET: faucetABI[CURRENT_NETWORK],
  },
  AMOUNT_REQUIRED: AMOUNT_MINIMUM_REQUIRED[CURRENCY_UNIT].VALUE,
  CHAIN: chain[CURRENT_NETWORK],
  PROVIDER: provider(CURRENT_NETWORK),
  COLLECTIONS: COLLECTIONS[0],
};
