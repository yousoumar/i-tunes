import React, { FC, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import Empty from "./Empty";
import Filter from "./Filter";
import MediaPreview from "./MediaPreview";
import { getFilter, getFiltredMediaList, getFiltredMediaWithSearch } from "./mediaSlice";
import Player from "./Player";

interface Props {}

const MediaListScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const filtredMediaList = useAppSelector(getFiltredMediaList);
  const filtredWithSearchMediaList = useAppSelector(getFiltredMediaWithSearch(searchText));
  const mediaListIsEmpty = filtredMediaList.length > 0;
  const filter = useAppSelector(getFilter);

  return (
    <Screen>
      <View style={styles.topbar}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={colors.black}
          style={styles.input}
          placeholder={`Search for local ${filter}s`}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Filter style={{ marginLeft: "auto" }} />
      </View>
      <FlatList
        style={styles.flatList}
        data={filtredWithSearchMediaList}
        renderItem={({ item }) => <MediaPreview media={item} />}
        keyExtractor={(item) => JSON.stringify(item)}
        ListEmptyComponent={() => (
          <Empty
            text={
              !mediaListIsEmpty
                ? `No media added in your local ${filter} list :(`
                : `No matching result in your local ${filter} list :(`
            }
          />
        )}
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

export default MediaListScreen;
