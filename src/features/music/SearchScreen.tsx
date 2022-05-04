import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { useGetMusiscBySearchKeywordQuery } from "../../services/music";
import MusicPreview from "./MusicPreview";

interface Props {}

const SearchScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [musics, setMusics] = useState<any>([]);

  const { data, error, isLoading } = useGetMusiscBySearchKeywordQuery(searchText);

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
        ListEmptyComponent={() => (searchText ? <Text>No matching result</Text> : <></>)}
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

export default SearchScreen;
