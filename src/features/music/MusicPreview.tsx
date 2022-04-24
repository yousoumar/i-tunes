import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import colors from "../../config/colors";

interface Props {
  music: any;
}

const MusicPreview: FC<Props> = ({ music }) => {
  const [sound, setSound] = useState<Audio.Sound>();
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
    <Pressable style={styles.container} onPress={playSound}>
      <Image style={styles.img} source={{ uri: music.artworkUrl100 }} />
      <Text style={styles.text}>{music.trackCensoredName}</Text>
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
});

export default MusicPreview;
