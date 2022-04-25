import React, { FC, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import MusicPreview from "./MusicPreview";

interface Props {}

const MusicsScreen: FC<Props> = (props) => {
  const [musics, setMusics] = useState<any>([]);

  return (
    <Screen>
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
