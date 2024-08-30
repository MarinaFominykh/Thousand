export type TResult = {
  [key: string]: string | number;
};
export interface IGame {
  roundResult: TResult[];
  //roundResult: { "0": number; "1": number; "2": number }[];
  ///dealer: number;
}

export interface IBet {
  playerId: string;
  bet: number;
}
