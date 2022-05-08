import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Music {
  artworkUrl100: string;
  previewUrl: string;
  trackName: string;
  trackId: string;
}

interface MusicSlice {
  musicList: Music[];
  playingMusic: Music | null;
}

const initialState: MusicSlice = { musicList: [], playingMusic: null };
export const music = createSlice({
  name: "music",
  initialState,
  reducers: {
    addMusicToList: (state, action: PayloadAction<Music>) => {
      !state.musicList.find((m: Music) => m.previewUrl === action.payload.previewUrl) &&
        state.musicList.push(action.payload);
    },
    removeMusicFromList: (state, action: PayloadAction<string>) => {
      state.musicList = state.musicList.filter((m: Music) => m.trackId !== action.payload);
    },
    setPlayingMusic: (state, action: PayloadAction<Music>) => {
      state.playingMusic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMusicToList, setPlayingMusic, removeMusicFromList } = music.actions;

export default music.reducer;
