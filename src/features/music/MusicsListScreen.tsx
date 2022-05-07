import React, { FC } from "react";
import { FlatList } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import Screen from "../../components/Screen";
import Empty from "./Empty";
import MusicPreview from "./MusicPreview";

interface Props {}

const MusicsListScreen: FC<Props> = (props) => {
  const musics = useAppSelector((state: RootState) => state.music.musicList);

  return (
    <Screen>
      <FlatList
        data={musics}
        renderItem={({ item }) => <MusicPreview music={item} />}
        keyExtractor={(item) => item.previewUrl}
        ListEmptyComponent={() => <Empty text="No music added in your library :(" />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Screen>
  );
};

export default MusicsListScreen;
