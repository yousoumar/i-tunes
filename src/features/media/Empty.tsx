import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
}

const Empty: FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    textAlign: "center",
  },
});

export default Empty;
