import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { FC, useEffect, useState } from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { setPlayingMusic } from "./musicSlice";

interface Props extends PressableProps {
  music: any;
}

const PlayPauseButton: FC<Props> = ({ music, style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const dispatch = useAppDispatch();
  const playingMusic = useAppSelector((state) => state.music.playingMusic);

  async function playSound() {
    dispatch(setPlayingMusic(music));
    setIsLoading(true);
    const { sound } = await Audio.Sound.createAsync({ uri: music.previewUrl });
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (!status.isLoaded) {
        console.log("loading...");
      } else {
        setIsLoading(false);
        if (status.isPlaying) {
          setIsPlaying(true);
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
    pauseSound();
  }, [playingMusic]);

  return (
    <View style={[styles.container, style]}>
      {isLoading ? (
        <AntDesign name="loading1" size={24} color="black" />
      ) : (
        <>
          {isPlaying ? (
            <Pressable onPress={pauseSound}>
              <AntDesign name="pausecircle" size={24} color="black" />
            </Pressable>
          ) : (
            <Pressable onPress={playSound}>
              <AntDesign name="playcircleo" size={24} color="black" />
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlayPauseButton;
