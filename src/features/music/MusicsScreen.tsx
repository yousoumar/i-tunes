import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import MusicPreview from "./MusicPreview";

interface Props {}

const MusicsScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [musics, setMusics] = useState<any>([]);
  useEffect(() => {
    fetch(
      `https://itunes.apple.com/search?term=${searchText}&limit=14&media=music`
    )
      .then((res) => res.json())
      .then((data) => setMusics(data.results))
      .catch((e) => console.log(e));
  }, [searchText]);

  return (
    <Screen>
      <TextInput
        style={styles.input}
        placeholder="Search a music"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={musics}
        renderItem={({ item }) => <MusicPreview music={item} />}
        keyExtractor={(item) => item.previewUrl}
        ListEmptyComponent={() => <Text>No matching result</Text>}
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
