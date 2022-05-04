import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { addMusicToList, removeMusicFromList, setPlayingMusic } from "./musicSlice";

interface Props {
  music: any;
}

const MusicPreview: FC<Props> = ({ music }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const dispatch = useAppDispatch();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: music.previewUrl });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: music.artworkUrl100 }} />
      <Text style={styles.text}>
        {music.trackName.length > 30 ? music.trackName.substring(0, 27) + "..." : music.trackName}
      </Text>
      <View style={styles.buttons}>
        {music.inTheList ? (
          <Pressable onPress={() => dispatch(removeMusicFromList(music.trackId))}>
            <Ionicons name="remove-circle" size={25} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => dispatch(addMusicToList({ ...music, inTheList: true }))}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
        )}
        <Pressable
          style={styles.rightButton}
          onPress={() => {
            playSound();
            dispatch(setPlayingMusic({ ...music, playing: true }));
          }}
        >
          <AntDesign name="play" size={24} color={colors.primary} />
        </Pressable>
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
