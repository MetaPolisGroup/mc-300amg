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
};

export const USER_DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
};

export const LIST_RADIO = [RADIO.ALL, RADIO.UNREFUNDED, RADIO.UNCOLECTED];
