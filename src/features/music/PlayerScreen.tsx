import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
interface Props {}

const PlayerScreen: FC<Props> = (props) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const playingMusic = useAppSelector((state: RootState) => state.music.playingMusic);
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: playingMusic.previewUrl });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    sound?.pauseAsync();
    playSound();
  }, [playingMusic]);

  return (
    <Screen>
      <ImageBackground
        resizeMode="cover"
        source={{ uri: playingMusic?.artworkUrl100 }}
        style={styles.container}
        blurRadius={1}
      >
        {playingMusic ? (
          <View style={styles.tracker}>
            <Text style={styles.text}>
              "{playingMusic.trackName}" by {playingMusic.artistName} is playing...
            </Text>
            <Pressable>
              <AntDesign name="pausecircle" size={24} color="black" />
            </Pressable>
          </View>
        ) : (
          <Text style={styles.text}> No music is playing</Text>
        )}
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  img: {
    width: "100%",
    height: 300,
  },
  text: {
    color: colors.white,
    fontWeight: "700",
    textAlign: "center",
  },
  tracker: {
    backgroundColor: colors.primary,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PlayerScreen;
