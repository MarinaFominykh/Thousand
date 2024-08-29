export interface IGame {
  roundResult: { "0": number; "1": number; "2": number }[];
  ///dealer: number;
}

export interface IBet {
  playerId: string;
  bet: number;
}
