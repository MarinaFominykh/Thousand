export type TResult = {
  [key: string]: string | number;
};
export interface IGame {
  roundResult: TResult[];
}

export interface IBet {
  playerId: string;
  bet: number;
}
