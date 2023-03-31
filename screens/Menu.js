import { View, StyleSheet } from "react-native";
import React from "react";
import MenuButtons from "../components/MenuButtons";
import { SafeAreaView, Text } from "react-native";

const Menu = () => {
  return (
    <View style={styles.container}>
      <MenuButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Menu;
