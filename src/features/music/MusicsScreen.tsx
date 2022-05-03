import React, { FC } from "react";
import { Button, FlatList, StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import MusicPreview from "./MusicPreview";
import { addMussic } from "./musicSlice";

interface Props {}

const MusicsScreen: FC<Props> = (props) => {
  const musics = useAppSelector((state: RootState) => state.musicList);
  const dispatch = useAppDispatch();
  return (
    <Screen>
      <Button title="test" onPress={() => dispatch(addMussic(2))} />
      <FlatList
        data={musics}
        renderItem={({ item }) => <MusicPreview music={item} />}
        keyExtractor={(item) => item.previewUrl}
        ListEmptyComponent={() => <Text>No music added in your library</Text>}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 5,
    marginRight: 16,
    color: colors.black,
    marginHorizontal: 10,
  },
});

export default MusicsScreen;
