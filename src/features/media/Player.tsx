import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { FC, useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import colors from "../../config/colors";
import { addMediaToList, Media, setPlayingMedia } from "./mediaSlice";

interface Props extends ViewProps {}

const Player: FC<Props> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const fristLoadRef = useRef(true);
  const playingMedia = useAppSelector((state) => state.media.playingMedia);
  const dispatch = useAppDispatch();
  const mediaList = useAppSelector((state: RootState) => state.media.mediaList);

  async function playSound() {
    setIsLoading(true);
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync({ uri: playingMedia!.previewUrl });
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (!status.isLoaded) {
        console.log("loading...");
      } else {
        if (status.isPlaying) {
          setIsPlaying(true);
          setIsLoading(false);
        }
        if (status.didJustFinish === true) {
          setIsPlaying(false);
        }
      }
    });
    setSound(sound);
    await sound.playAsync();
  }
  async function pauseSound() {
    sound?.pauseAsync();
    setIsPlaying(false);
  }

  useEffect(() => {
    if (fristLoadRef.current) {
      fristLoadRef.current = false;
      return;
    }
    pauseSound();
    if (playingMedia) {
      playSound();
    }
  }, [playingMedia]);

  if (!playingMedia) return <></>;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: playingMedia.artworkUrl100 }} />
      <Text style={styles.text}>
        {playingMedia.trackName.length > 30
          ? playingMedia.trackName.substring(0, 27) + "..."
          : playingMedia.trackName}
      </Text>
      <Pressable onPress={() => dispatch(setPlayingMedia(null))}>
        <AntDesign name="close" size={26} color={colors.white} style={{ marginRight: 10 }} />
      </Pressable>
      {!mediaList.find((m: Media) => m.previewUrl === playingMedia.previewUrl) ? (
        <Pressable
          onPress={() => dispatch(addMediaToList(playingMedia))}
          style={{ marginRight: 16 }}
        >
          <AntDesign name="pluscircle" size={24} color={colors.white} />
        </Pressable>
      ) : (
        <></>
      )}

      {isLoading ? (
        <AntDesign name="loading1" size={24} color={colors.white} />
      ) : (
        <>
          {isPlaying ? (
            <Pressable onPress={pauseSound}>
              <AntDesign name="pausecircle" size={24} color={colors.white} />
            </Pressable>
          ) : (
            <Pressable onPress={playSound}>
              <AntDesign name="playcircleo" size={24} color={colors.white} />
            </Pressable>
          )}
        </>
      )}
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
    backgroundColor: colors.black,
  },
  text: {
    marginLeft: 10,
    marginRight: "auto",
    color: colors.white,
  },
  img: {
    backgroundColor: colors.gray,
    width: 40,
    height: 40,
    borderRadius: 3,
  },
});

export default Player;
