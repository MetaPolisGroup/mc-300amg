interface IBetData {
  id: string;
  status: "UP" | "DOWN" | "" | string | undefined;
  value: string;
  refund: number;
  position: "UP" | "DOWN";
}
