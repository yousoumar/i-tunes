import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useAppDispatch } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { addMusicToList, setPlayingMusic } from "./musicSlice";

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
      <Text style={styles.text}>{music.trackCensoredName}</Text>
      <Button
        title="Play"
        onPress={() => {
          playSound();
          dispatch(setPlayingMusic(music));
        }}
      />
      <Button title="Add" onPress={() => dispatch(addMusicToList(music))} />
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
});

export default MusicPreview;
