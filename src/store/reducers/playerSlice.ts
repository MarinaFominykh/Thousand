import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlayer } from "@src/types/IPlayer";

interface PlayerState {
  players: IPlayer[];
}

const initialState: PlayerState = {
  players: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;

export default playerSlice.reducer;
