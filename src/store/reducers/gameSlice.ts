import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGame } from "@src/types/IGame";
import { IBet } from "@src/types/IGame";

interface GameState {
  round: number[];
  dealer: number;
  game: IGame;
  bet: IBet;
}

const initialState: GameState = {
  round: [],
  dealer: 0,
  game: {
    roundResult: [
      {
        "0": 0,
        "1": 0,
        "2": 0,
      },
    ],
    //dealer: 0,
  },
  bet: {
    playerId: "1",
    bet: 100,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<number[]>) => {
      state.round = action.payload;
    },
    setDealer: (state, action: PayloadAction<number>) => {
      state.dealer = action.payload;
    },
    setGame: (state, action: PayloadAction<IGame>) => {
      state.game = action.payload;
    },
    setBet: (
      state,
      action: PayloadAction<{ playerId: string; bet: number }>
    ) => {
      state.bet = action.payload;
    },
    resetBet: (state) => {
      state.bet = {
        playerId: "1",
        bet: 100,
      };
    },
  },
});

export const { setRound, setDealer, setGame, setBet, resetBet } =
  gameSlice.actions;

export default gameSlice.reducer;
