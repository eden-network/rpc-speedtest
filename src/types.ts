export type Result = {
  iteration: number;
  wallet: string;
  blockNumber?: number;
  order?: number;
  tx: string;
  label: string;
  firstSeen?: { name: string; date: Date }[];
};

export type LocalSpeedtestWallets = Record<
  `0x${string}`,
  { privKey: `0x${string}`; chain: number }
>;
