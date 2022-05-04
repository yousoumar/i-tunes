import React, { FC } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Screen from "../../components/Screen";
import colors from "../../config/colors";

interface Props {}

const PlayerScreen: FC<Props> = (props) => {
  const playingMusic = useAppSelector((state: RootState) => state.music.playingMusic);

  return (
    <Screen>
      <ImageBackground
        resizeMode="cover"
        source={{ uri: playingMusic?.artworkUrl100 }}
        style={styles.container}
        blurRadius={1}
      >
        {playingMusic ? (
          <Text style={styles.text}>
            "{playingMusic.trackName}" by {playingMusic.artistName} is playing...
          </Text>
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
    backgroundColor: colors.primary,
    padding: 16,
    color: colors.white,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default PlayerScreen;
