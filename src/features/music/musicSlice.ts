import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//export interface MusicList {}

const initialState: any = { musicList: [], playingMusic: null };
export const musicList = createSlice({
  name: "music",
  initialState,
  reducers: {
    addMusicToList: (state, action: PayloadAction<any>) => {
      state.musicList.push(action.payload);
    },
    setPlayingMusic: (state, action: PayloadAction<any>) => {
      state.playingMusic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMusicToList, setPlayingMusic } = musicList.actions;

export default musicList.reducer;
