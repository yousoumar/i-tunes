import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//export interface MusicList {}

const initialState: any = { musicList: [], playingMusic: null };
export const music = createSlice({
  name: "music",
  initialState,
  reducers: {
    addMusicToList: (state, action: PayloadAction<any>) => {
      !state.musicList.find((m: any) => m.previewUrl === action.payload.previewUrl) &&
        state.musicList.push(action.payload);
    },
    removeMusicFromList: (state, action: PayloadAction<any>) => {
      state.musicList = state.musicList.filter((m: any) => m.trackId !== action.payload);
    },
    setPlayingMusic: (state, action: PayloadAction<any>) => {
      state.playingMusic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMusicToList, setPlayingMusic, removeMusicFromList } = music.actions;

export default music.reducer;
