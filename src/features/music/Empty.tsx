import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";

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
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default Empty;
