import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//export interface MusicList {}

const initialState: any[] = [];
export const musicList = createSlice({
  name: "musicList",
  initialState,
  reducers: {
    addMussic: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      //state.push(actions.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMussic } = musicList.actions;

export default musicList.reducer;
