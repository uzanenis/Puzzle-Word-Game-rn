import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
const MenuButtons = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.text}>Play Word Challange</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bbb",
    padding: 20,
    borderRadius: 8,
  },

  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MenuButtons;
