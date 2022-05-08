import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { useGetMusiscBySearchKeywordQuery } from "../../services/music";
import Empty from "./Empty";
import MusicPreview from "./MusicPreview";
import { Music } from "./musicSlice";

interface Props {}

const SearchScreen: FC<Props> = () => {
  const [searchText, setSearchText] = useState("");
  const [mediaType, setMediaType] = useState<"video" | "music">("music");
  const [musics, setMusics] = useState<Music[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isFetching } = useGetMusiscBySearchKeywordQuery(searchText);

  useEffect(() => {
    if (data) {
      setMusics(data.results);
    }
  }, [data]);

  return (
    <Screen>
      <View style={styles.topbar}>
        <TextInput
          placeholderTextColor={colors.black}
          style={styles.input}
          placeholder={`Search for ${mediaType}s`}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Pressable onPress={() => setModalVisible((modalVisible) => !modalVisible)}>
          <Ionicons name="list-circle-outline" size={44} color="black" />
        </Pressable>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible((modalVisible) => !modalVisible)}
              style={styles.closeButton}
            >
              <Ionicons name="close-circle-outline" size={44} color="black" />
            </Pressable>
            <View>
              <Text>Chose media type you want to query</Text>
              <Pressable
                onPress={() => {
                  setMediaType("music");
                  setModalVisible(false);
                }}
                style={styles.choiceButton}
              >
                <Text style={styles.text}>Music</Text>
                {mediaType === "music" ? (
                  <AntDesign name="checkcircle" size={30} color="white" />
                ) : (
                  <AntDesign name="checkcircleo" size={30} color="white" />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  Alert.alert("This feature is not ready yet, please come back later :)");
                }}
                style={styles.choiceButton}
              >
                <Text style={styles.text}>Video</Text>

                <AntDesign name="checkcircleo" size={30} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={musics}
        renderItem={({ item }) => <MusicPreview music={item} />}
        keyExtractor={(item) => item.previewUrl}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() =>
          searchText ? (
            <Empty text={isFetching ? "Loading..." : "No matching result :)"} />
          ) : (
            <Empty text={`Search for musics and videos. Chosen media type is "${mediaType}".`} />
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
  },
  input: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 25,
    color: colors.black,
    flex: 1,
    marginHorizontal: 10,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: "auto",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
  },

  closeButton: {
    position: "absolute",
    right: 10,
  },
  choiceButton: {
    backgroundColor: colors.black,
    marginTop: 16,
    padding: 10,
    borderRadius: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: colors.white,
  },
});

export default SearchScreen;
