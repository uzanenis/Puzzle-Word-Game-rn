import { View, StyleSheet } from "react-native";
import React from "react";
import MenuButtons from "../components/MenuButtons";
import { SafeAreaView, Text } from "react-native";

const Menu = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("Game");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <MenuButtons onPress={onPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Menu;
