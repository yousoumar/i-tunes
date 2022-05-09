import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { useGetMediaBySearchKeywordQuery } from "../../services/media";
import Empty from "./Empty";
import Filter from "./Filter";
import MediaPreview from "./MediaPreview";
import { getFilter, Media } from "./mediaSlice";

interface Props {}

const SearchScreen: FC<Props> = () => {
  const [searchText, setSearchText] = useState("");
  const filter = useAppSelector(getFilter);
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const { data, isFetching } = useGetMediaBySearchKeywordQuery(
    searchText ? `term=${searchText}&media=${filter}` : ""
  );

  useEffect(() => {
    if (data) {
      setMediaList(data.results);
    }
  }, [data]);

  return (
    <Screen>
      <View style={styles.topbar}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={colors.black}
          style={styles.input}
          placeholder={`Search for ${filter}s from iTunes`}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Filter />
      </View>

      <FlatList
        data={mediaList}
        renderItem={({ item }) => <MediaPreview media={item} />}
        keyExtractor={(item) => JSON.stringify(item)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() =>
          searchText ? (
            <Empty text={isFetching ? "Loading..." : "No matching result :)"} />
          ) : (
            <Empty text={`Search for musics and podcasts. Chosen media type is "${filter}".`} />
          )
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  input: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 25,
    color: colors.black,
    flex: 1,
    marginHorizontal: 10,
  },
});

export default SearchScreen;
