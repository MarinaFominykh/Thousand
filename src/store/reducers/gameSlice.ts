import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGame } from "@src/types/IGame";
import { IBet } from "@src/types/IGame";

interface GameState {
  round: number[];
  dealer: number;
  game: IGame;
  bet: IBet;
  isTruck: boolean;
  completed: boolean;
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
  isTruck: false,
  completed: false,
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
    resetGame: (state) => {
      (state.game.roundResult = [
        {
          "0": 0,
          "1": 0,
          "2": 0,
        },
      ]),
        (state.bet = {
          playerId: "1",
          bet: 100,
        }),
        (state.dealer = 0);
      state.completed = false;
    },
    resetBet: (state) => {
      state.bet = {
        playerId: "1",
        bet: 100,
      };
    },
    setTruck: (state, action: PayloadAction<boolean>) => {
      state.isTruck = action.payload;
    },
    setComleted: (state, action: PayloadAction<boolean>) => {
      state.completed = action.payload;
    },
  },
});

export const {
  setRound,
  setDealer,
  setGame,
  setBet,
  resetBet,
  resetGame,
  setTruck,
  setComleted,
} = gameSlice.actions;

export default gameSlice.reducer;
