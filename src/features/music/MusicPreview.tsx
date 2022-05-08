import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Image, Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import colors from "../../config/colors";
import { addMusicToList, Music, removeMusicFromList, setPlayingMusic } from "./musicSlice";

interface Props extends PressableProps {
  music: Music;
}

const MusicPreview: FC<Props> = ({ music }) => {
  const dispatch = useAppDispatch();
  const musics = useAppSelector((state: RootState) => state.music.musicList);
  const playingMusic = useAppSelector((state: RootState) => state.music.playingMusic);
  return (
    <Pressable style={styles.container} onPress={() => dispatch(setPlayingMusic({ ...music }))}>
      <View>
        <Image style={styles.img} source={{ uri: music.artworkUrl100 }} />
        {playingMusic?.trackId === music.trackId ? (
          <View style={styles.playingIcon}>
            <Entypo name="bar-graph" size={24} color="white" />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.text}>
        {music.trackName.length > 30 ? music.trackName.substring(0, 27) + "..." : music.trackName}
      </Text>
      <View style={styles.buttons}>
        {musics.find((m: Music) => m.previewUrl === music.previewUrl) ? (
          <Pressable onPress={() => dispatch(removeMusicFromList(music.trackId))}>
            <MaterialCommunityIcons name="delete-circle-outline" size={26} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => dispatch(addMusicToList(music))}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  text: {
    marginLeft: 10,
  },
  img: {
    backgroundColor: colors.gray,
    width: 40,
    height: 40,
    borderRadius: 3,
  },
  buttons: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  rightButton: {
    marginLeft: 16,
  },
  playingIcon: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default MusicPreview;
