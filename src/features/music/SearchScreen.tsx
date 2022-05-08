import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { useGetMusiscBySearchKeywordQuery } from "../../services/music";
import Empty from "./Empty";
import MusicPreview from "./MusicPreview";
import { Music } from "./musicSlice";

interface Props {}

const SearchScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [musics, setMusics] = useState<Music[]>([]);

  const { data, isFetching } = useGetMusiscBySearchKeywordQuery(searchText);

  useEffect(() => {
    if (data) {
      setMusics(data.results);
    }
  }, [data]);

  return (
    <Screen>
      <TextInput
        style={styles.input}
        placeholder="Search songs, artistes..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={musics}
        renderItem={({ item }) => <MusicPreview music={item} />}
        keyExtractor={(item) => item.previewUrl}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() =>
          searchText ? (
            <Empty text={isFetching ? "Loading..." : "No matching result"} />
          ) : (
            <Empty text="Search for musics, by title, artist..." />
          )
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 5,
    margin: 16,
    color: colors.black,
    marginHorizontal: 10,
  },
});

export default SearchScreen;
