import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import Empty from "./Empty";
import MusicPreview from "./MusicPreview";
import Player from "./Player";

interface Props {}

const MusicsListScreen: FC<Props> = (props) => {
  const musics = useAppSelector((state: RootState) => state.music.musicList);

  return (
    <Screen>
      <FlatList
        style={styles.flatList}
        data={musics}
        renderItem={({ item }) => <MusicPreview music={item} />}
        keyExtractor={(item) => item.previewUrl}
        ListEmptyComponent={() => <Empty text="No music added in your library :(" />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Player />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatList: {
    borderColor: colors.gray,
    borderTopWidth: 1,
  },
});

export default MusicsListScreen;
