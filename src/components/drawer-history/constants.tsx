// eslint-disable-next-line import/no-anonymous-default-export
export default {};

export const MODE = {
  ROUNDS: "ROUNDS",
  PNL: "PNL",
};

export const RADIO = {
  ALL: "All",
  COLLECTED: "Collected",
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
  WIN: "WIN",
  LOSE: "LOSE",
};

export const USER_DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
};

export const LIST_RADIO = [RADIO.ALL, RADIO.COLLECTED, RADIO.UNCOLECTED];

export const FAKE_DATA = [
  {
    id: "FAKE_DATA1",
    result: "WIN",
    round: 188576,
    is_collected: true,
    winning_amount: "+0,0011",
    user_history: {
      direction: "DOWN",
      position: "0,0010",
      about: "0.26",
      amount_to_collect: "0,0021",
    },
    round_history: {
      closed_price: "259,2748",
      result: "DOWN",
      result_price: "-0,0835",
      locked_price: "259,3582",
      prize_pool: "12,6345",
      up: "1,78",
      up_value: "6,7620",
      down: "2,15",
      down_value: "5,8725",
    },
  },
  {
    id: "FAKE_DATA3",
    result: "WIN",
    round: 188576,
    is_collected: false,
    winning_amount: "+0,0011",
    user_history: {
      direction: "DOWN",
      position: "0,0010",
      about: "0.26",
      amount_to_collect: "0,0021",
    },
    round_history: {
      closed_price: "259,2748",
      result: "DOWN",
      result_price: "-0,0835",
      locked_price: "259,3582",
      prize_pool: "12,6345",
      up: "1,78",
      up_value: "6,7620",
      down: "2,15",
      down_value: "5,8725",
    },
  },
  {
    id: "FAKE_DATA2",
    result: "LOSE",
    round: 187792,
    is_collected: true,
    winning_amount: "-0,0010",
    user_history: {
      direction: "UP",
      position: "0,0010",
      about: "0.24",
      amount_to_collect: "0,0021",
    },
    round_history: {
      closed_price: "248,1627",
      result: "DOWN",
      result_price: "-0,1863",
      locked_price: "248,3490",
      prize_pool: "20,5997",
      up: "3,16",
      up_value: "6,5227",
      down: "1,46",
      down_value: "14,0770",
    },
  },
];
