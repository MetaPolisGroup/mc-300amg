interface IRound {
  closePrice: number;
  delele: boolean;
  lockTimestamp: number;
  closeTimestamp: number;
  bullAmount: number;
  id: string;
  lockPrice: number;
  epoch: number;
  closeOracleId: number;
  totalAmount: number;
  bearAmount: number;
  closed: boolean;
  lockOracleId: number;
  locked: boolean;
  startTimestamp: number;
}

interface IHistory {
  id: string;
  epoch: string;
  refund: number;
  amount: number;
  status: string;
  delete: boolean;
  position: string;
  claimed: boolean;
  created_at: number;
  user_address: string;
  claimed_amount: number;
  winning_amount: number;
  round: IRound;
}
