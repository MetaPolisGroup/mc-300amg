// eslint-disable-next-line import/no-anonymous-default-export
export default {};

export const MODE = {
  ROUNDS: "ROUNDS",
  PNL: "PNL",
};

export const RADIO = {
  ALL: "All",
  UNREFUNDED: "UnRefunded",
  UNCOLECTED: "Uncollected",
};

export const LIST_MODE = [
  {
    id: MODE.ROUNDS,
    title: "Rounds",
  },
  {
    id: MODE.PNL,
    title: "PNL",
  },
];

export const RESULT_STATUS = {
  WIN: "Win",
  LOSE: "Lose",
  WAITING: "Waiting",
  LIVE: "Live",
  REFUND: "Refund",
  WR: "Winning Refund",
  LR: "Losing Refund",
};

export const USER_DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
  ELON: "ELON",
  MARK: "MARK",
};

export const LIST_RADIO = [RADIO.ALL, RADIO.UNREFUNDED, RADIO.UNCOLECTED];

export const RESULT_MARKET_STATUS = {
  WIN: "Win",
  LOSE: "Lose",
  WAITING: "Waiting",
  REFUND: "Refund",
  WR: "Winning Refund",
  LR: "Losing Refund",
};

export const OPTIONS_BET_MARKET = [
  { option1: "ELON MUSK", option2: "MARK ZUCKERBERG" },
  { option1: "CANDIDATE 1", option2: "CANDIDATE 2" },
];

export const NAME_ROUND_MARKET = ["Boxing", "Election"];
