import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { addMusicToList, removeMusicFromList } from "./musicSlice";
import PlayPauseButton from "./PlayPauseButton";

interface Props {
  music: any;
}

const MusicPreview: FC<Props> = ({ music }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: music.artworkUrl100 }} />
      <Text style={styles.text}>
        {music.trackName.length > 30 ? music.trackName.substring(0, 27) + "..." : music.trackName}
      </Text>
      <View style={styles.buttons}>
        {music.inTheList ? (
          <Pressable onPress={() => dispatch(removeMusicFromList(music.trackId))}>
            <MaterialCommunityIcons name="delete-circle-outline" size={26} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => dispatch(addMusicToList({ ...music, inTheList: true }))}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
        )}
        <PlayPauseButton music={music} style={styles.rightButton} />
      </View>
    </View>
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
});

export default MusicPreview;
